/**
 * PRICING — valores OFICIAIS do CSV (via scripts/import-csv.mjs),
 * com as divergências do Menu 2026 aplicadas por cima (menu2026.js →
 * priceOverrides, documentadas uma a uma).
 * ------------------------------------------------------------
 * Bolo: preço por tamanho × tier do sabor (Bentô tem preço único).
 * Brigadeiros / Petit Brownie: preço da CAIXA por linha × quantidade
 * (misturar sabores não altera).
 * Para atualizar: substitua briefing/produtos-trem-de-doce.csv e rode
 * `npm run import:csv`.
 */
import catalog from './generated/catalog.json' with { type: 'json' };
import { priceOverrides } from './menu2026.js';

export const cakePricing = catalog.cakePricing.map((row) => {
  const o = priceOverrides.find((x) => x.sizeId === row.sizeId && x.tier === row.tier);
  return o ? { ...row, price: o.price, csvPrice: row.price, source: o.source } : row;
});
export const brigadeiroPricing = catalog.boxPricing.brigadeiro;
export const browniePricing = catalog.boxPricing.brownie;
