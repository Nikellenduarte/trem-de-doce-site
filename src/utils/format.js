const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatCurrency(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'a confirmar';
  return brl.format(value);
}

export function plural(n, singular, pluralForm) {
  return n === 1 ? singular : pluralForm;
}

export function unitsLabel(n) {
  return `${n} ${plural(n, 'unidade', 'unidades')}`;
}

/** 'YYYY-MM-DD' → 'DD/MM/YYYY' (com dia da semana opcional). */
export function formatDateBR(iso, { weekday = false } = {}) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso ?? '';
  const [y, m, d] = iso.split('-');
  const base = `${d}/${m}/${y}`;
  if (!weekday) return base;
  const wd = new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long' });
  return `${base} (${wd})`;
}

/** Máscara leve de telefone BR: (34) 98419-1050 */
export function formatPhoneBR(value) {
  const d = (value || '').replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
