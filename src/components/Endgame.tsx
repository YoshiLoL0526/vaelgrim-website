import horde from '../assets/img/endgame-horde.webp';
import { useLang } from '../i18n.tsx';
import { PixelIcon, type IconName } from './PixelIcon.tsx';
import { Embers, Section, SectionHeading } from './ui.tsx';

const ICONS: IconName[] = ['portal', 'stairs', 'swords'];

export function Endgame() {
  const { t } = useLang();
  return (
    <Section id="endgame" className="overflow-hidden bg-void">
      <img
        src={horde}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-linear-to-b from-void via-void/75 to-void" aria-hidden="true" />
      <Embers count={14} />

      <div className="relative">
        <SectionHeading kicker={t.endgame.kicker} title={t.endgame.title} lead={t.endgame.lead} />
        <ul className="grid gap-6 lg:grid-cols-3">
          {t.endgame.modes.map((m, i) => (
            <li
              key={m.name}
              className="panel studs flex flex-col gap-4 border-blood/80 bg-void/70 p-7 backdrop-blur-sm transition hover:border-ember"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center border border-ember/60 bg-void text-ember-hi">
                  <PixelIcon name={ICONS[i] ?? 'portal'} className="size-8" />
                </span>
                <span className="pixel-label border border-gold/40 px-2 py-1 text-[0.58rem] text-gold">
                  {m.tag}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink">{m.name}</h3>
              <p className="text-ink/75">{m.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
