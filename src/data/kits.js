/**
 * KITS "FESTA COMPLETA" (kits pré-definidos)
 * ------------------------------------------------------------
 * Composição informada pelo cliente em 15/09/2026.
 * ⚠️ TODO (cliente): preço de cada kit, tamanho do bolo incluído e
 * linha/sabores dos doces. Enquanto `price` for null o site mostra
 * "valor a confirmar" e a mensagem do WhatsApp pede confirmação.
 *
 * Campos: { id, name, guests, items: [{ label, quantity }], summary,
 *           cakeSize?, price, priceFrom?, note, active, order }
 */
export const kits = [
  {
    id: 'festa-50',
    name: 'Festa para 50 pessoas',
    guests: 50,
    items: [
      { label: 'Bolo', quantity: 1 },
      { label: 'Brigadeiros', quantity: 300 },
    ],
    summary: 'Bolo + 300 brigadeiros',
    cakeSize: null, // TODO: ex.: 'g'
    price: null, // TODO
    priceFrom: false,
    note: 'Sabores do bolo e dos brigadeiros combinados pelo WhatsApp.',
    active: true,
    order: 1,
  },
  {
    id: 'festa-100',
    name: 'Festa para 100 pessoas',
    guests: 100,
    items: [
      { label: 'Bolo', quantity: 1 },
      { label: 'Brigadeiros', quantity: 500 },
    ],
    summary: 'Bolo + 500 brigadeiros',
    cakeSize: null, // TODO
    price: null, // TODO
    priceFrom: false,
    note: 'Sabores do bolo e dos brigadeiros combinados pelo WhatsApp.',
    active: true,
    order: 2,
  },
  {
    id: 'festa-200',
    name: 'Festa para 200 pessoas',
    guests: 200,
    items: [
      { label: 'Bolo', quantity: 1 },
      { label: 'Doces', quantity: 1000 },
    ],
    summary: 'Bolo + 1000 doces',
    cakeSize: null, // TODO
    price: null, // TODO
    priceFrom: false,
    note: 'Sabores do bolo e a seleção de doces combinados pelo WhatsApp.',
    active: true,
    order: 3,
  },
];
