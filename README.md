# Trem de Doce Confeitaria — site público (MVP · Fase 1)

Vitrine digital + montador de pedidos com envio automático para o WhatsApp.
Sem pagamento online. Sem painel administrativo (Fase 2).

## Visual boutique + estrutura original (19/09/2026) — LEIA PRIMEIRO

Em 19/09/2026 o site ganhou nova paleta e tipografia (visual "boutique"), mantendo a estrutura original de
página única. Estado atual:

- **Página única** (`pages/Home.jsx`), na ordem: Início (assinatura "TD | Trem de Doce" + tagline + foto em arco,
  com o bloco de boas-vindas `#sobre` dentro) → Como funciona → Nossos produtos (`#produtos`,
  um card por categoria, abre o montador já na categoria) → faixa marsala de depoimentos → Montador (`#montar`) →
  Reserva (`#reserva`) → Instagram → CTA final → Rodapé (`#contato`).
  Menu: Início · Nossos produtos · Faça seu orçamento · Contato. Links antigos `#/pedido…` caem em `#montar`/`#reserva`.
- **Paleta** (`styles/tokens.css`): marsala `#7A2638`, marsala escuro `#581C2B`, off-white `#FFF9F5`, rosa antigo
  `#E7C8C8`, nude `#E8D9CF`, marrom `#4A2929`, dourado suave `#B89A72` (só detalhes). Os nomes antigos
  (`--color-*`) são apelidos, então o montador e a reserva herdam a paleta.
- **Tipografia**: Cormorant Garamond (títulos, ênfase em itálico marsala) + Montserrat (texto/UI, botões em caixa
  alta). Sem fontes manuscritas.
- **Assinatura da marca** (`ui/BrandLockup.jsx`, estilos `.lockup` em `ui/ui.css`): TD | TREM DE DOCE alinhados pela
  base e CONFEITARIA centralizado sob o nome (pedido do cliente). É a MESMA no início (`Hero`) e na tela de
  abertura (`layout/PageLoader.jsx`); o tamanho vem da variável `--name-w`. `LogoSvg` aceita `part="name"|"sub"`
  para recortar o logotipo horizontal. A etiqueta "Oii, sou a Lohanny." voltou sobre a foto da proprietária.
- **Depoimentos** (`data/testimonials.js`): REAIS desde 20/09/2026 — dois prints de WhatsApp enviados pelo cliente
  (`public/images/feedback-*.webp`, recortados sem bordas pretas nem a interface do story, todos 739×1140). Cada item
  aceita `image` + `imageAlt`; a faixa marsala mostra o print como cartão (abre ampliado em nova aba) e, embaixo, a
  frase literal da conversa + primeiro nome. Item sem `image` vira cartão só de texto. Nunca inventar depoimento.
- **Fotos das categorias** (cards de "Nossos produtos"): enviadas pelo cliente em 20/09/2026 (originais em
  `briefing/fotos-drive/`). `python scripts/build_category_photos.py` gera os recortes 4:3 em
  `public/images/categoria-*.webp` e o `hero-brigadeiros.webp`. Petit Brownie segue com a foto do Menu 2026
  (a enviada tinha só 307×222 px). Para trocar uma foto: substituir o original e rodar o script.
- **Sem fundo de estrelas** (`stars.css`/`Sparkles.jsx` removidos); a estrela de quatro pontas do logo aparece só
  como ornamento discreto (`ui/Ornament.jsx`). Movimento: apenas fade + leve deslocamento (`.reveal`, `.fade-up`).
- `business.js` guarda também blocos de copy de uma versão editorial alternativa (hero, brandPhrase, story, why,
  moments, custom, feedbacks, finalCta…), **sem uso** hoje, para eventual reaproveitamento.
- **Material interno** (`briefing/` com o cardápio em PDF, o CSV da loja, o PDF do logo e as fotos originais, e
  `_backups/` com versões antigas) **não faz parte deste repositório** (ver `.gitignore`). O site compila sem ele:
  o catálogo já está em `src/data/generated/catalog.json` e as imagens em `public/images/`. Os scripts de
  `scripts/` que regeneram catálogo e recortes precisam desse material.
- `favicon.svg`, `og-image.png`, `apple-touch-icon.png` em marsala sobre off-white:
  `python scripts/build_brand_assets.py <pasta-temporária>` gera o favicon e os HTMLs; os PNGs saem de um
  screenshot headless do Edge desses HTMLs (1200×630 e 180×180).

## Stack

- **React 18 + Vite 6** — build estático, rápido, sem servidor.
- **CSS moderno** (variáveis, grid, `clamp`) — sem Tailwind, para um visual autoral e menos dependências.
- **Fontes auto-hospedadas** via Fontsource: Cormorant Garamond (títulos) + Montserrat Variable (texto e interface).
  Sem fontes manuscritas (redesign de 19/09/2026).
