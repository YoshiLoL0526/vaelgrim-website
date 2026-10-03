import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { COPY, type Copy, type Lang } from './content.ts';

const STORAGE_KEY = 'vaelgrim-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    // Storage blocked: fall back to the browser language.
  }
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

interface LangContext {
  lang: Lang;
  t: Copy;
  toggle: () => void;
}

const Ctx = createContext<LangContext | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Not critical: the choice just won't be remembered.
    }
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'en' ? 'es' : 'en'));
  return <Ctx.Provider value={{ lang, t: COPY[lang], toggle }}>{children}</Ctx.Provider>;
}

export function useLang(): LangContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
