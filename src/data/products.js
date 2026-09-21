/**
 * PRODUCTS (catálogo de itens simples — categoria Mimos)
 * ------------------------------------------------------------
 * Dados OFICIAIS do CSV (via scripts/import-csv.mjs): nome, preço,
 * quantidade mínima e "a partir de" (priceFrom). Imagens: TODO.
 */
import catalog from './generated/catalog.json' with { type: 'json' };
import { mimosPriceFrom } from './menu2026.js';

// Fotos do Menu 2026 (p.8–9).
const IMAGES = {
  'bem-casado-classico': '/images/mimo-bem-casado.webp',
  'brownie-com-laco-e-tag': '/images/mimo-brownie-laco-tag.webp',
  'brownie-com-tag': '/images/mimo-brownie-tag.webp',
  'caixa-de-brigadeiros': '/images/mimo-caixa-brigadeiros.webp',
  'mini-bolo-individual': '/images/mimo-mini-bolo.webp',
  cupcakes: '/images/mimo-cupcakes.webp', // parece foto de banco de imagens — confirmar com a confeitaria
};

const META = {
  'bem-casado-classico': { unit: 'unidade', imageAlt: 'Bem casado clássico', blurb: 'Clássico dos casamentos, delicado e afetivo.' },
  'brownie-com-laco-e-tag': { unit: 'unidade', imageAlt: 'Brownie com laço e tag', blurb: 'Brownie com laço de cetim e tag, pronto para presentear.' },
  'brownie-com-tag': { unit: 'unidade', imageAlt: 'Brownie com tag', blurb: 'Brownie com tag personalizada para a sua ocasião.' },
  'caixa-de-brigadeiros': { unit: 'caixa', imageAlt: 'Caixa de brigadeiros', blurb: 'Caixinha de brigadeiros para lembrancinha.' },
  'mini-bolo-individual': { unit: 'unidade', imageAlt: 'Mini bolo individual', blurb: 'Um bolinho só seu, para celebrar em pequenas doses.' },
  cupcakes: { unit: 'unidade', imageAlt: 'Cupcakes decorados', blurb: 'Cupcakes decorados para festas e presentes.' },
};

export const products = catalog.mimos.map((m, i) => ({
  ...m,
  // Menu 2026 (p.8–9) marca mais itens como "a partir de" do que o CSV.
  priceFrom: m.priceFrom || mimosPriceFrom.includes(m.id),
  unit: META[m.id]?.unit ?? 'unidade',
  imageAlt: META[m.id]?.imageAlt ?? m.name,
  blurb: META[m.id]?.blurb ?? '',
  image: IMAGES[m.id] ?? null,
  placeholder: false,
  order: i + 1,
}));
