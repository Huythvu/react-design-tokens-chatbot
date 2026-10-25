import assert from 'node:assert/strict';
import test from 'node:test';
import {
  followupActionFor,
  latestFactualAnswer,
  replyForFollowup,
  replyTo,
  suggestions,
} from './replies.js';

test('recognizes Danish and English topic synonyms from specific to broad', () => {
  assert.equal(replyTo('Hvordan bruger jeg primitive og semantiske tokens?').topic, 'primitive-semantic');
  assert.equal(replyTo('How do CSS custom properties and var() work?').topic, 'css-variables');
  assert.equal(replyTo('Hvordan navngiver jeg semantiske tokens?').topic, 'naming');
  assert.equal(replyTo('How do I make a dark theme?').topic, 'dark-theme');
  assert.equal(replyTo('Can you explain button focus and hover states?').topic, 'states');
  assert.equal(replyTo('Er tokens nok til accessibility og kontrast?').topic, 'accessibility');
  assert.equal(replyTo('Hvad er design tokens?').topic, 'design-tokens');
});

test('each supported topic has a normal answer, simpler answer, and code example', () => {
  const topicIds = [
    'accessibility', 'states', 'dark-theme', 'naming', 'typography', 'spacing',
    'colors', 'css-variables', 'primitive-semantic', 'button', 'components', 'design-tokens',
  ];

  for (const topicId of topicIds) {
    const answer = replyTo(topicId, topicId);
    assert.ok(answer.text, `${topicId} has a normal explanation`);
    assert.ok(answer.simple, `${topicId} has a simpler explanation`);
    assert.ok(answer.code, `${topicId} has a code example`);
  }
});

test('suggestions target their intended subjects', () => {
  assert.deepEqual(
    suggestions.map(({ topic }) => topic),
    ['design-tokens', 'button', 'dark-theme'],
  );
});

test('written follow-ups are recognized without treating their text as a new topic', () => {
  assert.equal(followupActionFor('Forklar det enklere'), 'simpler');
  assert.equal(followupActionFor('Vis kode'), 'code');
  assert.equal(followupActionFor('explain that more simply'), 'simpler');
});

test('a follow-up uses the topic of the selected older answer', () => {
  const olderDarkThemeAnswer = { topic: 'dark-theme', message_id: 'older-answer' };
  const newerTokensAnswer = { topic: 'design-tokens', message_id: 'newer-answer' };

  assert.equal(replyForFollowup(olderDarkThemeAnswer, 'simpler').topic, 'dark-theme');
  assert.match(replyForFollowup(olderDarkThemeAnswer, 'code').code, /data-theme="dark"/);
  assert.notEqual(replyForFollowup(olderDarkThemeAnswer, 'simpler').topic, newerTokensAnswer.topic);
});

test('written follow-ups use the latest factual answer and ignore unknown replies', () => {
  const messages = [
    { role: 'assistant', topic: 'dark-theme', message_id: 'older-answer' },
    { role: 'assistant', topic: 'unknown', message_id: 'unknown-answer' },
  ];

  assert.equal(latestFactualAnswer(messages).message_id, 'older-answer');
});

test('unknown questions state the demo limit and suggest supported topics', () => {
  const answer = replyTo('Please debug this arbitrary Python script');
  assert.equal(answer.topic, 'unknown');
  assert.match(answer.text, /kan ikke analysere vilkårlig kode/);
  assert.equal(answer.code, undefined);
});
