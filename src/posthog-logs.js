import posthog, { isPostHogConfigured } from './posthog.js';

function info(message, attributes) {
  if (isPostHogConfigured) posthog.logger.info(message, attributes);
}

export const chatLog = {
  ready() {
    info('chat experience ready', { response_source: 'local_static' });
  },
  responseGenerated(messageCount) {
    info('chat response generated', {
      response_source: 'local_static',
      message_count: messageCount,
    });
  },
  conversationReset(discardedMessageCount) {
    info('chat conversation reset', { discarded_message_count: discardedMessageCount });
  },
};
