import { cn } from '../../utils/cn.js';
import { IconCheck } from './Icons.jsx';

/**
 * Indicador de etapas. Etapas concluídas são clicáveis (voltar).
 * steps: [{ id, label }], current: id, completed: Set|array de ids
 */
export default function StepIndicator({ steps, current, completed = [], onSelect }) {
  const done = new Set(completed);
  return (
    <ol className="steps" aria-label="Etapas do pedido">
      {steps.map((step, i) => {
        const isCurrent = step.id === current;
        const isDone = done.has(step.id);
        return (
          <li key={step.id} style={{ display: 'contents' }}>
            <button
              type="button"
              className={cn('step', isCurrent && 'step--current', isDone && !isCurrent && 'step--done')}
              aria-current={isCurrent ? 'step' : undefined}
              disabled={!isDone && !isCurrent}
              onClick={() => onSelect?.(step.id)}
            >
              <span className="step__num" aria-hidden="true">
                {isDone && !isCurrent ? <IconCheck /> : i + 1}
              </span>
              <span>{step.label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
