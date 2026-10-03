import { useEffect, useState } from 'react';
import emblem from '../assets/img/emblem-small.webp';
import { useLang } from '../i18n.tsx';
import { GAME_URL } from './ui.tsx';

export function Nav() {
  const { lang, t, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#heroes', label: t.nav.heroes },
    { href: '#world', label: t.nav.world },
    { href: '#loot', label: t.nav.loot },
    { href: '#endgame', label: t.nav.endgame },
  ];
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-edge bg-bg/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={emblem} alt="" width={36} height={36} className="size-9 rounded-full" />
          <span className="title-gold font-display text-xl font-bold tracking-[0.12em]">VAELGRIM</span>
        </a>

        <ul className="ml-auto hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="pixel-label text-ink/80 transition-colors hover:text-gold-hi">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <button
            type="button"
            onClick={toggle}
            className="pixel-label flex border border-edge-hi text-muted transition-colors hover:border-gold"
            aria-label={t.langLabel}
          >
            {(['en', 'es'] as const).map((l) => (
              <span key={l} className={`px-2 py-1.5 ${lang === l ? 'bg-gold/15 text-gold-hi' : ''}`}>
                {l.toUpperCase()}
              </span>
            ))}
          </button>
          <a href={GAME_URL} className="btn btn-primary hidden !px-4 !py-2 sm:inline-flex">
            {t.nav.play}
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center border border-edge-hi text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="flex w-4 flex-col gap-1" aria-hidden="true">
              <span className={`h-0.5 bg-current transition ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`h-0.5 bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-current transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-edge px-4 pb-6 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="pixel-label block border-b border-edge/60 py-4 text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-5">
            <a href={GAME_URL} className="btn btn-primary w-full">
              {t.nav.play}
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
