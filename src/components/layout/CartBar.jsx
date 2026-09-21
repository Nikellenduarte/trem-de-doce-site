import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn.js';
import { useCart } from '../../hooks/useCart.jsx';
import { plural } from '../../utils/format.js';
import Price from '../ui/Price.jsx';
import { IconArrowRight } from '../ui/Icons.jsx';

/**
 * Barra fixa no rodapé (mobile) com o resumo do pedido. Some quando a
 * seção de reserva está visível, para não cobrir o botão de envio.
 */
export default function CartBar({ target = '#reserva', onGo }) {
  const cart = useCart();
  const [overTarget, setOverTarget] = useState(false);

  useEffect(() => {
    const el = document.querySelector(target);
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setOverTarget(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  const hidden = cart.count === 0 || overTarget;

  return (
    <div className={cn('cart-bar', hidden && 'cart-bar--hidden')} role="region" aria-label="Resumo do pedido" aria-hidden={hidden}>
      <div className="cart-bar__info">
        <span className="cart-bar__label">
          {cart.count} {plural(cart.count, 'item no pedido', 'itens no pedido')}
        </span>
        <span className="cart-bar__total">
          <Price value={cart.totals.known ? cart.totals.total : null} unknownLabel="valor a confirmar" style={{ color: 'inherit' }} />
        </span>
      </div>
      <button type="button" className="btn btn--on-primary btn--sm" onClick={onGo} tabIndex={hidden ? -1 : 0}>
        <span>Finalizar reserva</span>
        <IconArrowRight className="btn__icon" />
      </button>
    </div>
  );
}