- Zero bibliotecas de UI. Bundle ≈ 63 kB gzip (React incluso).

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/` (estática). Pré-visualizar: `npm run preview`.

## Deploy (Cloudflare Pages)

Publicado em **https://trem-de-doce.pages.dev** (conta Cloudflare da MJDAU, projeto Pages `trem-de-doce`).

Para publicar uma nova versão:

```bash
npm run build && npx wrangler pages deploy dist --project-name trem-de-doce --branch main
```

Domínio próprio: no painel do Cloudflare, Workers & Pages → trem-de-doce → Custom domains.
Depois de definir o domínio, atualizar as URLs em `index.html` (canonical / Open Graph),
`public/robots.txt`, `public/sitemap.xml` e `src/data/business.js` (`seo.url`).

O site é 100% estático: não depende da máquina local para funcionar.

## Estrutura

```
trem-de-doce/
├── index.html                 # SEO, Open Graph, Twitter Card, JSON-LD
├── public/                    # favicon, og-image, robots, sitemap, _headers (cache)
└── src/
    ├── main.jsx               # bootstrap + fontes + CSS
    ├── App.jsx                # cria o provider do catálogo (estático hoje, API amanhã)
    ├── pages/Home.jsx         # composição da página única
    ├── data/                  # ⚠️ FONTE DOS DADOS (trocar por API na Fase 3)
    │   ├── business.js        # identidade, contato, endereço, textos, SEO
    │   ├── categories.js      # 5 categorias + tipo de configurador
    │   ├── kits.js            # kits Festa Completa (⚠️ preços/tamanho do bolo a definir)
    │   ├── testimonials.js    # depoimentos (⚠️ exemplos)
    │   ├── sizes.js           # tamanhos de bolo (2 linhas)
    │   ├── doughs.js          # massas
    │   ├── flavors.js         # sabores (CSV + menu2026.js)
    │   ├── menu2026.js        # transcrição do Menu 2026 (PDF)
    │   ├── products.js        # mimos (CSV + menu2026.js)
    │   ├── pricing.js         # preços (CSV + overrides do menu)
    │   └── rules.js           # regras comerciais (mínimos, caixas)
    ├── services/
    │   ├── catalogService.js  # contrato de acesso ao catálogo
    │   ├── pricingService.js  # como um preço é encontrado / totais
    │   └── whatsappService.js # mensagem + link wa.me
    ├── utils/                 # validation (regras puras), order, format, cn
    ├── hooks/                 # useCatalog, useReveal, useScrollLock
    ├── styles/                # tokens.css (paleta/tipografia), base.css
    └── components/
        ├── ui/                # Button, OptionCard, StepIndicator, QuantityStepper, Notice, Price, ImageFrame, Monogram…
        ├── layout/            # Header, Footer, WhatsAppFloat
        ├── sections/          # Hero (+Welcome), Testimonials, Delights, HowItWorks, OrderBuilder, Instagram, FinalCTA
        └── configurator/      # ProductConfigurator, CakeConfigurator, BoxConfigurator, MimosCatalog, KitsCatalog, FlavorAllocator, OrderSummary, OrderReview
```

## Festa Completa (kits)

Categoria `kits` (builder `kits`, `KitsCatalog`). Dados em `src/data/kits.js` — composição informada pelo cliente
(50 pessoas: bolo + 300 brigadeiros · 100 pessoas: bolo + 500 brigadeiros · 200 pessoas: bolo + 1000 doces).
⚠️ Faltam: **preço** de cada kit, **tamanho do bolo** incluído e linha/sabores dos doces. Enquanto `price` for
null, o site mostra "valor a confirmar". Sabores são combinados pelo WhatsApp (campo Observações da reserva).

## Contato

WhatsApp: número `5534984191050` (usado no **envio do pedido**, pois `wa.me/<número>?text=` aceita mensagem
pré-preenchida) e link curto oficial `https://wa.me/message/S6ZZMEGYBYTOB1` (botões de contato sem texto).
Instagram: `https://www.instagram.com/tremdedoceudi/`. Menu: "Faça seu orçamento" leva ao montador (`#montar`).

## Início + Boas-vindas e Depoimentos

- **Início e "Sobre nós" unidos** (15/09/2026): a seção `#inicio` (Hero) contém o bloco `Welcome` (âncora `#sobre`,
  usada pelo botão "Conhecer a confeitaria"). Copy em `business.welcome` (eyebrow, título, parágrafos). A copy
  antiga do "Sobre nós" segue guardada em `business.about`. O item "Sobre nós" saiu do menu.
