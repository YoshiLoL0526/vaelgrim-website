import emblem from '../assets/img/emblem.webp';
import { useLang } from '../i18n.tsx';
import { Section, SectionHeading } from './ui.tsx';

export function About() {
  const { t } = useLang();
  return (
    <Section id="about" className="grain overflow-hidden bg-bg">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading kicker={t.about.kicker} title={t.about.title} align="left" />
          <div className="space-y-5 text-lg text-ink/85">
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px border border-edge bg-edge sm:grid-cols-4">
            {t.about.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-panel px-4 py-5 text-center">
                <dt className="pixel-label text-[0.62rem] text-muted">{s.label}</dt>
                <dd className="title-gold font-display text-4xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-[12%] rounded-full bg-ember/25 blur-3xl" aria-hidden="true" />
          <img
            src={emblem}
            alt="Vaelgrim emblem"
            width={640}
            height={640}
            loading="lazy"
            className="relative w-full animate-flicker rounded-full mix-blend-lighten"
          />
        </div>
      </div>
    </Section>
  );
}
