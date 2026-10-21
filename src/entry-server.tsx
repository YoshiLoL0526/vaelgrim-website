import { renderToString } from 'react-dom/server';
import { App } from './App.tsx';
import type { Lang } from './content.ts';

/** Renders a language version to static HTML at build time (see scripts/prerender.mjs). */
export function render(lang: Lang = 'en'): string {
  return renderToString(<App initialLang={lang} />);
}
