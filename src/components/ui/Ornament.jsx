import { cn } from '../../utils/cn.js';

/** Estrela de quatro pontas do logo oficial: a assinatura decorativa da marca. */
const STAR = 'M12 0c.9 7.4 4.6 11.1 12 12-7.4.9-11.1 4.6-12 12-.9-7.4-4.6-11.1-12-12C7.4 11.1 11.1 7.4 12 0Z';

export function Star({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={STAR} fill="currentColor" />
    </svg>
  );
}

/** Linha fina · estrela · linha fina. Usar com parcimônia. */
export default function Ornament({ className }) {
  return (
    <div className={cn('ornament', className)} aria-hidden="true">
      <Star />
    </div>
  );
}
