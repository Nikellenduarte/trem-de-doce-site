/**
 * ORDER MODEL
 * ------------------------------------------------------------
 * Formato único de item de pedido consumido por OrderSummary,
 * OrderReview, carrinho e whatsappService:
 * {
 *   id?,            // atribuído ao entrar no carrinho
 *   categoryId, productName,
 *   options: [{ label, value }],
 *   quantity, quantityLabel,
 *   units,          // unidades reais (para descontos por volume)
 *   totals: { unitPrice, subtotal, total, known },
 *   priceNote?: string
 * }
 */
import { computeTotals } from '../services/pricingService.js';

export function createOrder({ categoryId, productName, options, quantity, quantityLabel, unitPrice, priceNote, units }) {
  return {
    categoryId,
    productName,
    options: options.filter((o) => o && o.value),
    quantity,
    quantityLabel: quantityLabel ?? String(quantity),
    units: units ?? quantity,
    totals: computeTotals(unitPrice, quantity),
    priceNote: priceNote ?? null,
  };
}

/** Distribui `total` entre `ids` o mais igualmente possível (resto vai para os primeiros). */
export function distributeEvenly(total, ids) {
  if (!ids.length) return {};
  const base = Math.floor(total / ids.length);
  let rest = total - base * ids.length;
  return Object.fromEntries(
    ids.map((id) => {
      const extra = rest > 0 ? 1 : 0;
      rest -= extra;
      return [id, base + extra];
    }),
  );
}

let seq = 0;
/** Gera um id simples e único para itens do carrinho. */
export function createCartItem(order) {
  seq += 1;
  return { ...order, id: `${Date.now().toString(36)}-${seq}` };
}

/**
 * Totais do carrinho. `known` só é true quando TODOS os itens têm preço.
 * `discount` aplica rules.volumeDiscounts (vazio por padrão).
 */
export function cartTotals(items, volumeDiscounts = []) {
  const known = items.length > 0 && items.every((i) => i.totals.known);
  const subtotal = items.reduce((s, i) => s + (i.totals.known ? i.totals.total : 0), 0);
  let discount = 0;
  volumeDiscounts.forEach((rule) => {
    const eligible = items.filter((i) => rule.categoryIds.includes(i.categoryId));
    const units = eligible.reduce((s, i) => s + (i.units ?? i.quantity), 0);
    if (units >= rule.minUnits) {
      const base = eligible.reduce((s, i) => s + (i.totals.known ? i.totals.total : 0), 0);
      discount = Math.max(discount, Math.round(base * (rule.percent / 100) * 100) / 100);
    }
  });
  const total = Math.round((subtotal - discount) * 100) / 100;
  return { subtotal, discount, total, known, unknownCount: items.filter((i) => !i.totals.known).length };
}
