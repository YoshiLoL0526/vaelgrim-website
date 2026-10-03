import type { CSSProperties, ReactNode } from 'react';

export const GAME_URL: string = import.meta.env.VITE_GAME_URL ?? '#';

/** Gold rule with a diamond in the middle, like "— IDLE RPG —" on the logo. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-linear-to-r from-transparent to-gold/70 sm:w-24" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="size-2.5 rotate-45 border border-gold" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px w-16 bg-linear-to-l from-transparent to-gold/70 sm:w-24" />
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  align = 'center',
}: {
  kicker: string;
  title: string;
  lead?: string;
  align?: 'center' | 'left';
}) {
  const centered = align === 'center';
  return (
    <header className={`mb-12 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}`}>
      <p className="pixel-label mb-4 text-ember-hi">{kicker}</p>
      <h2 className="title-gold font-display text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {centered && <Ornament className="mt-6" />}
      {lead && <p className="mt-6 text-lg text-muted">{lead}</p>}
    </header>
  );
}

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-4 py-24 sm:px-6 lg:py-32 ${className}`}>
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/** Slow rising embers. Purely decorative; disabled with reduced motion. */
export function Embers({ count = 18 }: { count?: number }) {
  const sparks = Array.from({ length: count }, (_, i) => {
    // Deterministic spread so the layout does not jump between renders.
    const left = (i * 37) % 100;
    const delay = (i * 1.7) % 7;
    const duration = 6 + ((i * 13) % 6);
    const drift = ((i * 29) % 60) - 30;
    const size = i % 3 === 0 ? 3 : 2;
    return { left, delay, duration, drift, size };
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-0 animate-ember bg-ember-hi shadow-[0_0_6px_1px_rgb(255_106_61/70%)]"
          style={
            {
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              '--drift': `${s.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
