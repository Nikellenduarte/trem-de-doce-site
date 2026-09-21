import { useId } from 'react';
import { cn } from '../../utils/cn.js';
import { IconMinus, IconPlus } from './Icons.jsx';

/** Seletor numérico com botões grandes (uso com uma mão). */
export default function QuantityStepper({ value, min = 0, max = 999, step = 1, onChange, label = 'Quantidade', size = 'md' }) {
  const id = useId();
  const clamp = (n) => Math.max(min, Math.min(max, n));

  const handleInput = (e) => {
    const raw = e.target.value;
    if (raw === '') return;
    const n = parseInt(raw, 10);
    if (Number.isFinite(n)) onChange(clamp(n));
  };

  return (
    <div className={cn('stepper', size === 'sm' && 'stepper--sm')}>
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(clamp(value - step))}
        disabled={value - step < min}
        aria-label={`Diminuir ${label.toLowerCase()}`}
      >
        <IconMinus />
      </button>
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <input
        id={id}
        className="stepper__value"
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInput}
        onBlur={(e) => {
          const n = parseInt(e.target.value, 10);
          onChange(Number.isFinite(n) ? clamp(n) : min);
        }}
      />
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(clamp(value + step))}
        disabled={value + step > max}
        aria-label={`Aumentar ${label.toLowerCase()}`}
      >
        <IconPlus />
      </button>
    </div>
  );
}
