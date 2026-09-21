import { useBusiness } from '../../hooks/useCatalog.js';
import Button from '../ui/Button.jsx';
import ImageFrame from '../ui/ImageFrame.jsx';
import BrandLockup from '../ui/BrandLockup.jsx';
import { Star } from '../ui/Ornament.jsx';
import Welcome from './Welcome.jsx';

/** Primeira dobra: assinatura da marca à esquerda, fotografia em arco à direita, boas-vindas logo abaixo. */
export default function Hero() {
  const b = useBusiness();
  const { media } = b;
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          {/* Assinatura da marca (mesma da tela de abertura); o nome acessível vem do texto oculto. */}
          <h1 id="hero-title" className="hero__title fade-up">
            <BrandLockup />
            <span className="visually-hidden">{b.name}</span>
          </h1>
          <p className="script hero__tagline fade-up" style={{ animationDelay: '120ms' }}>
            {b.tagline}
          </p>
          <div className="hero__actions fade-up" style={{ animationDelay: '220ms' }}>
            <Button size="lg" href="#montar">
              Montar meu pedido
            </Button>
            <Button size="lg" href="#sobre">
              Conhecer a confeitaria
            </Button>
          </div>
          <p className="hero__meta fade-up" style={{ animationDelay: '320ms' }}>
            <span>Artesanal</span>
            <span>Sob encomenda</span>
            <span>
              {b.address.city}/{b.address.state}
            </span>
          </p>
        </div>

        <div className="hero__visual fade-up" style={{ animationDelay: '150ms' }}>
          <span className="hero__outline" aria-hidden="true" />
          <ImageFrame src={media?.hero?.src} alt={media?.hero?.alt ?? ''} ratio="4 / 5" shape="arch" priority label="" />
          <Star className="hero__star" />
        </div>
      </div>
      <div className="container">
        <Welcome />
      </div>
    </section>
  );
}
