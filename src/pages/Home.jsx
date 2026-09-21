import { useCallback, useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import { scrollToId } from '../utils/scroll.js';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import WhatsAppFloat from '../components/layout/WhatsAppFloat.jsx';
import CartBar from '../components/layout/CartBar.jsx';
import PageLoader from '../components/layout/PageLoader.jsx';
import Hero from '../components/sections/Hero.jsx';
import Testimonials from '../components/sections/Testimonials.jsx';
import Delights from '../components/sections/Delights.jsx';
import HowItWorks from '../components/sections/HowItWorks.jsx';
import OrderBuilder from '../components/sections/OrderBuilder.jsx';
import Checkout from '../components/checkout/Checkout.jsx';
import InstagramSection from '../components/sections/InstagramSection.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';

const DEFAULT_CATEGORY = 'cake';

// setTimeout (e não rAF): o rAF pausa com a aba em segundo plano e a rolagem se perderia.
const later = (fn) => window.setTimeout(fn, 60);

/** Página única: apresentação → como funciona → produtos → depoimentos → montador → reserva. */
export default function Home() {
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [builderKey, setBuilderKey] = useState(0);
  useReveal();

  // Página aberta já com âncora (link compartilhado): rola depois que tudo montou.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && !id.startsWith('/')) later(() => scrollToId(id, { instant: true }));
  }, []);

  /** Abre o montador na categoria pedida (ou mantém a atual) e rola até ele. */
  const openBuilder = useCallback((categoryId) => {
    if (categoryId) {
      setCategory(categoryId);
      setBuilderKey((k) => k + 1); // reinicia a configuração ao trocar pela vitrine
    }
    later(() => scrollToId('montar'));
  }, []);

  const openCheckout = useCallback(() => scrollToId('reserva'), []);

  /** Após adicionar um item: ou vai para a reserva, ou volta ao montador. */
  const handleAdded = useCallback((mode) => later(() => scrollToId(mode === 'checkout' ? 'reserva' : 'montar')), []);

  return (
    <>
      <PageLoader />
      <a href="#conteudo" className="visually-hidden">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <HowItWorks />
        <Delights onSelectCategory={openBuilder} />
        <Testimonials />
        <OrderBuilder key={builderKey} category={category} onCategoryChange={setCategory} onAdded={handleAdded} />
        <Checkout onAddMore={() => openBuilder()} />
        <InstagramSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat hideWhenVisible={['#reserva', '.final-cta', '.footer']} />
      <CartBar onGo={openCheckout} />
    </>
  );
}
