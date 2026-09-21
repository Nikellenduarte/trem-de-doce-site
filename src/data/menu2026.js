/**
 * MENU 2026 (PDF "Menu Trem de Doce 2026 Oficial")
 * ------------------------------------------------------------
 * Informações que NÃO estão no CSV e vieram do cardápio oficial em PDF:
 * fatias/medidas dos tamanhos, descrições dos sabores de bolo, sabores
 * de brigadeiros e brownies, avisos comerciais e divergências de preço.
 *
 * Tudo aqui é transcrição do PDF (páginas indicadas). Nada inventado.
 */

/** Passo 1 (p.3): fatias e tamanho aproximado. */
export const sizeDetails = {
  bento: { slices: 'de 2 a 4 fatias', dimensions: '10 cm', shape: null },
  p: { slices: 'até 12 fatias', dimensions: '15 cm', shape: null },
  m: { slices: 'até 20 fatias', dimensions: '15 cm', shape: null },
  g: { slices: 'até 32 fatias', dimensions: '20 cm', shape: null },
  long: { slices: 'até 50 fatias', dimensions: '15 × 40 cm', shape: 'retangular' },
  g1: { slices: 'até 50 fatias', dimensions: '25 cm', shape: 'quadrado' },
  // p.3 imprime "Bolo G1" duas vezes; a segunda linha (100 fatias, 30×40 cm, 12 kg) é o G2.
  g2: { slices: 'até 100 fatias', dimensions: '30 × 40 cm', shape: 'retangular' },
};

/** Passo 2 (p.4–5): descrição por sabor e massa. */
export const cakeFlavorDetails = {
  vanilla: {
    'Dois Amores': 'Camada de brigadeiro tradicional e brigadeiro de Ninho no mesmo bolo.',
    'Abacaxi com Coco': 'Clássico e nostálgico! Brigadeiro de coco em flocos combinado a compota artesanal de abacaxi.',
    'Ninho com Morango': 'Brigadeiro de leite Ninho com geleia artesanal de morango.',
    'Doce de Leite com Nozes': 'Doce de leite recheado com pedaços de nozes trituradas.',
    'Pistache com Ninho': 'Recheio de brigadeiro de pistache combinado com brigadeiro de leite Ninho.',
    'Ninho com Nutella': 'Brigadeiro de leite Ninho com o sabor inconfundível da Nutella original.',
    'Limão com Frutas Vermelhas': 'Sabor e frescor! Brigadeiro de limão com geleia artesanal de frutas vermelhas.',
  },
  chocolate: {
    'Dois Amores': 'Camada de brigadeiro tradicional e brigadeiro de Ninho na massa de chocolate.',
    'Maracujá com Brigadeiro': 'Brigadeiro 50% cacau harmonizado com brigadeiro de maracujá.',
    Brigadeiro: 'Recheio de brigadeiro com lascas de chocolate meio amargo que derretem na boca.',
    'Prestígio de Coco': 'Brigadeiro intenso 50% cacau combinado com um recheio de coco em flocos.',
    Chocomello: 'Brigadeiro 50% cacau combinado com caramelo cremoso e um delicioso crocante de amendoim.',
    'Ninho com Nutella': 'Brigadeiro de leite Ninho com o sabor inconfundível da Nutella original e nossa massa intensa de chocolate.',
  },
};

/** Selos do cardápio (p.5). */
export const cakeFlavorBadges = {
  'Limão com Frutas Vermelhas': 'O mais vendido em casamentos',
};

/**
 * Divergências entre o PDF e o CSV. Adotamos o PDF (mais recente) e
 * deixamos o registro aqui. TODO: confirmar com a confeitaria.
 */
export const priceOverrides = [
  { sizeId: 'g', tier: 'premium', price: 340, csvPrice: 360, source: 'Menu 2026, p.5 (Sabores Premium: Bolo G 340,00)' },
];

/** Brigadeiros (p.6). */
export const brigadeiroFlavors = {
  special: ['Pistache', 'Cereja', 'Amêndoas', 'Nozes com Chocolate Branco', 'Chocolate Branco com Morango'],
  classic: [
    'Chocolate ao Leite',
    'Chocolate Meio Amargo',
    'Chocolate Branco Crocante',
    'Ninho e Nutella',
    'Ninho (Colorido)',
    'Dois Amores',
    'Maracujá',
    'Churros',
    'Beijinho de Coco',
    'Ninho e Uva Verde',
    'Limão Siciliano',
    'Caramelo Salgado',
    'Moranguinho',
    'Coco Queimado',
  ],
};

/** Petit Brownie (p.7). */
export const brownieFlavors = {
  special: ['Ninho e Morango', 'Brigadeiro e Cereja', 'Doce de Leite e Nozes', 'Ninho e Nutella', 'Kinder Bueno'],
  classic: ['Chocolate ao Leite', 'Chocolate Meio Amargo', 'Chocolate Branco Crocante', 'Nutella', 'Ninho (Colorido)', 'Dois Amores', 'Maracujá', 'Doce de Leite'],
  plain: ['Sem Recheio'],
};

/** Avisos comerciais transcritos. */
export const notices = {
  cakeExtras: 'Apliques, topos de bolo e outros são orçados individualmente.',
  cakeLayers: 'Nossos bolos possuem 4 camadas de massa e 3 camadas de recheio.',
  brigadeiroUnit: 'Unidades de 15 g a 16 g.',
  brigadeiroMin: 'Pedido mínimo de 20/25 unidades de cada sabor.',
  brigadeiroCustom: 'Personalizamos com carimbo e ejetor. Consulte disponibilidade no atendimento.',
  brownieMin: 'Pedido mínimo de 50 unidades, 25 unidades de cada sabor.',
  brownieCustom: 'Personalizamos com ejetor. Consulte disponibilidade no atendimento.',
  perGuest: 'Indicamos de 4 a 8 doces por convidado, a depender de outros acompanhamentos.',
  mimosSmall: 'Pedido mínimo 25 unidades. Tamanho 5 × 5 cm.',
  mimosLarge: 'Pedido mínimo 12 unidades.',
};

/** Mimos (p.8–9): no PDF, Bem Casado e Mini Bolo também são "a partir de". */
export const mimosPriceFrom = ['bem-casado-classico', 'mini-bolo-individual', 'caixa-de-brigadeiros', 'cupcakes'];

/** Apresentação da fundadora (p.2). */
export const founderGreeting = 'Oii, sou a Lohanny.';
