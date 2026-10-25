import posthog from 'posthog-js';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;

export const isPostHogConfigured = Boolean(posthogKey && posthogHost);

if (isPostHogConfigured) {
  try {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      defaults: '2026-08-30',
      autocapture: false,
      disable_session_recording: true,
      logs: {
        serviceName: 'design-tokens-chatbot',
        environment: import.meta.env.MODE,
      },
      capture_exceptions: {
        capture_unhandled_errors: true,
        capture_unhandled_rejections: true,
        capture_console_errors: false,
      },
    });
  } catch (error) {
    console.error('PostHog initialization failed; the app will continue without analytics.', error);
  }
} else if (import.meta.env.DEV) {
  console.warn('PostHog is not configured; analytics are disabled.');
}

export default posthog;
