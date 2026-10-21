import { createContext, useContext, type ReactNode } from 'react';
import { COPY, type Copy, type Lang } from './content.ts';

interface LangContext {
  lang: Lang;
  t: Copy;
}

const Ctx = createContext<LangContext | null>(null);

/**
 * The language is fixed per page: `/` is English and `/es/` is Spanish, so
 * crawlers see a real URL for each version. `initialLang` comes from the
 * document's `lang` attribute, which also keeps hydration deterministic.
 */
export function LangProvider({
  children,
  lang = 'en',
}: {
  children: ReactNode;
  lang?: Lang;
}) {
  return <Ctx.Provider value={{ lang, t: COPY[lang] }}>{children}</Ctx.Provider>;
}

export function useLang(): LangContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
