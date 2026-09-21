import { useCatalog, useBusiness } from '../../hooks/useCatalog.js';
import { cn } from '../../utils/cn.js';

/**
 * Faixa marsala de depoimentos. Só renderiza se houver depoimentos ativos.
 * Com `image` (print real da conversa) o cartão mostra o print, que abre
 * ampliado em nova aba, e a frase em destaque embaixo; sem imagem, só o texto.
 * Itens `placeholder` recebem a marca "exemplo".
 */
export default function Testimonials() {
  const catalog = useCatalog();
  const intro = useBusiness().testimonialsIntro;
  const items = catalog.getTestimonials();
  if (items.length === 0) return null;
  const withImages = items.some((t) => t.image);

  return (
    <section className="section section--primary testimonials" aria-labelledby="depoimentos-title">
      <div className="container">
        <div className="section-heading section-heading--center reveal">
          <h2 id="depoimentos-title" className="display">
            {intro.title}
          </h2>
          {intro.lead && <p className="lead">{intro.lead}</p>}
        </div>
        <ul className={cn('testimonials__list', withImages && 'testimonials__list--media')}>
          {items.map((t, i) => (
            <li key={t.id} className={cn('testimonial reveal', t.image && 'testimonial--media')} style={{ '--reveal-delay': `${i * 90}ms` }}>
              {t.image && (
                <a className="testimonial__shot" href={t.image} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar o depoimento de ${t.name}`}>
                  <img src={t.image} alt={t.imageAlt ?? `Depoimento de ${t.name}`} width="739" height="1140" loading="lazy" decoding="async" />
                </a>
              )}
              <blockquote className="testimonial__quote">“{t.quote}”</blockquote>
              <footer className="testimonial__meta">
                <span className="testimonial__name">{t.name}</span>
                {t.occasion && <span className="testimonial__occasion">{t.occasion}</span>}
                {t.placeholder && <span className="testimonial__tag">exemplo</span>}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
