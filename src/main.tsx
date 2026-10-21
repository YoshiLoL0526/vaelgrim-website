import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App.tsx';
import type { Lang } from './content.ts';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root not found');

const initialLang: Lang = document.documentElement.lang === 'es' ? 'es' : 'en';
const app = (
  <StrictMode>
    <App initialLang={initialLang} />
  </StrictMode>
);

// `npm run build` prerenders the page into dist/index.html, so production
// hydrates that markup. In dev the root is empty and we render from scratch.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
