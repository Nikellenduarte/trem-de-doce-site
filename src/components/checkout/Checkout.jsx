import { useMemo, useState } from 'react';
import { useCart } from '../../hooks/useCart.jsx';
import { useBusiness, useCatalog } from '../../hooks/useCatalog.js';
import { buildReservationMessage, buildWhatsAppUrl } from '../../services/whatsappService.js';
import { validateBooking } from '../../utils/validation.js';
import { plural } from '../../utils/format.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';
import Monogram from '../ui/Monogram.jsx';
import Notice from '../ui/Notice.jsx';
import BookingForm from './BookingForm.jsx';
import CartSummary from './CartSummary.jsx';
import { IconArrowRight, IconPlus, IconWhatsApp } from '../ui/Icons.jsx';

/**
 * Seção "Finalize sua reserva": itens do pedido + dados do evento +
 * envio de tudo numa única mensagem de WhatsApp.
 */
export default function Checkout({ onAddMore }) {
  const cart = useCart();
  const business = useBusiness();
  const catalog = useCatalog();
  const rules = catalog.getRules().booking;
  const [touched, setTouched] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [sent, setSent] = useState(false);

  const validation = useMemo(() => validateBooking(cart.booking, rules), [cart.booking, rules]);
  const canSend = cart.count > 0 && validation.valid;

  const message = useMemo(
    () => (cart.count > 0 ? buildReservationMessage({ items: cart.items, booking: cart.booking, totals: cart.totals }, business) : ''),
    [cart.items, cart.booking, cart.totals, business],
  );
  const url = buildWhatsAppUrl(business.contact.whatsappNumber, message);

  const handleSend = (e) => {
    if (!canSend) {
      e.preventDefault();
      setShowAll(true);
      const first = document.querySelector('.input--invalid, .field__error');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSent(true);
  };

  const startNew = () => {
    cart.resetAll();
    setSent(false);
    setShowAll(false);
    setTouched({});
    onAddMore?.();
  };

  const categoryName = (id) => catalog.getCategory(id)?.name;

  return (
    <section className="section section--surface checkout" id="reserva" aria-labelledby="reserva-title">
      <div className="container">
        <SectionHeading
          id="reserva-title"
          align="center"
          eyebrow="Seu pedido"
          title={
            <>
              Finalize sua <em>reserva</em>
            </>
          }
          lead="Confira os itens, conte a data e o tipo do evento e envie tudo de uma vez pelo WhatsApp. A gente confirma a disponibilidade e os próximos passos."
        />

        {sent ? (
          <div className="sent reveal is-visible">
            <Monogram />
            <h3 className="sent__title">Pedido enviado!</h3>
            <p className="lead" style={{ textAlign: 'center' }}>
              Continue a conversa no WhatsApp. Se a janela não abriu, toque no botão abaixo.
            </p>
            <div className="sent__actions">
              <Button variant="whatsapp" href={url} external icon={<IconWhatsApp className="btn__icon" />}>
                Abrir o WhatsApp novamente
              </Button>
              <Button variant="secondary" onClick={startNew}>
                Fazer um novo pedido
              </Button>
            </div>
          </div>
        ) : cart.count === 0 ? (
          <div className="cart-empty reveal is-visible">
            <Monogram />
            <p className="lead" style={{ textAlign: 'center' }}>
              Seu pedido ainda está vazio. Escolha um item no montador acima para começar.
            </p>
            <Button onClick={onAddMore} iconRight={<IconArrowRight className="btn__icon" />}>
              Montar meu pedido
            </Button>
          </div>
        ) : (
          <div className="checkout__grid">
            <div className="checkout__panel">
              <h3 className="checkout__panel-title">
                Dados do evento <small>Etapa final</small>
              </h3>
              <BookingForm
                booking={cart.booking}
                onChange={cart.setBooking}
                rules={rules}
                errors={validation.errors}
                touched={touched}
                showAll={showAll}
                onBlur={(f) => setTouched((t) => ({ ...t, [f]: true }))}
              />
            </div>

            <div className="checkout__panel checkout__panel--sticky">
              <h3 className="checkout__panel-title">
                Itens do pedido{' '}
                <small>
                  {cart.count} {plural(cart.count, 'item', 'itens')}
                </small>
              </h3>
              <CartSummary items={cart.items} totals={cart.totals} highlightId={cart.lastAddedId} onRemove={cart.removeItem} categoryName={categoryName} />

              {!cart.totals.known && <Notice tone="info">Os valores marcados como "a confirmar" serão informados pela confeitaria no WhatsApp.</Notice>}
              {showAll && !validation.valid && <Notice tone="error">Complete os dados do evento para enviar a reserva.</Notice>}

              <div className="checkout__actions">
                <Button variant="whatsapp" size="lg" block href={url} external onClick={handleSend} aria-disabled={!canSend} icon={<IconWhatsApp className="btn__icon" />}>
                  Enviar reserva pelo WhatsApp
                </Button>
                <Button variant="secondary" block onClick={onAddMore} icon={<IconPlus className="btn__icon" />}>
                  Adicionar mais um item
                </Button>
              </div>
              <p className="checkout__legal">
                Nenhum pagamento é feito pelo site. A reserva só é confirmada após o contato da {business.shortName} pelo WhatsApp.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
