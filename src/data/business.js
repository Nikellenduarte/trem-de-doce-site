/**
 * BUSINESS SETTINGS
 * ------------------------------------------------------------
 * Tudo o que identifica a confeitaria vive aqui. No futuro este
 * objeto será carregado por tenant (Fase 4) a partir da API.
 */
export const business = {
  id: 'trem-de-doce',
  name: 'Trem de Doce Confeitaria',
  shortName: 'Trem de Doce',
  monogram: 'TD',
  tagline: 'Doces que acompanham histórias.',
  // Não exibido no início desde 19/09/2026 (pedido do cliente). Mantido para uso futuro.
  heroText:
    'Bolos e doces artesanais feitos sob encomenda para tornar suas celebrações ainda mais especiais.',
  owner: {
    name: 'Lohanny Borges',
    role: 'Fundadora da Trem de Doce Confeitaria',
    greeting: 'Oii, sou a Lohanny.', // Menu 2026, p.2
    photo: '/images/lohanny-atelie.webp', // enviada pelo cliente em 19/09/2026 (a anterior, do Menu 2026, segue em /images/lohanny.webp)
  },
  /** Fotos reais extraídas do Menu 2026 (scripts/extract_menu_photos.py). Fotografia: Alexander Prates. */
  media: {
    hero: { src: '/images/hero-brigadeiros.webp', alt: 'Mesa de doces da Trem de Doce com brigadeiros em suportes dourados' },
    gallery: [
      { src: '/images/galeria-1.webp', alt: 'Mesa de festa com brigadeiros em suportes dourados', shape: 'tall' },
      { src: '/images/galeria-2.webp', alt: 'Brigadeiros servidos sobre mesa de madeira', shape: 'wide' },
      { src: '/images/galeria-5.webp', alt: 'Caixinhas de brigadeiros decoradas com flores', shape: 'tall' },
      { src: '/images/galeria-3.webp', alt: 'Petit brownies decorados com corações', shape: 'wide' },
      { src: '/images/galeria-4.webp', alt: 'Brownies embalados com laço rosa e tag', shape: 'tall' },
    ],
    instagram: [
      { src: '/images/insta-1.webp', alt: 'Brigadeiros vermelhos decorados' },
      { src: '/images/insta-2.webp', alt: 'Mesa de brigadeiros em suportes dourados' },
      { src: '/images/insta-3.webp', alt: 'Petit brownies com cobertura de creme' },
      { src: '/images/insta-4.webp', alt: 'Bem casado artesanal' },
      { src: '/images/insta-5.webp', alt: 'Caixinhas de brigadeiros com estrelas douradas' },
      { src: '/images/insta-6.webp', alt: 'Bem casados embalados com fita' },
    ],
  },
  legal: {
    legalName: '32.945.997 LOHANNY CRISTINA BORGES ROSENDO OLIVEIRA (MEI)',
    cnpj: '32.945.997/0001-49',
  },
  address: {
    street: 'Rua Alvares de Azevedo, 786, Casa',
    district: 'Bairro Lagoinha',
    city: 'Uberlândia',
    state: 'MG',
    zip: '38408-516',
  },
  contact: {
    whatsappDisplay: '(34) 98419-1050',
    whatsappNumber: '5534984191050', // formato internacional, somente dígitos (usado no envio do pedido com texto)
    whatsappLink: 'https://wa.me/message/S6ZZMEGYBYTOB1', // link curto oficial (contato sem texto pré-preenchido)
    instagramHandle: '@tremdedoceudi',
    instagramUrl: 'https://www.instagram.com/tremdedoceudi/',
  },
  /* ------------------------------------------------------------
   * COPY DO REDESIGN (briefing do cliente, 19/09/2026)
   * ------------------------------------------------------------ */
  hero: {
    eyebrow: 'Trem de Doce',
    title: 'Doces que transformam momentos em memórias.',
    em: 'memórias.',
    text: 'Confeitaria artesanal feita com carinho para tornar cada celebração ainda mais especial.',
  },
  brandPhrase: 'Porque os melhores momentos também têm sabor.',
  menuIntro: {
    eyebrow: 'Cardápio',
    title: 'Um pedacinho de felicidade',
    em: 'felicidade',
    text: 'Escolha seu doce favorito e deixe a gente cuidar dos detalhes.',
  },
  featuredIntro: {
    eyebrow: 'Em destaque',
    title: 'O queridinho da Trem de Doce',
    em: 'queridinho',
  },
  /**
   * Nossa História: o TEXTO é a história oficial da marca (Menu 2026, p.2),
   * preservada. Título do briefing; a citação é o título do manifesto
   * escrito pelo cliente em 15/09/2026.
   */
  story: {
    eyebrow: 'Nossa história',
    title: 'Feito à mão. Feito com carinho.',
    em: 'Feito com carinho.',
    paragraphs: [
      'A Trem de Doce Confeitaria nasceu do cuidado com os detalhes e do prazer de preparar algo especial para alguém.',
      'Acreditamos que doces acompanham momentos importantes e tornam encontros ainda mais afetivos.',
      'Tudo aqui é feito com calma, respeito e atenção, para que cada escolha do nosso cardápio faça sentido para a sua comemoração.',
    ],
    quote: 'Tudo o que importa cabe ao redor de uma mesa.',
  },
  why: {
    eyebrow: 'Nosso jeito',
    title: 'Por que escolher a Trem de Doce',
    em: 'Trem de Doce',
    items: [
      { title: 'Feito artesanalmente', text: 'Cada detalhe preparado com cuidado.' },
      { title: 'Ingredientes selecionados', text: 'Qualidade em cada receita.' },
      { title: 'Personalização', text: 'Doces pensados para cada momento.' },
      { title: 'Carinho em cada detalhe', text: 'Porque cada celebração merece atenção especial.' },
    ],
  },
  moments: {
    eyebrow: 'Momentos especiais',
    title: 'Para celebrar o que importa',
    em: 'o que importa',
    text: 'Aniversários, encontros, presentes ou simplesmente aquele dia que merece um motivo para ser comemorado.',
  },
  custom: {
    eyebrow: 'Personalização',
    title: 'Seu momento. Seu doce. Seu jeito.',
    em: 'Seu jeito.',
    paragraphs: [
      'Tem uma ideia especial em mente?',
      'Criamos doces personalizados para combinar com sua celebração, sua personalidade e cada detalhe da ocasião.',
    ],
    cta: 'Fale com a gente',
  },
  feedbacks: {
    eyebrow: 'Feedbacks',
    title: 'Quem prova, se apaixona',
    em: 'se apaixona',
    subtitle: 'Cada pedido é preparado com carinho — e quem experimenta conta pra gente.',
    /** Exibido enquanto não houver depoimentos REAIS cadastrados (nunca inventamos). */
    empty: {
      text: 'Já provou um doce da Trem de Doce? Conte pra gente como foi. Seu depoimento pode aparecer aqui.',
      cta: 'Enviar meu depoimento',
    },
    maxOnHome: 4,
  },
  instagramIntro: {
    eyebrow: 'Instagram',
    title: 'Momentos doces também estão no nosso Instagram',
    em: 'Instagram',
  },
  finalCta: {
    title: 'Vamos deixar seu momento ainda mais doce?',
    em: 'ainda mais doce?',
    text: 'Conte para a gente o que você está imaginando.',
  },
  footerTagline: 'Doces feitos para momentos especiais.',

  /* ---- Copy de versões anteriores, mantida para consulta ---- */
  welcome: {
    eyebrow: 'Bem-vindo(a)',
    title: 'Tudo o que importa cabe ao redor de uma mesa.', // voltou em 21/09/2026 (entre 19 e 21/09 foi "Colocando doces na mesa")
    paragraphs: [
      'Nós acreditamos que celebrar é reunir pessoas especiais ao redor de uma mesa — a família, os amigos e as tradições que atravessam gerações.',
      'Cada produto da Trem de Doce nasce para fazer parte desses momentos, das comemorações mais intimistas às mais grandiosas.',
      'Porque um bolo nunca é só um bolo: é o que fica guardado na memória depois que a festa acaba.',
    ],
  },
  testimonialsIntro: {
    title: 'A Tranquilidade e segurança que você procura para seu evento!',
    lead: 'Veja o que nossos clientes dizem:',
  },
  /** História oficial (Menu 2026, p.2). A seção Nossa História usa story.paragraphs, que é este mesmo texto. */
  about: {
    paragraphs: [
      'A Trem de Doce Confeitaria nasceu do cuidado com os detalhes e do prazer de preparar algo especial para alguém.',
      'Acreditamos que doces acompanham momentos importantes e tornam encontros ainda mais afetivos.',
      'Tudo aqui é feito com calma, respeito e atenção, para que cada escolha do nosso cardápio faça sentido para a sua comemoração.',
    ],
  },
  delivery: {
    items: [
      { title: 'Feito sob encomenda', text: 'Cada pedido é preparado especialmente para a sua data.' },
      { title: 'Entrega por parceiros', text: 'A entrega é realizada por parceiros de confiança.' },
      { title: 'Bolos viajam de carro', text: 'Para chegar perfeito, o bolo precisa ser transportado de carro.' },
      { title: 'Atendimento em Uberlândia', text: 'Atendemos Uberlândia/MG.' },
    ],
  },
  occasions: ['aniversários', 'casamentos', '15 anos', 'comemorações', 'eventos corporativos', 'presentes'],
  seo: {
    title: 'Trem de Doce Confeitaria | Bolos e Doces Artesanais em Uberlândia',
    description:
      'Bolos e doces artesanais sob encomenda em Uberlândia. Conheça a Trem de Doce Confeitaria e monte seu pedido de forma fácil pelo nosso site.',
    url: 'https://tremdedoce.com.br/', // TODO: domínio definitivo
  },
};
