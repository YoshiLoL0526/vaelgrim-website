import heroArt from '../assets/img/hero-guardian.webp';
import { useLang } from '../i18n.tsx';
import { PixelIcon } from './PixelIcon.tsx';
import { Embers, GAME_URL } from './ui.tsx';

export function Hero() {
  return (
    <section id="top" className="relative bg-void">
      <h1 className="sr-only">Vaelgrim — Idle RPG</h1>

      {/* The key art carries the logo, so it is never cropped from the sides. */}
      <div className="relative mx-auto max-w-[1920px] overflow-hidden">
        <img
          src={heroArt}
          alt=""
          width={1536}
          height={845}
          fetchPriority="high"
          className="block aspect-[1536/845] min-h-[300px] w-full object-cover object-top"
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-void/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-void via-void/70 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-void/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-void/70 to-transparent" />
        <Embers count={22} />
      </div>

      {/* Pulled up over the faded bottom of the art; % margins follow the width, like the image. */}
      <div className="relative z-10 mx-auto max-w-[1920px]">
        <div className="-mt-[17%] px-4 pb-14 sm:px-6 lg:pb-20">
          <HeroCopy />
        </div>
      </div>

      <Pillars />
    </section>
  );
}

function HeroCopy() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-display text-xl leading-snug font-semibold tracking-wide text-ink sm:text-2xl lg:text-3xl">
        {t.hero.tagline.map((line, i) => (
          <span key={line} className={i === 2 ? 'text-gold-hi' : ''}>
            {line}{' '}
          </span>
        ))}
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-base text-ink/75 lg:text-lg">{t.hero.lead}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a href={GAME_URL} className="btn btn-primary">
          <PixelIcon name="sword" className="size-4" />
          {t.hero.play}
        </a>
        <a href="#about" className="btn btn-ghost">
          {t.hero.trailer}
        </a>
      </div>
    </div>
  );
}

function Pillars() {
  const { t } = useLang();
  return (
    <div className="relative border-y border-edge bg-bg">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {t.pillars.map((p, i) => (
          <li
            key={p.icon}
            className={`flex flex-col items-center gap-3 px-4 py-8 text-center ${
              i % 2 === 1 ? 'border-l border-edge' : ''
            } ${i > 1 ? 'border-t border-edge lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
          >
            <span className="grid size-14 place-items-center border border-gold/50 bg-panel text-gold shadow-[inset_0_0_0_3px_var(--color-void)]">
              <PixelIcon name={p.icon} className="size-8" />
            </span>
            <h2 className="pixel-label text-[0.72rem] text-ink">{p.title}</h2>
            <p className="text-sm text-muted">{p.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
