import React, { useEffect, useRef, useState } from 'react';
import { Button, Message, Composer } from './components.jsx';
import {
  followupActionFor,
  latestFactualAnswer,
  replyForFollowup,
  replyTo,
  suggestions,
  welcome,
} from './replies.js';
import { trackEvent } from './analytics.js';
import { chatLog } from './posthog-logs.js';

function createMessage(conversationId, message) {
  return {
    message_id: crypto.randomUUID(),
    conversation_id: conversationId,
    ...message,
  };
}

function createWelcomeMessage(conversationId) {
  return createMessage(conversationId, welcome);
}

function eventProperties(message) {
  return {
    conversation_id: message.conversation_id,
    message_id: message.message_id,
    topic: message.topic,
    source: message.source,
    ...(message.action ? { action: message.action } : {}),
  };
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [initialConversationId] = useState(() => crypto.randomUUID());
  const conversationIdRef = useRef(initialConversationId);
  const [messages, setMessages] = useState(() => [createWelcomeMessage(initialConversationId)]);
  const [feedbackByMessage, setFeedbackByMessage] = useState({});
  const startedConversationRef = useRef(false);
  const trackedResponseIdsRef = useRef(new Set());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    chatLog.ready();
  }, []);

  useEffect(() => {
    for (const message of messages) {
      if (message.role !== 'assistant' || !message.trackResponse || trackedResponseIdsRef.current.has(message.message_id)) continue;

      trackedResponseIdsRef.current.add(message.message_id);
      trackEvent('chat_response_received', eventProperties(message));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages]);

  function sendMessage(text, source, topicId, followup = null) {
    const conversation = conversationIdRef.current;
    const typedAction = source === 'typed' ? followupActionFor(text) : null;
    const latestAnswer = typedAction ? latestFactualAnswer(messages) : null;
    const followupTarget = followup?.target ?? latestAnswer;
    const action = followup?.action ?? (latestAnswer ? typedAction : null);
    const messageSource = action ? 'followup' : source;
    const topic = followupTarget?.topic ?? topicId;
    const userMessage = createMessage(conversation, {
      role: 'user',
      text,
      source: messageSource,
      ...(action ? { action } : {}),
      ...(topic ? { topic } : {}),
    });
    const reply = followupTarget && action
      ? replyForFollowup(followupTarget, action)
      : replyTo(text, topicId);
    const assistantMessage = createMessage(conversation, {
      role: 'assistant',
      ...reply,
      source: messageSource,
      trackResponse: true,
    });
    const properties = eventProperties(userMessage);

    if (source === 'suggestion') {
      trackEvent('chat_suggestion_clicked', properties);
    }

    if (!startedConversationRef.current) {
      startedConversationRef.current = true;
      trackEvent('chat_started', properties);
    }

    if (followup?.clicked && followupTarget) {
      trackEvent('chat_followup_clicked', {
        conversation_id: followupTarget.conversation_id,
        message_id: followupTarget.message_id,
        topic: followupTarget.topic,
        source: 'followup',
        action,
      });
    }

    trackEvent('chat_message_sent', properties);
    chatLog.responseGenerated(messages.length + 2);
    setMessages(current => [...current, userMessage, assistantMessage]);
  }

  function sendTypedMessage(text) {
    sendMessage(text, 'typed');
  }

  function chooseSuggestion(suggestion) {
    sendMessage(suggestion.label, 'suggestion', suggestion.topic);
  }

  function followup(message, action) {
    if (message.conversation_id !== conversationIdRef.current) return;
    const text = action === 'simpler' ? 'Forklar enklere' : 'Vis kode';
    sendMessage(text, 'followup', message.topic, { target: message, action, clicked: true });
  }

  function submitFeedback(messageId, helpful) {
    const message = messages.find(item => item.message_id === messageId);
    if (!message || message.conversation_id !== conversationIdRef.current) return;

    const previousHelpful = feedbackByMessage[messageId];
    if (previousHelpful === helpful) return;

    setFeedbackByMessage(current => ({ ...current, [messageId]: helpful }));
    trackEvent('chat_feedback_submitted', {
      ...eventProperties(message),
      helpful,
      ...(previousHelpful === undefined ? {} : { previous_helpful: previousHelpful }),
    });
  }

  function reportCopyResult(message, succeeded) {
    trackEvent(succeeded ? 'chat_code_copied' : 'chat_code_copy_failed', {
      ...eventProperties(message),
      action: 'copy_code',
    });
  }

  function resetChat() {
    const previousConversationId = conversationIdRef.current;
    trackEvent('chat_reset', { conversation_id: previousConversationId });
    chatLog.conversationReset(Math.max(messages.length - 1, 0));

    const nextConversationId = crypto.randomUUID();
    conversationIdRef.current = nextConversationId;
    startedConversationRef.current = false;
    trackedResponseIdsRef.current = new Set();
    setFeedbackByMessage({});
    setMessages([createWelcomeMessage(nextConversationId)]);
  }

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    trackEvent('theme_changed', { theme: nextTheme });
  }

  const hasUserMessage = messages.some(message => message.role === 'user');

  return <main className="app" data-theme={theme}>
    <section className="chat ph-no-capture" aria-labelledby="chat-title">
      <header className="chat-header">
        <div><h1 id="chat-title">Token-chatten</h1><p>Fælles beslutninger. Sammenhængende design.</p></div>
        <div className="toolbar">
          <Button
            variant="secondary"
            aria-pressed={theme === 'dark'}
            onClick={toggleTheme}
          >Skift til {theme === 'light' ? 'mørkt' : 'lyst'} tema</Button>
          <Button variant="secondary" onClick={resetChat}>Ny samtale</Button>
        </div>
      </header>
      <nav className="learning-links" aria-label="React-demonstrationer">
        <a href="?slide=6">Slide 6: Primitive og semantiske tokens</a>
        <a href="?slide=7">Slide 7: Token-kæden i React</a>
        <a href="?slide=8">Opsæt PostHog i React</a>
      </nav>
      <p className="notice">Undervisningsdemo med faste, lokale svar — ingen AI-tjeneste. Skriv fx “Hvad er tokens?”</p>
      {!hasUserMessage && <section className="starter-suggestions" aria-label="Startforslag">
        <p>Vælg et forslag for at komme i gang:</p>
        <div className="suggestion-buttons">
          {suggestions.map(suggestion => <Button
            key={suggestion.topic}
            variant="secondary"
            onClick={() => chooseSuggestion(suggestion)}
          >{suggestion.label}</Button>)}
        </div>
      </section>}
      <div className="messages" role="log" aria-label="Samtale" aria-live="polite" aria-relevant="additions">
        {messages.map(message => <Message
          key={message.message_id}
          message={message}
          feedback={feedbackByMessage[message.message_id]}
          onFollowup={followup}
          onFeedback={submitFeedback}
          onCopyResult={reportCopyResult}
        />)}
        <div ref={messagesEndRef} />
      </div>
      <Composer onSend={sendTypedMessage} />
    </section>
  </main>;
}
