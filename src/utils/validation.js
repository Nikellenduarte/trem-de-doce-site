/**
 * VALIDATION
 * ------------------------------------------------------------
 * Regras de negócio puras (sem React). Cada função devolve
 * { valid, errors: string[], hints: string[] } com mensagens amigáveis.
 */

const result = (errors = [], hints = []) => ({ valid: errors.length === 0, errors, hints });

/** Bolo: tamanho, massa e sabor obrigatórios; sabor precisa ser compatível com a massa. */
export function validateCake({ size, dough, flavor, quantity }, rules) {
  const errors = [];
  if (!size) errors.push('Escolha o tamanho do bolo.');
  if (!dough) errors.push('Escolha a massa.');
  if (!flavor) errors.push('Escolha o sabor.');
  if (flavor && dough && flavor.dough !== dough.id) {
    errors.push(`O sabor ${flavor.name} é preparado apenas na massa ${flavor.dough === 'vanilla' ? 'Baunilha' : 'Chocolate'}.`);
  }
  if (quantity < rules.minQuantity) errors.push(`A quantidade mínima é ${rules.minQuantity}.`);
  if (quantity > rules.maxQuantity) errors.push(`Para mais de ${rules.maxQuantity} bolos, fale conosco pelo WhatsApp.`);
  return result(errors);
}

/**
 * Caixa fechada (brigadeiros e brownies: 50/100); soma dos sabores deve
 * fechar a caixa; cada sabor com pelo menos `minPerFlavor` unidades.
 */
export function validateBox({ line, boxSize, allocations }, rules, noun = 'doces') {
  const errors = [];
  const hints = [];
  if (!line) errors.push(`Escolha a linha de ${noun}.`);
  if (!boxSize) errors.push('Escolha a quantidade da caixa.');
  const entries = Object.values(allocations || {});
  if (boxSize && entries.length === 0) {
    errors.push('Escolha pelo menos um sabor.');
    return result(errors, hints);
  }
  const total = entries.reduce((s, a) => s + a.quantity, 0);
  entries.forEach((a) => {
    if (a.quantity < rules.minPerFlavor) {
      errors.push(`Para o sabor ${a.flavor.name}, o mínimo é de ${rules.minPerFlavor} unidades.`);
    }
  });
  if (boxSize && total !== boxSize) {
    const diff = boxSize - total;
    if (diff > 0) errors.push(`${diff === 1 ? 'Falta 1 unidade' : `Faltam ${diff} unidades`} para completar a caixa de ${boxSize}.`);
    else errors.push(`A caixa de ${boxSize} está com ${-diff === 1 ? '1 unidade' : `${-diff} unidades`} a mais.`);
  }
  if (boxSize) hints.push(`Caixa de ${boxSize}: até ${Math.floor(boxSize / rules.minPerFlavor)} sabores, com pelo menos ${rules.minPerFlavor} unidades de cada.`);
  return result(errors, hints);
}

export const validateBrigadeiroBox = (state, rules) => validateBox(state, rules, 'brigadeiros');
export const validateBrownieBox = (state, rules) => validateBox(state, rules, 'brownies');

/** Quantidade livre com total mínimo e mínimo por sabor (mantido para uso futuro). */
export function validateBrownieOrder({ line, allocations }, rules) {
  const errors = [];
  const hints = [`Pedido mínimo de ${rules.minTotal} unidades, com pelo menos ${rules.minPerFlavor} de cada sabor.`];
  if (!line) errors.push('Escolha a linha de brownies.');
  const entries = Object.values(allocations || {});
  if (entries.length === 0) {
    errors.push('Escolha pelo menos um sabor.');
    return result(errors, hints);
  }
  const total = entries.reduce((s, a) => s + a.quantity, 0);
  entries.forEach((a) => {
    if (a.quantity < rules.minPerFlavor) {
      errors.push(`Para o sabor ${a.flavor.name}, o pedido mínimo é de ${rules.minPerFlavor} unidades.`);
    }
  });
  if (total < rules.minTotal) {
    errors.push(`Faltam ${rules.minTotal - total} unidades para o pedido mínimo de ${rules.minTotal}.`);
  }
  return result(errors, hints);
}

/** Data mínima permitida para o evento (YYYY-MM-DD), considerando a antecedência. */
export function minEventDate(rules, today = new Date()) {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (rules.minLeadDays ?? 0));
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Dados da reserva: nome, data do evento e tipo de evento obrigatórios. */
export function validateBooking({ name, date, eventType }, rules, today = new Date()) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Conte para a gente o seu nome.';
  if (!eventType || !eventType.trim()) errors.eventType = 'Escolha o tipo de evento.';
  if (!date) {
    errors.date = 'Escolha a data do evento.';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(new Date(`${date}T12:00:00`).getTime())) {
    errors.date = 'Essa data não parece válida.';
  } else if (date < minEventDate(rules, today)) {
    errors.date =
      (rules.minLeadDays ?? 0) > 0
        ? `Precisamos de pelo menos ${rules.minLeadDays} ${rules.minLeadDays === 1 ? 'dia' : 'dias'} de antecedência.`
        : 'A data do evento não pode estar no passado.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

/** Mimos: quantidade >= mínimo do produto. */
export function validateCatalogItem({ product, quantity }, rules) {
  const errors = [];
  if (!product) errors.push('Escolha um mimo.');
  const min = product?.minQuantity ?? rules.defaultMinQuantity;
  if (product && quantity < min) errors.push(`Para ${product.name}, o pedido mínimo é de ${min} unidades.`);
  return result(errors);
}
