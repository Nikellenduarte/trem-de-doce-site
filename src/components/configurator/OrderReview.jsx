import { formatCurrency } from '../../utils/format.js';
import Button from '../ui/Button.jsx';
import Notice from '../ui/Notice.jsx';
import Price from '../ui/Price.jsx';
import { IconArrowRight, IconEdit, IconPlus } from '../ui/Icons.jsx';

/**
 * Revisão de UM item antes de entrar no pedido: produto, categoria,
 * opções, quantidade, preço unitário, subtotal e total do item.
 */
export default function OrderReview({ order, categoryName, cartCount = 0, onEdit, onAdd }) {
  const { totals } = order;

  return (
    <div className="review" role="region" aria-labelledby="review-title">
      <div className="review__head">
        <span className="eyebrow">Quase lá</span>
        <h3 id="review-title" className="display">
          Confira este <em>item</em>
        </h3>
        <p className="muted small">
          {cartCount > 0
            ? `Você já tem ${cartCount} ${cartCount === 1 ? 'item' : 'itens'} no pedido. Este será o próximo.`
            : 'Depois de adicionar, você informa a data do evento e envia tudo pelo WhatsApp.'}
        </p>
      </div>

      <div className="review__card">
        <div className="review__product">
          <strong>{order.productName}</strong>
          <span>{categoryName}</span>
        </div>

        <dl className="summary-list">
          {order.options.map((o) => (
            <div key={o.label} className="summary-list__row">
              <dt>{o.label}</dt>
              <dd>{o.value}</dd>
            </div>
          ))}
          <div className="summary-list__row">
            <dt>Quantidade</dt>
            <dd>{order.quantityLabel}</dd>
          </div>
          <div className="summary-list__row">
            <dt>Preço unitário</dt>
            <dd>{totals.known ? formatCurrency(totals.unitPrice) : 'a confirmar'}</dd>
          </div>
          <div className="summary-list__row">
            <dt>Subtotal</dt>
            <dd>{totals.known ? formatCurrency(totals.subtotal) : 'a confirmar'}</dd>
          </div>
        </dl>

        <div className="summary-total">
          <span className="summary-total__label">Total do item</span>
          <Price value={totals.total} />
        </div>

        {order.priceNote && <p className="summary-note">{order.priceNote}</p>}
        {!totals.known && <Notice tone="info">O valor deste item será confirmado pela confeitaria no WhatsApp.</Notice>}
      </div>

      <div className="review__actions">
        <Button size="lg" block onClick={() => onAdd('checkout')} iconRight={<IconArrowRight className="btn__icon" />}>
          Adicionar e finalizar reserva
        </Button>
        <Button variant="secondary" size="lg" block onClick={() => onAdd('more')} icon={<IconPlus className="btn__icon" />}>
          Adicionar e escolher mais
        </Button>
        <Button variant="ghost" block onClick={onEdit} icon={<IconEdit className="btn__icon" />}>
          Editar item
        </Button>
      </div>
    </div>
  );
}