- **Depoimentos** (`Testimonials`): faixa vinho entre a apresentação e as categorias. Título e subtítulo da faixa
  ficam em `business.testimonialsIntro` (copy do cliente, 19/09/2026). Dados em
  `src/data/testimonials.js` — ⚠️ hoje são 3 EXEMPLOS marcados `placeholder: true` (aparece a tag "exemplo").
  Substituir pelos reais e desligar o placeholder. Sem itens ativos a faixa não é renderizada.

## Logo oficial e tela de abertura

- **Logo oficial** (16/09/2026): `briefing/logo-trem-de-doce.pdf` ("D (Logotipo animado).pdf", 12 páginas: logotipo
  horizontal/empilhado, monograma TD, estrela, padrões). Vetores extraídos com pymupdf + svgelements para
  `src/components/ui/logo-paths.json` (monogram, wordmark, wordmarkStacked, star). Componente `ui/Logo.jsx`
  (`Monogram`, `Wordmark`, `LogoSvg`); `ui/Monogram.jsx` só reexporta. Bordô vira `currentColor`.
  Fontes do logo (Hello Paris Serif + Bebas Neue) estão embutidas no PDF como subconjuntos — não são usadas como
  webfont; os títulos do site seguem em Cormorant Garamond.
- Header: monograma + logotipo. Hero: o `h1` é o logotipo oficial (texto acessível oculto). Rodapé: logotipo empilhado em creme.
- `favicon.svg`, `og-image.png` e `apple-touch-icon.png` são gerados por `scripts/build_brand_assets.py` a partir do logo oficial.
- **Tela de abertura** (`layout/PageLoader.jsx`, espelhada no protótipo): cortina creme com o monograma (estrela
  pulsando) e o logotipo; some ~0,8 s após o `load` (máx. 1,6 s), sem animação em `prefers-reduced-motion`.

## (Histórico, removido no redesign) Fundo de estrelas

`src/styles/stars.css` (gerado por script) aplica um tile SVG de 480px com as estrelas de quatro pontas da
identidade: pêssego sobre o creme (fixo atrás de todo o conteúdo) e creme sobre o bordô (CTA final e rodapé).
`components/ui/Sparkles.jsx` adiciona estrelas maiores com brilho suave no hero e no CTA (sem animação em
`prefers-reduced-motion`). Intensidade: `opacity` de `body::before` (0.55) e de `.section--primary::before` (0.16).

## Catálogo oficial (CSV)

Fonte: `briefing/produtos-trem-de-doce.csv` (export da loja, separador `;`, UTF-8 com BOM).
Para atualizar preços/sabores: substitua o CSV e rode

```bash
npm run import:csv
```

O script `scripts/import-csv.mjs` gera `src/data/generated/catalog.json` e imprime inconsistências.
Os arquivos `src/data/{flavors,pricing,products,sizes,rules}.js` leem esse JSON.

Mapeamento aplicado:

| CSV | Site |
| --- | --- |
| 2 produtos de bolo (massa baunilha / chocolate) × Tamanho × Sabor | sabores por massa; tier Clássico/Premium **derivado do preço** (dentro de um tamanho, patamar baixo = Clássico, alto = Premium; Bentô tem preço único) |
| Peso (kg) por tamanho | "aprox. X kg" no cartão do tamanho |
| Brigadeiros: Linha × Quantidade (50/100) | preço da caixa fechada |
| Petit Brownie: Linha × Quantidade (50/100) | **caixa fechada** (o briefing dizia "mínimo 50 livre"; seguimos o CSV) |
| Mimos: preço + descrição | preço unitário, mínimo lido da descrição, "a partir de" quando indicado |

Observações do CSV (não corrigidas, apenas mapeadas):

- "Dois Amores" e "Ninho com Nutella" existem nas **duas massas** (o briefing dizia que cada sabor tem uma massa só).
- O CSV **não lista os sabores** de brigadeiros e brownies ("campo personalizado"); vieram do Menu 2026 (ver abaixo).
- Brigadeiros: "mínimo de 20 a 25 por sabor" continua ambíguo (usamos 25).
- Brownie Sem Recheio 100 un. custa R$ 190 (não 2 × R$ 100): o preço é por caixa.
- Mimos: "Brownie com Laço e Tag" (CSV) substitui "Brownie com Laço" (briefing); mínimos 25 (bem casado, brownies) e 12 (caixa, mini bolo, cupcakes); Caixa de Brigadeiros e Cupcakes são "valor a partir de".
- Long Cake (R$ 550) custa mais que Bolo G1 (R$ 500), mesmo peso (5,5 kg); ordem mantida como no briefing.

## Menu 2026 (PDF)

