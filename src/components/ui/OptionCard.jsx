import { cn } from '../../utils/cn.js';
import { IconCheck } from './Icons.jsx';

/**
 * Cartão de opção selecionável (rádio ou toggle).
 * Estados: padrão, hover, selecionado, desabilitado, inválido.
 */
export default function OptionCard({
  title,
  hint,
  meta,
  badge,
  selected = false,
  disabled = false,
  invalid = false,
  multiple = false,
  onSelect,
  className,
}) {
  const ariaProps = multiple ? { 'aria-pressed': selected } : { role: 'radio', 'aria-checked': selected };
  return (
    <button
      type="button"
      className={cn('option', invalid && 'option--invalid', className)}
      disabled={disabled}
      onClick={onSelect}
      {...ariaProps}
    >
      {badge && <span className="option__badge">{badge}</span>}
      <span className="option__title">{title}</span>
      {hint && <span className="option__hint">{hint}</span>}
      {meta && <span className="option__meta">{meta}</span>}
      <span className="option__check" aria-hidden="true">
        <IconCheck />
      </span>
    </button>
  );
}
