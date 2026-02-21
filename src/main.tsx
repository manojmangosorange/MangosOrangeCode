import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const CHUNK_RELOAD_KEY = 'mo_chunk_reload_once';

const getErrorText = (error: unknown): string => {
  if (!error) return '';
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && 'message' in (error as Record<string, unknown>)) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};

const isDynamicImportFailure = (error: unknown): boolean => {
  const text = getErrorText(error).toLowerCase();
  return (
    text.includes('failed to fetch dynamically imported module') ||
    text.includes('importing a module script failed') ||
    text.includes('dynamically imported module') ||
    text.includes('chunkloaderror')
  );
};

const recoverFromChunkError = (error: unknown) => {
  if (!isDynamicImportFailure(error)) return;

  const alreadyReloaded = sessionStorage.getItem(CHUNK_RELOAD_KEY) === '1';
  if (!alreadyReloaded) {
    sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
    window.location.reload();
    return;
  }

  const root = document.getElementById('root');
  if (root) {
    root.innerHTML =
      '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;padding:24px;text-align:center;">' +
      '<div><h2 style="margin:0 0 10px 0;">Please refresh this page</h2>' +
      '<p style="margin:0;color:#555;">A recent update was detected. Press Ctrl+F5 (or Cmd+Shift+R).</p></div></div>';
  }
};

window.addEventListener('vite:preloadError', (event) => {
  const preloadEvent = event as Event & { payload?: unknown };
  preloadEvent.preventDefault();
  recoverFromChunkError(preloadEvent.payload);
});

window.addEventListener('error', (event) => {
  recoverFromChunkError((event as ErrorEvent).error || (event as ErrorEvent).message);
});

window.addEventListener('unhandledrejection', (event) => {
  recoverFromChunkError((event as PromiseRejectionEvent).reason);
});

setTimeout(() => {
  sessionStorage.removeItem(CHUNK_RELOAD_KEY);
}, 10000);

// Performance optimizations with error handling
const initializePerformanceOptimizations = async () => {
  try {
    const { preloadCriticalResources, addResourceHints } = await import('./utils/performance');
    addResourceHints();
    await preloadCriticalResources();
  } catch (error) {
    console.warn('Performance utilities failed to load:', error);
  }
};

// Initialize optimizations without blocking app render
initializePerformanceOptimizations();

createRoot(document.getElementById("root")!).render(<App />);