Fonte: `briefing/Menu Trem de Doce 2026 Oficial.pdf` (9 páginas). Transcrito manualmente em `src/data/menu2026.js`:

- **Tamanhos (p.3):** fatias, medidas e formato de cada bolo. O PDF imprime "Bolo G1" duas vezes; a linha de
  100 fatias / 30×40 cm / 12 kg foi mapeada como **G2**.
- **Sabores de bolo (p.4–5):** descrição de cada sabor por massa + selo "O mais vendido em casamentos".
- **Brigadeiros (p.6):** 14 sabores clássicos e 5 especiais. **Petit Brownie (p.7):** 5 especiais, 8 clássicos e
  Sem Recheio. Fim dos placeholders.
- **Avisos comerciais:** apliques/topos orçados à parte; unidades de 15–16 g; personalização com carimbo/ejetor
  sob consulta; 4 a 8 doces por convidado; mínimos dos mimos (25 un. 5×5 cm / 12 un.).
- **Mimos (p.8–9):** Bem Casado e Mini Bolo também são "a partir de" (o CSV só marcava Caixa e Cupcakes).

Divergências PDF × CSV (adotado o PDF, registrado em `priceOverrides`):

| Item | CSV | Menu 2026 |
| --- | --- | --- |
| Bolo G · Premium | R$ 360,00 | **R$ 340,00** |

O índice do PDF cita "Como pedir" (p.9) e "Kits prontos para celebrar" (p.10), mas essas páginas não estão no
arquivo recebido. Fotos: extraídas do PDF com `pymupdf` (a da Lohanny usa a máscara de transparência/smask) e otimizadas em WebP
em `public/images/` — hero, Lohanny, categorias (exceto bolo, sem foto no PDF), mimos e mosaico do Instagram.
Crédito de fotografia: Alexander Prates (marca d'água). A foto dos cupcakes parece de banco de imagens — confirmar.

## Pedido com vários itens + reserva

Fluxo (inspirado no protótipo anterior, `confeitariacoisadedoceprototipo.netlify.app`):

1. Configura um item → **Confira este item** → "Adicionar e escolher mais" ou "Adicionar e finalizar reserva".
2. Seção **Finalize sua reserva** (`#reserva`): itens do pedido (remover, totais) + **dados do evento**
   (nome, data do evento com data mínima, tipo de evento — lista em `rules.booking.eventTypes` — e observações
   opcionais). Telefone e endereço foram removidos a pedido do cliente (16/09/2026).
   Trocar de aba do montador com um item em revisão **adiciona o item ao pedido** automaticamente (faixa de
   aviso acima das abas); cada configurador mantém a escolha ao alternar entre categorias.
3. "Enviar reserva pelo WhatsApp" monta UMA mensagem com tudo (`buildReservationMessage`).
4. O pedido fica salvo no `localStorage` (`trem-de-doce:pedido:v1`) até ser enviado/limpo.

Componentes: `components/checkout/*` (Checkout, BookingForm, CartSummary), `layout/CartBar` (barra fixa no
mobile), pílula "Meu pedido" no Header. Estado em `hooks/useCart.jsx`. Regras em `data/rules.js → booking`
(antecedência mínima, tipos de evento) e `volumeDiscounts` (estrutura pronta, sem regra ativa).

## O que ainda precisa ser preenchido

| Onde | O quê |
| --- | --- |
| `src/data/rules.js` | Confirmar mínimo por sabor dos brigadeiros (menu diz 20/25; está 25). Confirmar preço do Bolo G Premium (CSV 360 × menu 340; está 340). Confirmar antecedência mínima da reserva (`booking.minLeadDays`, hoje 0) e a lista de tipos de evento. Descontos por volume só com regra confirmada. |
| `src/data/sizes.js` | Rendimento em fatias de cada tamanho, se desejado (hoje mostramos o peso do CSV). |
| `src/data/business.js` | Domínio definitivo. |
| `src/data/testimonials.js` | Depoimentos reais (nome, ocasião, texto) no lugar dos 3 exemplos. |
| `src/data/kits.js` | Preço, tamanho do bolo e doces de cada kit Festa Completa. |
| `public/images/` | Falta apenas uma foto de **bolo inteiro** para a categoria Bolo de Festa (`categories.js`). |

Catálogo completo: não há mais placeholders. Se algum voltar (`placeholder: true`), o site avisa na categoria.

## Evolução prevista

- **Fase 2 – Painel**: rota `/admin` que edita as mesmas entidades de `src/data`.
- **Fase 3 – Banco**: implementar `createApiCatalog()` com o contrato de `catalogService.js` e trocar em `App.jsx`.
- **Fase 4 – Multi-tenant**: `business` + catálogo carregados por tenant; tokens de cor vindos de `business.theme`.
