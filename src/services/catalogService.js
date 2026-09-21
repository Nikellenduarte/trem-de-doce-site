/**
 * CATALOG SERVICE
 * ------------------------------------------------------------
 * Contrato de acesso ao catálogo. Hoje é um provider ESTÁTICO que
 * lê src/data. Na Fase 3 basta criar `createApiCatalog()` com a
 * mesma assinatura e trocar em App.jsx — os componentes não mudam.
 */
import {
  business,
  categories,
  sizes,
  sizeLines,
  doughs,
  flavors,
  flavorTiers,
  products,
  rules,
  testimonials,
  kits,
} from '../data/index.js';

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);
const isActive = (item) => item.active !== false;

export function createStaticCatalog() {
  return {
    getBusiness: () => business,
    getRules: () => rules,
    getTestimonials: () => testimonials.filter(isActive),
    getKits: () => kits.filter(isActive).sort(byOrder),
    getKit: (id) => kits.find((k) => k.id === id) ?? null,
    getCategoryBySlug: (slug) => categories.find((c) => c.slug === slug) ?? null,

    getCategories: () => categories.filter(isActive).sort(byOrder),
    getCategory: (id) => categories.find((c) => c.id === id) ?? null,

    getSizeLines: () => sizeLines,
    getSizes: () => [...sizes].sort(byOrder),
    getSize: (id) => sizes.find((s) => s.id === id) ?? null,

    getDoughs: () => doughs,
    getDough: (id) => doughs.find((d) => d.id === id) ?? null,

    getFlavorTiers: () => flavorTiers,
    getFlavor: (id) => flavors.find((f) => f.id === id) ?? null,

    /** Sabores filtrados por categoria e, opcionalmente, massa (bolo) ou linha (caixas). */
    getFlavors: ({ categoryId, dough, line } = {}) =>
      flavors.filter(
        (f) =>
          isActive(f) &&
          (!categoryId || f.categoryId === categoryId) &&
          (!dough || f.dough === dough) &&
          (!line || f.line === line),
      ),

    getProducts: (categoryId) =>
      products.filter((p) => isActive(p) && (!categoryId || p.categoryId === categoryId)).sort(byOrder),
    getProduct: (id) => products.find((p) => p.id === id) ?? null,

    /** true enquanto houver dados de exemplo aguardando o catálogo oficial. */
    hasPlaceholders: () => flavors.some((f) => f.placeholder) || products.some((p) => p.placeholder),

    /** Categorias que ainda têm sabores/produtos de exemplo. */
    getPlaceholderCategories: () =>
      categories.filter(
        (c) => flavors.some((f) => f.placeholder && f.categoryId === c.id) || products.some((p) => p.placeholder && p.categoryId === c.id),
      ),
  };
}
