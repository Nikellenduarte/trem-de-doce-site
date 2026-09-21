/**
 * FLAVORS — todos OFICIAIS.
 * ------------------------------------------------------------
 * Bolo: sabores do CSV (src/data/generated/catalog.json) + descrições
 * e selos do Menu 2026 (menu2026.js). Tier (classic/premium) derivado
 * do patamar de preço por tamanho.
 *
 * Brigadeiros e Petit Brownie: sabores transcritos do Menu 2026
 * (p.6 e p.7). Sem placeholders.
 *
 * Brigadeiro: { categoryId:'brigadeiro', line:'classic'|'special' }
 * Brownie:    { categoryId:'brownie', line:'special'|'classic'|'plain' }
 */
import catalog from './generated/catalog.json' with { type: 'json' };
import { cakeFlavorDetails, cakeFlavorBadges, brigadeiroFlavors, brownieFlavors } from './menu2026.js';

export const flavorTiers = [
  { id: 'classic', name: 'Clássicos' },
  { id: 'premium', name: 'Premium' },
];

const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const cakeFlavors = catalog.cakeFlavors.map((f) => ({
  ...f,
  description: cakeFlavorDetails[f.dough]?.[f.name] ?? '',
  badge: cakeFlavorBadges[f.name] ?? null,
  placeholder: false,
}));

const boxFlavors = (categoryId, prefix, byLine) =>
  Object.entries(byLine).flatMap(([line, names]) =>
    names.map((name) => ({ id: `${prefix}-${line}-${slug(name)}`, categoryId, name, line, description: '', placeholder: false, active: true })),
  );

export const flavors = [...cakeFlavors, ...boxFlavors('brigadeiro', 'brig', brigadeiroFlavors), ...boxFlavors('brownie', 'brow', brownieFlavors)];
