import { cn } from '../../utils/cn.js';
import logo from './logo-paths.json' with { type: 'json' };

/**
 * LOGO OFICIAL — vetores extraídos de briefing/logo-trem-de-doce.pdf
 * ("D (Logotipo animado).pdf", fornecido pelo cliente em 16/09/2026).
 *
 * Variantes (logo-paths.json):
 *  - monogram:        "TD" com círculo, floreio e estrela   (p.8)
 *  - wordmark:        "Trem de Doce · CONFEITARIA" horizontal (p.1)
 *  - wordmarkStacked: "Trem de / Doce / CONFEITARIA"          (p.3)
 *  - star:            estrela de quatro pontas                (p.7)
 *
 * O bordô (#560d0d) vira `currentColor` (assim o logo fica creme sobre
 * bordô no rodapé/CTA); o pêssego da estrela segue --color-peach.
 */
const BORDO = '#560d0d';

/**
 * Partes do logotipo horizontal, para compor a assinatura "TD | Trem de Doce"
 * com o TD alinhado à linha do nome e CONFEITARIA logo abaixo:
 *  - name: "TREM DE DOCE" + estrela (caminhos 0–9 e 21)
 *  - sub:  "CONFEITARIA"            (caminhos 10–20)
 */
const WORDMARK_PARTS = {
  name: { viewBox: '0 0 361.14 49.1', has: (i) => i < 10 || i > 20 },
  sub: { viewBox: '116.7 59.1 133.1 24.3', has: (i) => i >= 10 && i <= 20 },
};

export function LogoSvg({ variant = 'monogram', part, className, title, style }) {
  const v = logo[variant];
  const crop = variant === 'wordmark' && part ? WORDMARK_PARTS[part] : null;
  const paths = crop ? v.paths.filter((_, i) => crop.has(i)) : v.paths;
  return (
    <svg
      className={className}
      style={style}
      viewBox={crop ? crop.viewBox : v.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.fill === BORDO ? 'currentColor' : 'var(--color-peach, #d8a790)'} />
      ))}
    </svg>
  );
}

/** Monograma TD (mantém a API usada em todo o site). */
export default function Monogram({ className, title }) {
  return (
    <span className={cn('monogram', className)}>
      <LogoSvg variant="monogram" title={title} />
    </span>
  );
}

/** Logotipo com o nome. `stacked` usa a versão em duas linhas. */
export function Wordmark({ stacked = false, className, title = 'Trem de Doce Confeitaria' }) {
  return (
    <span className={cn('wordmark', stacked && 'wordmark--stacked', className)}>
      <LogoSvg variant={stacked ? 'wordmarkStacked' : 'wordmark'} title={title} />
    </span>
  );
}
