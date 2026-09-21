import Button from '../ui/Button.jsx';
import Notice from '../ui/Notice.jsx';
import Price from '../ui/Price.jsx';
import { cn } from '../../utils/cn.js';
import { IconArrowRight } from '../ui/Icons.jsx';

/**
 * Resumo em tempo real: o que já foi escolhido, o que falta e quanto custa.
 * rows: [{ label, value }] — value vazio = ainda não escolhido.
 */
export default function OrderSummary({
  rows = [],
  totals,
  quantityControl = null,
  pending = [],
  errors = [],
  hints = [],
  note,
  canReview = false,
  onReview,
  reviewLabel = 'Revisar pedido',
}) {
  return (
    <div className="summary-card">
      <h4 className="summary-card__title">Seu pedido</h4>

      <dl className="summary-list">
        {rows.map((r) => (
          <div key={r.label} className="summary-list__row">
            <dt>{r.label}</dt>
            <dd className={cn(!r.value && 'is-empty')}>{r.value || 'a escolher'}</dd>
          </div>
        ))}
      </dl>

      {quantityControl}

      <div className="summary-total">
        <span className="summary-total__label">Total estimado</span>
        <Price value={totals?.total} unknownLabel={canReview ? 'valor a confirmar' : '—'} />
      </div>

      {note && <p className="summary-note">{note}</p>}

      {errors.length > 0 && <Notice tone="error" items={errors} />}
      {errors.length === 0 && pending.length > 0 && <Notice tone="info" items={pending} />}
      {errors.length === 0 && pending.length === 0 && hints.length > 0 && <Notice tone="info" items={hints} />}

      <div className="summary-actions">
        <Button size="lg" block disabled={!canReview} onClick={onReview} iconRight={<IconArrowRight className="btn__icon" />}>
          {reviewLabel}
        </Button>
      </div>
    </div>
  );
}
