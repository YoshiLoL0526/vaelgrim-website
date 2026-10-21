import type { Lang } from './content.ts';
import { About } from './components/About.tsx';
import { Art, CallToAction, Footer } from './components/Closing.tsx';
import { Endgame } from './components/Endgame.tsx';
import { Faq } from './components/Faq.tsx';
import { Hero } from './components/Hero.tsx';
import { Heroes } from './components/Heroes.tsx';
import { Loot } from './components/Loot.tsx';
import { Nav } from './components/Nav.tsx';
import { World } from './components/World.tsx';
import { LangProvider, useLang } from './i18n.tsx';

export function App({ initialLang = 'en' }: { initialLang?: Lang }) {
  return (
    <LangProvider lang={initialLang}>
      <SkipLink />
      <Nav />
      <main>
        <Hero />
        <About />
        <Heroes />
        <World />
        <Loot />
        <Endgame />
        <Art />
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </LangProvider>
  );
}

function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#about"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-gold focus:px-3 focus:py-2 focus:text-void"
    >
      {t.skip}
    </a>
  );
}
