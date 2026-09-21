/**
 * WHATSAPP SERVICE
 * ------------------------------------------------------------
 * Monta a mensagem a partir do pedido normalizado (ver utils/order.js)
 * e gera o link wa.me. Nenhum texto comercial fixo fora daqui.
 */
import { formatCurrency, formatDateBR } from '../utils/format.js';

export function buildOrderMessage(order, business) {
  const lines = [
    `Olá, ${business.shortName}! 🍰`,
    '',
    'Vim pelo site e gostaria de fazer um pedido.',
    '',
    `*Produto:* ${order.productName}`,
  ];

  order.options.forEach((opt) => {
    lines.push(`*${opt.label}:* ${opt.value}`);
  });

  lines.push(`*Quantidade:* ${order.quantityLabel}`);
  lines.push('');

  if (order.totals.known) {
    lines.push(`*Valor estimado:* ${formatCurrency(order.totals.total)}`);
  } else {
    lines.push('*Valor estimado:* a confirmar com a confeitaria');
  }

  lines.push('');
  lines.push('Gostaria de verificar a disponibilidade e os próximos passos. 😊');

  return lines.join('\n');
}

/**
 * Mensagem de RESERVA: dados do evento + todos os itens do carrinho.
 * booking: { name, date, eventType, notes }
 * totals: retorno de cartTotals()
 */
export function buildReservationMessage({ items, booking, totals }, business) {
  const lines = [
    `Olá, ${business.shortName}! 🍰`,
    '',
    'Vim pelo site e gostaria de fazer uma reserva.',
    '',
    `*Nome:* ${booking.name.trim()}`,
    `*Data do evento:* ${formatDateBR(booking.date, { weekday: true })}`,
    `*Tipo de evento:* ${booking.eventType?.trim() ? booking.eventType.trim() : 'a informar'}`,
    '',
    `*Itens do pedido (${items.length}):*`,
  ];

  items.forEach((item, i) => {
    const opts = item.options.map((o) => o.value).join(' · ');
    const price = item.totals.known ? formatCurrency(item.totals.total) : 'valor a confirmar';
    lines.push(`${i + 1}. *${item.productName}*${opts ? ` — ${opts}` : ''}`);
    lines.push(`   ${item.quantityLabel} — ${price}`);
  });

  if (booking.coupon?.trim()) {
    lines.push('');
    lines.push(`*Cupom de parceiro:* ${booking.coupon.trim()}`);
  }

  if (booking.notes?.trim()) {
    lines.push('');
    lines.push(`*Observações:* ${booking.notes.trim()}`);
  }

  lines.push('');
  if (totals.known) {
    if (totals.discount > 0) lines.push(`*Desconto:* -${formatCurrency(totals.discount)}`);
    lines.push(`*Valor estimado:* ${formatCurrency(totals.total)}`);
  } else if (totals.subtotal > 0) {
    lines.push(`*Valor estimado:* ${formatCurrency(totals.subtotal)} + itens a confirmar`);
  } else {
    lines.push('*Valor estimado:* a confirmar com a confeitaria');
  }

  lines.push('');
  lines.push('Gostaria de confirmar a disponibilidade da data e os próximos passos. 😊');
  return lines.join('\n');
}

export function buildWhatsAppUrl(phoneNumber, message) {
  const digits = String(phoneNumber).replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/**
 * Link genérico (botão flutuante / contato). Usa o link curto oficial
 * (wa.me/message/…) quando existir — ele não aceita texto pré-preenchido,
 * por isso o ENVIO DO PEDIDO continua usando o número + texto.
 */
export function buildContactUrl(business) {
  if (business.contact.whatsappLink) return business.contact.whatsappLink;
  const msg = `Olá, ${business.shortName}! 🍰 Vim pelo site e gostaria de fazer uma encomenda.`;
  return buildWhatsAppUrl(business.contact.whatsappNumber, msg);
}
