/**
 * ORDER RULES (regras comerciais)
 * ------------------------------------------------------------
 * Centraliza mínimos e quantidades. Alterar aqui reflete em toda a
 * validação (utils/validation.js) e nos textos de apoio.
 * Fonte: CSV oficial (descrições dos produtos) + briefing.
 */
import catalog from './generated/catalog.json' with { type: 'json' };
import { notices } from './menu2026.js';

export const rules = {
  cake: {
    minQuantity: 1,
    maxQuantity: 10,
    /** CSV + Menu 2026 (p.3). */
    details: '4 camadas de massa e 3 de recheio. Decoração em buttercream (exceto Bentô e Bolo P).',
    extrasNote: notices.cakeExtras,
  },
  brigadeiro: {
    lines: [
      { id: 'classic', name: 'Sabores Clássicos', hint: 'Sabores tradicionais.' },
      { id: 'special', name: 'Sabores Especiais', hint: 'Combinações mais elaboradas.' },
    ],
    boxSizes: [50, 100],
    /**
     * CSV: "Pedido mínimo de 20 a 25 unidades por sabor".
     * TODO: confirmar o valor exato com a confeitaria. Usamos 25 (o mais
     * conservador). Ex.: caixa de 100 → até 4 sabores.
     */
    minPerFlavor: 25,
    mixNote: 'Misturar sabores não altera o valor da caixa.',
    details: `${notices.brigadeiroUnit} ${notices.brigadeiroMin}`,
    customNote: notices.brigadeiroCustom,
    perGuestNote: notices.perGuest,
  },
  brownie: {
    lines: [
      { id: 'special', name: 'Sabores Especiais', hint: 'Recheios especiais.' },
      { id: 'classic', name: 'Sabores Clássicos', hint: 'Recheios tradicionais.' },
      { id: 'plain', name: 'Sem Recheio', hint: 'O brownie puro, intenso.' },
    ],
    /** CSV: caixa fechada de 50 ou 100, 25 por sabor. */
    boxSizes: [50, 100],
    minPerFlavor: 25,
    mixNote: 'Misturar sabores não altera o valor da caixa.',
    details: notices.brownieMin,
    customNote: notices.brownieCustom,
    perGuestNote: notices.perGuest,
  },
  mimos: {
    defaultMinQuantity: 1, // usado só se o produto não informar mínimo
    step: 1,
    maxQuantity: 500,
  },

  /**
   * RESERVA (dados do evento enviados junto com o pedido).
   * minLeadDays: antecedência mínima em dias para a data do evento.
   * TODO: confirmar antecedência real com a confeitaria (0 = só bloqueia datas passadas).
   */
  booking: {
    minLeadDays: 0,
    /** Tipos de evento (cliente, 16/09/2026: "Casamento, aniversário, debutante, etc."). */
    eventTypes: ['Casamento', 'Aniversário', 'Aniversário infantil', 'Debutante (15 anos)', 'Chá de bebê / revelação', 'Batizado', 'Formatura', 'Evento corporativo', 'Outro'],
    notesPlaceholder: 'Ex.: frase no topo do bolo, tema da festa, cor da fita, alergias.',
  },

  /**
   * DESCONTOS POR VOLUME — estrutura pronta, sem regras ativas.
   * Ex.: { categoryIds: ['brigadeiro','brownie'], minUnits: 200, percent: 5 }
   * TODO: só ativar com regra confirmada pela confeitaria.
   */
  volumeDiscounts: [],
};
