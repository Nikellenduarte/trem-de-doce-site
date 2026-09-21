import { useBusiness } from '../../hooks/useCatalog.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';
import { IconInstagram } from '../ui/Icons.jsx';

/** Instagram: pequena galeria com fotos reais da marca e link para o perfil oficial. */
export default function InstagramSection() {
  const b = useBusiness();
  const { media, contact } = b;
  return (
    <section className="section section--surface insta" aria-labelledby="instagram-title">
      <div className="container">
        <SectionHeading
          id="instagram-title"
          align="center"
          eyebrow="Instagram"
          title={
            <>
              Momentos doces também estão no nosso <em>Instagram</em>
            </>
          }
          lead={`Novidades, bastidores e encomendas recentes em ${contact.instagramHandle}.`}
        />
        <ul className="insta__grid">
          {media.instagram.map((photo) => (
            <li key={photo.src} className="insta__item reveal">
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`${photo.alt} — abrir o Instagram da ${b.shortName}`}>
                <img src={photo.src} alt="" loading="lazy" decoding="async" />
              </a>
            </li>
          ))}
        </ul>
        <div className="insta__cta">
          <Button variant="secondary" href={contact.instagramUrl} external icon={<IconInstagram className="btn__icon" />}>
            Seguir {contact.instagramHandle}
          </Button>
        </div>
      </div>
    </section>
  );
}
