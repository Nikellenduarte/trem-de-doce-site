/**
 * CAKE SIZES
 * ------------------------------------------------------------
 * `line` agrupa os tamanhos no montador. Desde 19/09/2026 (pedido do cliente) há UM grupo só:
 * a subseção "Linha Festa" saiu e todos os tamanhos aparecem juntos, sem subtítulo.
 * Para voltar a separar, basta criar outra linha em `sizeLines` e apontar os tamanhos para ela.
 * `weightKg` vem do CSV; fatias, medidas e formato vêm do Menu 2026 (p.3).
 */
import catalog from './generated/catalog.json' with { type: 'json' };
import { sizeDetails } from './menu2026.js';

export const sizeLines = [{ id: 'all', name: null, hint: null }];

const w = catalog.sizeWeights;
const d = (id) => sizeDetails[id] ?? {};

const size = (id, name, line, order) => ({
  id,
  name,
  line,
  weightKg: w[id] ?? null,
  slices: d(id).slices ?? null,
  dimensions: d(id).dimensions ?? null,
  shape: d(id).shape ?? null,
  order,
});

export const sizes = [
  size('bento', 'Bentô Cake', 'all', 1),
  size('p', 'Bolo P', 'all', 2),
  size('m', 'Bolo M', 'all', 3),
  size('g', 'Bolo G', 'all', 4),
  size('long', 'Long Cake', 'all', 5),
  size('g1', 'Bolo G1', 'all', 6),
  size('g2', 'Bolo G2', 'all', 7),
];

/** Texto curto para o cartão: "até 20 fatias · 15 cm · 2,3 kg". */
export function sizeHint(s) {
  const kg = s.weightKg != null ? `${String(s.weightKg).replace('.', ',')} kg` : null;
  return [s.slices, s.dimensions, kg].filter(Boolean).join(' · ');
}
