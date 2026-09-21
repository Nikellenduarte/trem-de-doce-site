import { cn } from '../../utils/cn.js';

/**
 * Bloco de uma etapa do configurador.
 * locked → visualmente atenuado e sem interação até a etapa anterior.
 */
export default function Stage({ id, number, title, hint, locked = false, aside = null, children }) {
  return (
    <section id={id} className={cn('stage', locked && 'stage--locked')} aria-labelledby={`${id}-title`} aria-disabled={locked || undefined}>
      <div className="stage__head">
        <div className="stage__label">
          <span className="stage__eyebrow">Etapa {number}</span>
          <h4 id={`${id}-title`} className="stage__title">
            {title}
          </h4>
          {hint && <p className="stage__hint">{hint}</p>}
        </div>
        {aside}
      </div>
      {locked ? <p className="stage__empty">Conclua a etapa anterior para continuar.</p> : children}
    </section>
  );
}
