import castle from '../assets/img/world-castle.webp';
import { useLang } from '../i18n.tsx';
import { PixelIcon } from './PixelIcon.tsx';
import { Section, SectionHeading } from './ui.tsx';

/** Each act gets a tint from its theme: rot, sand, jungle, ash. */
const ACT_TINT = ['#6fae4f', '#d9b45a', '#3f9a8a', '#d0463c'];

export function World() {
  const { t } = useLang();
  return (
    <Section id="world" className="overflow-hidden bg-bg">
      <img
        src={castle}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.12] mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-linear-to-b from-bg via-bg/80 to-bg" aria-hidden="true" />

      <div className="relative">
        <SectionHeading kicker={t.world.kicker} title={t.world.title} lead={t.world.lead} />

        <ol className="relative grid gap-6 md:grid-cols-2">
          {t.world.acts.map((act, i) => {
            const tint = ACT_TINT[i] ?? '#c9a45c';
            return (
              <li key={act.region} className="panel studs flex flex-col p-6 sm:p-7">
                <div className="flex items-start gap-5">
                  <div
                    className="grid size-16 shrink-0 place-items-center border-2 bg-void font-display text-2xl font-bold"
                    style={{ borderColor: tint, color: tint }}
                  >
                    {act.numeral}
                  </div>
                  <div>
                    <p className="pixel-label text-[0.6rem] text-muted">
                      {t.world.act} {act.numeral}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-ink">{act.region}</h3>
                    <p className="mt-1 text-ink/70">{act.theme}</p>
                  </div>
                </div>

                <ul className="mt-6 mb-6 flex flex-wrap gap-2">
                  {act.zones.map((z) => (
                    <li key={z} className="border border-edge bg-void/50 px-2.5 py-1 text-sm text-ink/70">
                      {z}
                    </li>
                  ))}
                  <li className="px-1 py-1 text-sm text-muted">+6</li>
                </ul>

                <div className="mt-auto flex items-center gap-3 border-t border-edge pt-5">
                  <PixelIcon name="skull" className="size-6 shrink-0 text-ember-hi" />
                  <p className="text-sm">
                    <span className="pixel-label mr-2 text-[0.6rem] text-ember-hi">{t.world.boss}</span>
                    <span className="font-display font-semibold text-unique">{act.boss}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-16">
          <h3 className="pixel-label mb-6 text-center text-gold">{t.world.sideTitle}</h3>
          <ul className="grid gap-px border border-edge bg-edge sm:grid-cols-3">
            {t.world.side.map((s) => (
              <li key={s.name} className="bg-panel p-6 text-center">
                <p className="font-display text-lg font-bold text-gold-hi">{s.name}</p>
                <p className="mt-2 text-sm text-ink/70">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
