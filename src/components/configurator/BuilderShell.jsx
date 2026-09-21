import StepIndicator from '../ui/StepIndicator.jsx';
import OrderSummary from './OrderSummary.jsx';
import Price from '../ui/Price.jsx';
import Button from '../ui/Button.jsx';
import { IconArrowRight } from '../ui/Icons.jsx';

/**
 * Estrutura comum dos configuradores: cabeçalho com etapas, área
 * principal com as etapas, painel de resumo (lateral no desktop,
 * abaixo no mobile) e barra fixa de resumo no mobile.
 */
export default function BuilderShell({
  title,
  subtitle,
  steps,
  currentStep,
  completedSteps,
  onStepSelect,
  summary, // { rows, totals, quantityControl, pending, errors, hints, note, canReview, onReview, reviewLabel }
  stagePrefix = 'stage',
  children,
}) {
  const goToStep = (id) => {
    onStepSelect?.(id);
    document.getElementById(`${stagePrefix}-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="builder__panel">
      <div className="builder__head">
        <div>
          <h3 className="builder__title">{title}</h3>
          {subtitle && <p className="builder__subtitle">{subtitle}</p>}
        </div>
        <StepIndicator steps={steps} current={currentStep} completed={completedSteps} onSelect={goToStep} />
      </div>

      <div className="builder__body">
        <div className="builder__main">{children}</div>
        <aside className="builder__aside" aria-label="Resumo do pedido">
          <div className="builder__aside-inner">
            <OrderSummary {...summary} />
          </div>
        </aside>
      </div>

      <div className="mobile-bar">
        <div className="mobile-bar__info">
          <span className="mobile-bar__label">{summary.canReview ? 'Valor estimado' : summary.pending?.[0] ?? 'Complete as etapas'}</span>
          <Price value={summary.totals?.total} unknownLabel={summary.canReview ? 'valor a confirmar' : '—'} />
        </div>
        <Button size="sm" disabled={!summary.canReview} onClick={summary.onReview} iconRight={<IconArrowRight className="btn__icon" />}>
          Revisar
        </Button>
      </div>
    </div>
  );
}
