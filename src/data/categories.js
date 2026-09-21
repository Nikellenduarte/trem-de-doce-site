/**
 * CATEGORIES
 * ------------------------------------------------------------
 * `builder` define qual configurador a categoria usa:
 *  - 'cake'    → tamanho → massa → sabor
 *  - 'box'     → linha → quantidade → sabores (brigadeiros / brownies)
 *  - 'catalog' → lista de produtos com quantidade (mimos)
 *  - 'kits'    → kits pré-definidos (Festa Completa)
 */
export const categories = [
  {
    id: 'cake',
    slug: 'bolos',
    name: 'Bolos',
    shortName: 'Bolos',
    description: 'Para aniversários, casamentos e comemorações que merecem um bolo especial.',
    image: '/images/categoria-bolos.webp', // foto enviada pelo cliente (Drive, 20/09/2026)
    imageAlt: 'Bolo branco decorado com cerejas e bordas em vermelho, sobre boleira branca',
    builder: 'cake',
    ctaLabel: 'Montar meu pedido',
    active: true,
    order: 1,
  },
  {
    id: 'brigadeiro',
    slug: 'brigadeiros',
    name: 'Brigadeiros',
    shortName: 'Brigadeiros',
    description: 'Docinhos artesanais para adoçar momentos importantes.',
    image: '/images/categoria-brigadeiros-menu.webp', // caixa de brigadeiros (Menu 2026, p.6). A foto da mesa enviada pelo cliente já é o topo do site e ficava repetida
    imageAlt: 'Caixa de brigadeiros artesanais da Trem de Doce',
    builder: 'box',
    ctaLabel: 'Montar meu pedido',
    active: true,
    order: 2,
  },
  {
    id: 'brownie',
    slug: 'petit-brownie',
    name: 'Petit Brownie',
    shortName: 'Brownies',
    description: 'Pequenos momentos de sabor para celebrar, presentear ou compartilhar.',
    image: '/images/categoria-brownies.webp', // Menu 2026, p.7
    imageAlt: 'Petit brownies artesanais da Trem de Doce',
    builder: 'box',
    ctaLabel: 'Montar meu pedido',
    active: true,
    order: 3,
  },
  {
    id: 'mimos',
    slug: 'mimos',
    name: 'Mimos e Lembrancinhas',
    shortName: 'Mimos',
    description: 'Lembrancinhas delicadas para tornar sua comemoração ainda mais especial.',
    image: '/images/categoria-mimos.webp', // foto enviada pelo cliente (Drive, 20/09/2026); a do Menu 2026 segue em categoria-mimos-menu.webp
    imageAlt: 'Brownie embalado com tag personalizada, segurado sobre uma caixa de lembrancinhas',
    builder: 'catalog',
    ctaLabel: 'Conhecer opções',
    active: true,
    order: 4,
  },
  {
    id: 'kits',
    slug: 'festa-completa',
    name: 'Festa Completa',
    shortName: 'Festa Completa',
    description: 'Kits prontos para celebrar: bolo e doces na medida do número de convidados.',
    image: '/images/categoria-festa-completa.webp', // foto enviada pelo cliente (Drive, 20/09/2026)
    imageAlt: 'Mesa de festa completa com bolo, doces e decoração de balões e flores',
    builder: 'kits',
    ctaLabel: 'Ver kits',
    active: true,
    order: 5,
  },
];
