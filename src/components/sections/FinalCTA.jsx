import { useBusiness } from '../../hooks/useCatalog.js';
import { buildContactUrl } from '../../services/whatsappService.js';
import Button from '../ui/Button.jsx';
import { IconWhatsApp } from '../ui/Icons.jsx';

/** Chamada final em marsala: duas ações, nada mais. */
export default function FinalCTA() {
  const b = useBusiness();
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="container container--narrow final-cta__inner reveal">
        <h2 id="cta-title" className="display final-cta__title">
          Vamos preparar algo <em>especial</em> para você?
        </h2>
        <p className="final-cta__text">Monte seu pedido em poucos toques e finalize com a gente pelo WhatsApp.</p>
        <div className="final-cta__actions">
          <Button size="lg" variant="on-primary" href="#montar">
            Montar meu pedido
          </Button>
          <Button size="lg" variant="on-primary-outline" href={buildContactUrl(b)} external icon={<IconWhatsApp className="btn__icon" />}>
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
