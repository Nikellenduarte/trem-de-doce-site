import { cn } from '../../utils/cn.js';
import { formatCurrency } from '../../utils/format.js';

/** Exibe um valor em BRL ou "a confirmar" quando ainda não cadastrado. */
export default function Price({ value, unknownLabel = 'valor a confirmar', className, style }) {
  const known = typeof value === 'number' && Number.isFinite(value);
  return (
    <span className={cn('price', !known && 'price--unknown', className)} style={style}>
      {known ? formatCurrency(value) : unknownLabel}
    </span>
  );
}
