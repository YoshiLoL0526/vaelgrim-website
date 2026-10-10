import type { CSSProperties, ReactNode } from 'react';

export const GAME_URL: string = import.meta.env.VITE_GAME_URL ?? '#';
export const TWITTER_URL = 'https://x.com/playvaelgrim';
export const DISCORD_URL = 'https://discord.gg/cpzhmGmRm';
export const CONTACT_EMAIL = 'contact@vaelgrim.com';

/** The X (Twitter) logo. */
export function XLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** The Discord logo. */
export function DiscordLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495a18.2705 18.2705 0 0 0-5.4868 0c-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

/** Simple envelope icon for the contact e-mail. */
export function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

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
