/**
 * TESTIMONIALS (depoimentos)
 * ------------------------------------------------------------
 * Depoimentos REAIS enviados pelo cliente em 20/09/2026: prints de
 * conversas de WhatsApp (e de um comentário) publicados nos stories
 * "Feedback" do Instagram da confeitaria. As imagens foram recortadas
 * (sem as bordas pretas e sem a interface do story), todas em 739×1140,
 * e ficam em public/images/feedback-*.webp.
 *
 * `quote` é transcrição LITERAL de mensagens que aparecem no print
 * (apenas unidas em uma frase). Nunca inventar depoimento: para incluir
 * um novo, use o texto e/ou o print real.
 *
 * Campos: { id, quote, name, occasion?, image?, imageAlt?, placeholder?, active }
 *  - com `image`  → cartão com o print + legenda
 *  - sem `image`  → cartão só de texto
 *  - `placeholder: true` mostra a marca "exemplo" (não há nenhum hoje)
 */
export const testimonials = [
  {
    id: 'clara',
    quote: 'Que bolo gostoso!!! Todos amaram, pediram para repetir pedaços.',
    name: 'Clara',
    occasion: null,
    image: '/images/feedback-clara.webp',
    imageAlt:
      'Print de conversa no WhatsApp: "Gostamos muito. Lohanny do céu, que bolo gostoso! Todos amaram, pediram para repetir pedaços. Graças a Deus sobrou ainda pra gente comer hoje." Abaixo, um bolo decorado em amarelo com flores lilás.',
    active: true,
  },
  {
    id: 'elida',
    quote: 'A festa foi um sucesso! Você é muito dedicada e está de parabéns com os produtos que você fornece, seja doces, bolos e todas as gostosuras!!!',
    name: 'Élida',
    occasion: 'Festa de aniversário',
    image: '/images/feedback-elida.webp',
    imageAlt:
      'Print de conversa no WhatsApp: "A festa foi um sucesso. Você é muito dedicada e está de parabéns com os produtos que você fornece, seja doces, bolos e todas as gostosuras! Sucessos a mil pra você." Ao redor, fotos da mesa de doces e do bolo da festa.',
    active: true,
  },
  {
    id: 'thaysa',
    quote: 'Todo mundo amou o bolo, os docinhos. Aquele de caramelo fez sucesso, todo mundo amou.',
    name: 'Thaysa',
    occasion: null,
    image: '/images/feedback-thaysa.webp',
    imageAlt:
      'Print de conversa no WhatsApp: "Mais fez sucesso. Delícia! Todo mundo amou o bolo, os docinhos. Aquele de caramelo fez sucesso, todo mundo amou. Parabéns! Ficaram lindos. Tudo maravilhoso." Ao lado, o bolo decorado com cerejas e bandejas de docinhos modelados.',
    active: true,
  },
  {
    id: 'nathalia',
    quote: 'Foi incrível! Eu amei cada detalhe do bolo, ainda não superei tanta perfeição.',
    name: 'Nathalia',
    occasion: null,
    image: '/images/feedback-nathalia.webp',
    imageAlt:
      'Print de conversa no WhatsApp: "Foi incrível! Eu amei cada detalhe do bolo, ainda não superei tanta perfeição. Amei a atenção em cada detalhe que vocês tiveram, na caixa, nas instruções, em tudo! Fora o sabor, né? Maravilhoso! Foi simplesmente perfeito, muito obrigada." Abaixo, um bolo decorado com laços marrons.',
    active: true,
  },
  {
    id: 'bruniis',
    quote: 'Cada sabor melhor que o outro, cada detalhe maravilhoso. Obrigada por fazer parte desse momento.',
    name: '@bruniis.f',
    occasion: 'Comentário no Instagram',
    image: '/images/feedback-bruniis.webp',
    imageAlt:
      'Story com o comentário de bruniis.f: "Cada sabor melhor que o outro, cada detalhe maravilhoso. Obrigada por fazer parte desse momento." Ao fundo, caixas de docinhos modelados em azul e branco.',
    active: true,
  },
];
