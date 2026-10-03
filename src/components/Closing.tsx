import emblem from '../assets/img/emblem-small.webp';
import banner from '../assets/img/logo-banner.webp';
import painted from '../assets/img/heroes-painted.webp';
import pixel from '../assets/img/heroes-pixel.webp';
import { useLang } from '../i18n.tsx';
import { PixelIcon } from './PixelIcon.tsx';
import { Embers, GAME_URL, Ornament, Section, SectionHeading } from './ui.tsx';

export function Art() {
  const { t } = useLang();
  const shots = [
    { src: painted, label: t.art.painted, w: 1536, h: 535 },
    { src: pixel, label: t.art.pixel, w: 1536, h: 450 },
  ];
  return (
    <Section className="bg-bg">
      <SectionHeading kicker={t.art.kicker} title={t.art.title} lead={t.art.text} />
      <div className="grid gap-6">
        {shots.map((s) => (
          <figure key={s.label} className="panel studs overflow-hidden p-1.5">
            <img
              src={s.src}
              alt={s.label}
              width={s.w}
              height={s.h}
              loading="lazy"
              className="block w-full"
            />
            <figcaption className="pixel-label px-3 pt-3 pb-1.5 text-[0.6rem] text-muted">
              {s.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
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
          className="mx-auto w-full max-w-2xl [mask-image:radial-gradient(ellipse_at_center,#000_45%,transparent_72%)]"
        />
        <h2 className="title-gold -mt-4 font-display text-3xl font-bold sm:text-4xl">{t.cta.title}</h2>
        <Ornament className="mt-5" />
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/80">{t.cta.text}</p>
        <a href={GAME_URL} className="btn btn-primary mt-9 !px-8 !py-4 text-sm">
          <PixelIcon name="sword" className="size-4" />
          {t.cta.play}
        </a>
        <p className="pixel-label mt-5 text-[0.58rem] text-muted">{t.cta.note}</p>
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
        </div>
        <a href="#top" className="pixel-label text-muted transition-colors hover:text-gold-hi md:ml-auto">
          ↑ {t.footer.top}
        </a>
      </div>
    </footer>
  );
}
