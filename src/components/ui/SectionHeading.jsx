import { cn } from '../../utils/cn.js';

/** Cabeçalho de seção: eyebrow + título serifado + texto de apoio. */
export default function SectionHeading({ id, eyebrow, title, lead, align = 'left', as: Tag = 'h2', className }) {
  return (
    <div className={cn('section-heading', align === 'center' && 'section-heading--center', 'reveal', className)}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag id={id} className="display">
        {title}
      </Tag>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
