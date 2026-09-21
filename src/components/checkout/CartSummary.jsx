import { cn } from '../../utils/cn.js';
import { formatCurrency } from '../../utils/format.js';
import Price from '../ui/Price.jsx';
import { IconClose } from '../ui/Icons.jsx';

/** Lista de itens do pedido com remoção e totais. */
export default function CartSummary({ items, totals, highlightId, onRemove, categoryName }) {
  return (
    <>
      <ul className="cart-list" aria-label="Itens do pedido">
        {items.map((item, i) => (
          <li key={item.id} className={cn('cart-item', item.id === highlightId && 'cart-item--highlight')}>
            <span className="cart-item__name">
              {i + 1}. {item.productName}
            </span>
            <Price value={item.totals.known ? item.totals.total : null} unknownLabel="a confirmar" className="cart-item__price" />
            {item.options.length > 0 && <span className="cart-item__options">{item.options.map((o) => o.value).join(' · ')}</span>}
            <span className="cart-item__foot">
              <span>
                {categoryName?.(item.categoryId) ?? ''} · {item.quantityLabel}
              </span>
              <button type="button" className="cart-item__remove" onClick={() => onRemove(item.id)} aria-label={`Remover ${item.productName} do pedido`}>
                <IconClose style={{ width: 12, height: 12 }} /> remover
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="cart-totals">
        {totals.discount > 0 && (
          <>
            <div className="cart-totals__row">
              <span>Subtotal</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="cart-totals__row">
              <span>Desconto</span>
              <span>-{formatCurrency(totals.discount)}</span>
            </div>
          </>
        )}
        {!totals.known && totals.unknownCount > 0 && (
          <div className="cart-totals__row">
            <span>
              {totals.unknownCount === 1 ? '1 item com valor a confirmar' : `${totals.unknownCount} itens com valor a confirmar`}
            </span>
            {totals.subtotal > 0 && <span>+ {formatCurrency(totals.subtotal)}</span>}
          </div>
        )}
        <div className="cart-totals__row cart-totals__row--total">
          <span className="summary-total__label">Total estimado</span>
          <Price value={totals.known ? totals.total : null} unknownLabel="a confirmar" />
        </div>
      </div>
    </>
  );
}
