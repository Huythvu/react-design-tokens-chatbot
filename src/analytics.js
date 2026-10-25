import { version as appVersion } from '../package.json';
import posthog, { isPostHogConfigured } from './posthog.js';

export function trackEvent(event, properties = {}) {
  if (!isPostHogConfigured) return;

  try {
    posthog.capture(event, { ...properties, app_version: appVersion });
  } catch (error) {
    console.error(`PostHog event "${event}" failed; the user action will continue.`, error);
  }
}
