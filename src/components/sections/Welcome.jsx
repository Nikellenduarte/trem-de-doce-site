import { useBusiness } from '../../hooks/useCatalog.js';
import ImageFrame from '../ui/ImageFrame.jsx';
import Ornament from '../ui/Ornament.jsx';

/**
 * Bloco de boas-vindas (antigo "Sobre nós"), dentro da seção de início:
 * manifesto + fundadora. Âncora #sobre usada pelo botão "Conhecer a confeitaria".
 */
export default function Welcome() {
  const b = useBusiness();
  const { welcome, owner } = b;
  return (
    <div className="welcome" id="sobre">
      <Ornament className="welcome__ornament" />
      <div className="story__grid">
        <div className="story__media reveal">
          <ImageFrame src={owner.photo} alt={`${owner.name}, ${owner.role.toLowerCase()}`} ratio="4 / 5" shape="arch" className="story__photo" />
          {owner.greeting && (
            <p className="welcome__greeting script" aria-hidden="true">
              {owner.greeting}
            </p>
          )}
        </div>
        <div className="story__body reveal">
          <p className="eyebrow">{welcome.eyebrow}</p>
          <h2 id="sobre-title" className="display story__title">
            {welcome.title}
          </h2>
          {welcome.paragraphs.map((p) => (
            <p key={p} className="story__text">
              {p}
            </p>
          ))}
          <p className="story__signature">
            <span className="story__signature-name">{owner.name}</span>
            <span>{owner.role}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
