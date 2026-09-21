import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn.js';
import { useBusiness } from '../../hooks/useCatalog.js';
import { useScrollLock } from '../../hooks/useScrollLock.js';
import { useCart } from '../../hooks/useCart.jsx';
import { buildContactUrl } from '../../services/whatsappService.js';
import Button from '../ui/Button.jsx';
import Monogram, { Wordmark } from '../ui/Monogram.jsx';
import { IconClose, IconInstagram, IconMenu, IconWhatsApp } from '../ui/Icons.jsx';

/** Menu principal (âncoras da página única). */
export const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#produtos', label: 'Nossos produtos' },
  { href: '#montar', label: 'Faça seu orçamento' },
  { href: '#contato', label: 'Contato' },
];

export default function Header() {
  const business = useBusiness();
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);
  const cartLabel = `Ver pedido com ${cart.count} ${cart.count === 1 ? 'item' : 'itens'}`;

  return (
    <>
      <header className={cn('header', scrolled && 'header--scrolled')}>
        <div className="container header__inner">
          <a href="#inicio" className="brand" aria-label={`${business.name}: início`} onClick={close}>
            <Monogram />
            <Wordmark className="brand__wordmark" title={null} />
          </a>

          <nav className="nav" aria-label="Principal">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            {cart.count > 0 && (
              <a href="#reserva" className="cart-pill" aria-label={cartLabel} onClick={close}>
                <span className="cart-pill__label">Meu pedido</span>
                <span className="cart-pill__count">{cart.count}</span>
              </a>
            )}
            <Button className="header__cta" size="sm" href="#montar">
              Fazer pedido
            </Button>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      <div id="menu-mobile" className={cn('mobile-menu', open && 'mobile-menu--open')} aria-hidden={!open}>
        <nav aria-label="Menu">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="mobile-menu__link" onClick={close} tabIndex={open ? 0 : -1}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <Button block size="lg" href="#montar" onClick={close} tabIndex={open ? 0 : -1}>
            Fazer pedido
          </Button>
          <div className="mobile-menu__social">
            <a href={buildContactUrl(business)} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
              <IconWhatsApp /> WhatsApp
            </a>
            <a href={business.contact.instagramUrl} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
              <IconInstagram /> Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
