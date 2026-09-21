/**
 * PRICING SERVICE
 * ------------------------------------------------------------
 * Único lugar que sabe COMO um preço é encontrado. Retorna `null`
 * quando o valor ainda não foi cadastrado.
 */
import { cakePricing, brigadeiroPricing, browniePricing } from '../data/index.js';

const isPrice = (v) => typeof v === 'number' && Number.isFinite(v) && v >= 0;

export function getCakePrice(sizeId, tier) {
  const row = cakePricing.find((r) => r.sizeId === sizeId && r.tier === tier);
  return row && isPrice(row.price) ? row.price : null;
}

const boxTables = { brigadeiro: brigadeiroPricing, brownie: browniePricing };

/** Preço da caixa fechada (brigadeiros / brownies) por linha × quantidade. */
export function getBoxPrice(categoryId, line, quantity) {
  const row = (boxTables[categoryId] ?? []).find((r) => r.line === line && r.quantity === quantity);
  return row && isPrice(row.price) ? row.price : null;
}

export const getBrigadeiroBoxPrice = (line, quantity) => getBoxPrice('brigadeiro', line, quantity);
export const getBrownieBoxPrice = (line, quantity) => getBoxPrice('brownie', line, quantity);

export function getProductPrice(product) {
  return product && isPrice(product.price) ? product.price : null;
}

/**
 * Calcula os totais de um pedido a partir de unitPrice + quantity.
 * `known` indica se o valor pôde ser calculado.
 */
export function computeTotals(unitPrice, quantity) {
  if (!isPrice(unitPrice) || !quantity) return { unitPrice: null, subtotal: null, total: null, known: false };
  const subtotal = Math.round(unitPrice * quantity * 100) / 100;
  return { unitPrice, subtotal, total: subtotal, known: true };
}
