import { useBusiness } from '../../hooks/useCatalog.js';
import { buildContactUrl } from '../../services/whatsappService.js';
import { Wordmark } from '../ui/Monogram.jsx';
import { IconInstagram, IconWhatsApp } from '../ui/Icons.jsx';

const FOOTER_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#produtos', label: 'Nossos produtos' },
  { href: '#montar', label: 'Faça seu orçamento' },
  { href: '#contato', label: 'Contato' },
];

/** Rodapé minimalista. Só informações reais da confeitaria. */
export default function Footer() {
  const b = useBusiness();
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer__grid">
          <div>
            <a href="#inicio" aria-label={`${b.name}: início`}>
              <Wordmark stacked className="footer__wordmark" title={null} />
            </a>
            <p className="footer__tagline">{b.tagline}</p>
          </div>

          <nav aria-label="Rodapé">
            <h3 className="footer__heading">Navegue</h3>
            <ul className="footer__list">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="footer__heading">Fale conosco</h3>
            <ul className="footer__list">
              <li>
                <a href={b.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <IconInstagram /> {b.contact.instagramHandle}
                </a>
              </li>
              <li>
                <a href={buildContactUrl(b)} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp /> {b.contact.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Encomendas</h3>
            <address className="footer__address">
              {b.address.street}
              <br />
              {b.address.district}
              <br />
              {b.address.city}/{b.address.state} · CEP {b.address.zip}
              <br />
              Produção sob encomenda · atendimento em {b.address.city}
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {b.name}
          </span>
          <span>CNPJ {b.legal.cnpj}</span>
        </div>
      </div>
    </footer>
  );
}
