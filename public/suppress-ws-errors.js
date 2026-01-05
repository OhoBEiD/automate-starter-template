// Suppress noisy WebSocket HMR errors that occur due to Fly.dev proxy issues
// These are harmless and don't affect functionality
(function() {
  if (typeof window === 'undefined') return;

  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;

  const shouldSuppress = (message) => {
    if (typeof message !== 'string') {
      message = String(message);
    }
    return (
      message.includes('WebSocket connection') ||
      message.includes('Invalid frame header') ||
      message.includes('_next/webpack-hmr') ||
      message.includes('[HMR]') ||
      message.includes('failed: Invalid frame header') ||
      message.includes('WebSocket is closed') ||
      message.includes('web-socket.ts')
    );
  };

  console.error = function(...args) {
    const message = args[0];
    if (shouldSuppress(message)) return;
    originalError.apply(console, args);
  };

  console.warn = function(...args) {
    const message = args[0];
    if (shouldSuppress(message)) return;
    originalWarn.apply(console, args);
  };

  console.log = function(...args) {
    const message = args[0];
    if (shouldSuppress(message)) return;
    originalLog.apply(console, args);
  };
})();
