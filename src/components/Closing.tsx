import { useEffect, useRef } from 'react';
import emblem from '../assets/img/emblem-small.webp';
import banner from '../assets/img/logo-banner.webp';
import combatPoster from '../assets/img/combat-poster.webp';
import painted from '../assets/img/heroes-painted.webp';
import painted1280 from '../assets/img/heroes-painted-1280.webp';
import painted768 from '../assets/img/heroes-painted-768.webp';
import combatMp4 from '../assets/video/combat.mp4';
import combatWebm from '../assets/video/combat.webm';
import { useLang } from '../i18n.tsx';
import {
  CONTACT_EMAIL,
  DISCORD_URL,
  DiscordLogo,
  Embers,
  MailIcon,
  Ornament,
  TWITTER_URL,
  XLogo,
  Section,
  SectionHeading,
} from './ui.tsx';

export function Art() {
  const { t } = useLang();
  return (
    <Section className="bg-bg">
      <SectionHeading kicker={t.art.kicker} title={t.art.title} lead={t.art.text} />
      <div className="grid gap-6">
        <figure className="panel studs overflow-hidden p-1.5">
          <img
            src={painted}
            srcSet={`${painted768} 768w, ${painted1280} 1280w, ${painted} 1536w`}
            sizes="(min-width: 1200px) 1152px, 100vw"
            alt={`${t.art.painted} — ${t.art.title}`}
            width={1536}
            height={535}
            loading="lazy"
            decoding="async"
            className="block w-full"
          />
          <figcaption className="pixel-label px-3 pt-3 pb-1.5 text-[0.6rem] text-muted">
            {t.art.painted}
          </figcaption>
        </figure>
        {/* Recorded from the live client (Brimstone Span, level 60 party); loops like a GIF. */}
        <figure className="panel studs overflow-hidden p-1.5">
          <CombatVideo />
          <figcaption className="pixel-label px-3 pt-3 pb-1.5 text-[0.6rem] text-muted">
            {t.art.combat}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

/**
 * The combat clip is decorative and below the fold: keep the poster (and the
 * initial payload) light, then load and play only when it approaches the view.
 */
function CombatVideo() {
  const { t } = useLang();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const play = () => {
      video.play().catch(() => {
        // Autoplay blocked: the poster stays, which is fine.
      });
    };

    if (!('IntersectionObserver' in window)) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={combatPoster}
      width={1340}
      height={360}
      aria-label={t.art.combat}
      className="block h-auto w-full"
    >
      <source src={combatWebm} type="video/webm" />
      <source src={combatMp4} type="video/mp4" />
    </video>
  );
}

export function CallToAction() {
  const { t } = useLang();
  return (
    <section id="play" className="relative overflow-hidden bg-void px-4 pt-20 pb-28 text-center sm:px-6">
      <div
        className="absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_50%_100%,rgb(208_70_60/28%),transparent_65%)]"
        aria-hidden="true"
      />
      <Embers count={16} />
      <div className="relative mx-auto max-w-3xl">
        <img
          src={banner}
          alt="Vaelgrim — Idle RPG"
          width={907}
          height={516}
          loading="lazy"
          decoding="async"
          className="mx-auto w-full max-w-2xl [mask-image:radial-gradient(ellipse_at_center,#000_45%,transparent_72%)]"
        />
        <h2 className="title-gold -mt-4 font-display text-3xl font-bold sm:text-4xl">{t.cta.title}</h2>
        <Ornament className="mt-5" />
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/80">{t.cta.text}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary !px-8 !py-4 text-sm">
            <DiscordLogo className="size-4" />
            {t.cta.discord}
          </a>
          <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-8 !py-4 text-sm">
            <XLogo className="size-4" />
            {t.cta.play}
          </a>
        </div>
        <p className="pixel-label mt-5 text-[0.58rem] text-muted">{t.cta.note}</p>
        <p className="mt-6 text-sm text-muted">
          {t.cta.contact}:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-hi underline-offset-4 hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-edge bg-bg px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <img src={emblem} alt="" width={48} height={48} className="size-12 rounded-full" />
        <div className="text-sm text-muted">
          <p className="font-display text-base font-bold tracking-[0.12em] text-gold">VAELGRIM</p>
          <p>{t.footer.tagline}</p>
          <p className="mt-1">
            © {year} Vaelgrim. {t.footer.rights} {t.footer.original}
          </p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start">
            <li>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink/80 transition-colors hover:text-gold-hi"
              >
                <DiscordLogo className="size-3.5" />
                {t.footer.discord}
              </a>
            </li>
            <li>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink/80 transition-colors hover:text-gold-hi"
              >
                <XLogo className="size-3" />
                @playvaelgrim
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-1.5 text-ink/80 transition-colors hover:text-gold-hi"
              >
                <MailIcon className="size-3.5" />
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
          <p className="mt-3 max-w-2xl text-xs text-muted/80">{t.footer.disclaimer}</p>
        </div>
        <a href="#top" className="pixel-label text-muted transition-colors hover:text-gold-hi md:ml-auto">
          ↑ {t.footer.top}
        </a>
      </div>
    </footer>
  );
}
