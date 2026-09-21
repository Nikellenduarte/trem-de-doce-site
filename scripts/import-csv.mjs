/**
 * IMPORTADOR DO CATÁLOGO OFICIAL
 * ------------------------------------------------------------
 * Lê briefing/produtos-trem-de-doce.csv (export da loja, separador ';')
 * e gera src/data/generated/catalog.json, consumido por src/data/*.
 *
 *   node scripts/import-csv.mjs
 *
 * Regras de mapeamento (documentadas no README):
 *  - Bolos: 2 produtos (massa baunilha/chocolate) × Tamanho × Sabor.
 *    O CSV não traz "linha" do sabor; o tier (classic/premium) é derivado
 *    do preço: dentro de um tamanho, o patamar mais baixo é Clássico e o
 *    mais alto é Premium. Bentô tem preço único.
 *  - Brigadeiros e Petit Brownie: caixas fechadas (Linha × Quantidade).
 *    Os SABORES não estão no CSV (ficam manuais em flavors.js).
 *  - Mimos: preço unitário, mínimo e "a partir de" lidos da descrição.
 * Qualquer inconsistência é impressa no console e gravada em `warnings`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(root, 'briefing/produtos-trem-de-doce.csv');
const OUT = resolve(root, 'src/data/generated/catalog.json');

const warnings = [];
const warn = (m) => warnings.push(m);

// ---------- parse ----------
const raw = readFileSync(SRC, 'utf8').replace(/^﻿/, '');
const lines = raw.split(/\r?\n/).filter((l) => l.trim() !== '');
const header = lines[0].split(';');
const col = (name) => {
  const i = header.indexOf(name);
  if (i < 0) throw new Error(`Coluna ausente no CSV: ${name}`);
  return i;
};
const C = {
  slug: col('Identificador URL'),
  name: col('Nome'),
  category: col('Categorias'),
  v1n: col('Nome da variação 1'),
  v1v: col('Valor da variação 1'),
  v2n: col('Nome da variação 2'),
  v2v: col('Valor da variação 2'),
  price: col('Preço'),
  weight: col('Peso (kg)'),
  show: col('Exibir na loja'),
  desc: col('Descrição'),
};

const rows = lines.slice(1).map((l, i) => {
  const c = l.split(';');
  return {
    line: i + 2,
    slug: c[C.slug],
    name: c[C.name],
    category: c[C.category],
    v1n: c[C.v1n],
    v1v: c[C.v1v],
    v2n: c[C.v2n],
    v2v: c[C.v2v],
    price: c[C.price] === '' ? null : Number(c[C.price]),
    weight: c[C.weight] === '' ? null : Number(c[C.weight]),
    show: c[C.show],
    desc: c[C.desc],
  };
});

// Propaga nome/categoria/descrição das linhas-pai para as variações
const products = new Map();
for (const r of rows) {
  if (!products.has(r.slug)) {
    if (!r.name) warn(`Linha ${r.line}: variação de "${r.slug}" antes do produto-pai.`);
    products.set(r.slug, { slug: r.slug, name: r.name, category: r.category, desc: r.desc, show: r.show, variations: [] });
  }
  const p = products.get(r.slug);
  if (r.price === null || Number.isNaN(r.price)) warn(`Linha ${r.line}: preço ausente/inválido em "${r.slug}".`);
  p.variations.push(r);
}

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// ---------- Bolos ----------
const SIZE_IDS = { 'Bentô Cake': 'bento', 'Bolo P': 'p', 'Bolo M': 'm', 'Bolo G': 'g', 'Long Cake': 'long', 'Bolo G1': 'g1', 'Bolo G2': 'g2' };
const DOUGH_BY_SLUG = { 'bolo-de-festa-massa-baunilha': 'vanilla', 'bolo-de-festa-massa-chocolate': 'chocolate' };

const cakeFlavors = [];
const cakePricing = new Map(); // `${sizeId}|${tier}` → price
const sizeWeights = {};
const cakeDescriptions = {};

for (const [slug, dough] of Object.entries(DOUGH_BY_SLUG)) {
  const p = products.get(slug);
  if (!p) {
    warn(`Produto de bolo ausente: ${slug}`);
    continue;
  }
  cakeDescriptions[dough] = p.desc;
  // preços por sabor por tamanho
  const bySize = new Map(); // sizeId → Map(flavor → price)
  for (const v of p.variations) {
    if (v.v1n !== 'Tamanho' || v.v2n !== 'Sabor') {
      warn(`Linha ${v.line}: variação inesperada (${v.v1n}/${v.v2n}).`);
      continue;
    }
    const sizeId = SIZE_IDS[v.v1v];
    if (!sizeId) {
      warn(`Linha ${v.line}: tamanho desconhecido "${v.v1v}".`);
      continue;
    }
    if (v.weight != null) sizeWeights[sizeId] = v.weight;
    if (!bySize.has(sizeId)) bySize.set(sizeId, new Map());
    bySize.get(sizeId).set(v.v2v, v.price);
  }
  // deriva tier por sabor usando tamanhos não-Bentô
  const tierVotes = new Map(); // flavor → Set(tier)
  for (const [sizeId, flavorPrices] of bySize) {
    const prices = [...new Set(flavorPrices.values())].sort((a, b) => a - b);
    if (prices.length > 2) warn(`Bolo ${dough} ${sizeId}: ${prices.length} patamares de preço (${prices.join(', ')}); esperado no máximo 2.`);
    for (const [flavor, price] of flavorPrices) {
      const tier = prices.length === 1 ? null : price === prices[0] ? 'classic' : 'premium';
      if (tier) {
        if (!tierVotes.has(flavor)) tierVotes.set(flavor, new Set());
        tierVotes.get(flavor).add(tier);
      }
    }
    if (prices.length === 2) {
      cakePricing.set(`${sizeId}|classic`, prices[0]);
      cakePricing.set(`${sizeId}|premium`, prices[1]);
    } else {
      cakePricing.set(`${sizeId}|classic`, prices[0]);
      cakePricing.set(`${sizeId}|premium`, prices[0]);
    }
  }
  const allFlavors = new Set([...bySize.values()].flatMap((m) => [...m.keys()]));
  for (const flavor of allFlavors) {
    const votes = tierVotes.get(flavor) ?? new Set();
    if (votes.size > 1) warn(`Sabor "${flavor}" (${dough}) muda de patamar entre tamanhos: ${[...votes].join('/')}.`);
    const tier = votes.size ? [...votes][0] : 'classic';
    // sabor precisa existir em todos os tamanhos
    const missing = [...bySize.keys()].filter((s) => !bySize.get(s).has(flavor));
    if (missing.length) warn(`Sabor "${flavor}" (${dough}) não existe nos tamanhos: ${missing.join(', ')}.`);
    cakeFlavors.push({ id: `cake-${dough === 'vanilla' ? 'v' : 'c'}-${slugify(flavor)}`, categoryId: 'cake', name: flavor, dough, tier, active: true });
  }
}
// sabores presentes nas duas massas (briefing dizia que cada sabor tem uma massa)
const byName = new Map();
cakeFlavors.forEach((f) => byName.set(f.name, [...(byName.get(f.name) ?? []), f.dough]));
for (const [name, doughs] of byName) if (doughs.length > 1) warn(`Sabor "${name}" existe nas duas massas (${doughs.join(', ')}).`);

// ---------- Caixas (brigadeiros / brownies) ----------
const LINE_IDS = { 'Sabores Clássicos': 'classic', 'Sabores Especiais': 'special', 'Sem Recheio': 'plain' };
const boxPricing = { brigadeiro: [], brownie: [] };
const boxDescriptions = {};
for (const [slug, categoryId] of [
  ['brigadeiros', 'brigadeiro'],
  ['petit-brownie', 'brownie'],
]) {
  const p = products.get(slug);
  if (!p) {
    warn(`Produto ausente: ${slug}`);
    continue;
  }
  boxDescriptions[categoryId] = p.desc;
  for (const v of p.variations) {
    const line = LINE_IDS[v.v1v];
    const qty = parseInt(v.v2v, 10);
    if (!line || !qty) {
      warn(`Linha ${v.line}: variação inesperada em ${slug} (${v.v1v}/${v.v2v}).`);
      continue;
    }
    boxPricing[categoryId].push({ line, quantity: qty, price: v.price });
  }
}

// ---------- Mimos ----------
const mimos = [];
for (const p of products.values()) {
  if (p.category !== 'Mimos e Lembrancinhas') continue;
  const v = p.variations[0];
  const minMatch = /m[ií]nimo de (\d+)/i.exec(p.desc ?? '');
  const priceFrom = /a partir de/i.test(p.desc ?? '');
  if (!minMatch) warn(`Mimo "${p.name}": quantidade mínima não encontrada na descrição.`);
  mimos.push({
    id: p.slug.replace(/-mimo$/, ''),
    categoryId: 'mimos',
    name: p.name,
    description: p.desc,
    price: v.price,
    priceFrom,
    minQuantity: minMatch ? parseInt(minMatch[1], 10) : null,
    active: p.show === 'SIM',
  });
}

// ---------- saída ----------
const out = {
  generatedAt: new Date().toISOString(),
  source: 'briefing/produtos-trem-de-doce.csv',
  sizeWeights,
  cakeDescriptions,
  cakeFlavors: cakeFlavors.sort((a, b) => a.dough.localeCompare(b.dough) || a.tier.localeCompare(b.tier) || a.name.localeCompare(b.name)),
  cakePricing: [...cakePricing].map(([k, price]) => {
    const [sizeId, tier] = k.split('|');
    return { sizeId, tier, price };
  }),
  boxPricing,
  boxDescriptions,
  mimos,
  warnings,
};
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(`✔ ${OUT}`);
console.log(`  bolos: ${cakeFlavors.length} sabores, ${out.cakePricing.length} preços · brigadeiros: ${boxPricing.brigadeiro.length} · brownies: ${boxPricing.brownie.length} · mimos: ${mimos.length}`);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} observação(ões):`);
  warnings.forEach((w) => console.log('  - ' + w));
}
