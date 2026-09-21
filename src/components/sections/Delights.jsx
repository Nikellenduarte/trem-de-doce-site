import { useCatalog } from '../../hooks/useCatalog.js';
import Button from '../ui/Button.jsx';
import ImageFrame from '../ui/ImageFrame.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { IconArrowRight } from '../ui/Icons.jsx';

function ProductCategoryCard({ category, index, onSelect }) {
  return (
    <article className="category-card reveal" style={{ '--reveal-delay': `${index * 80}ms` }}>
      <ImageFrame src={category.image} alt={category.imageAlt} ratio="4 / 3" shape="rounded" label="Foto em breve" />
      <div className="category-card__body">
        <span className="category-card__index">n.º {String(index + 1).padStart(2, '0')}</span>
        <h3 className="category-card__title">{category.name}</h3>
        <p className="category-card__desc">{category.description}</p>
        <div className="category-card__action">
          <Button variant="secondary" size="sm" onClick={() => onSelect(category.id)} iconRight={<IconArrowRight className="btn__icon" />}>
            {category.ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function Delights({ onSelectCategory }) {
  const catalog = useCatalog();
  const categories = catalog.getCategories();
  return (
    <section className="section" id="produtos" aria-labelledby="produtos-title">
      <div className="container">
        <SectionHeading
          id="produtos-title"
          align="center"
          eyebrow="Nossos produtos"
          title={
            <>
              Escolha cada detalhe da <em>sua encomenda</em>
            </>
          }
          lead="Bolos, doces, mimos e kits completos, tudo preparado sob encomenda para a sua celebração."
        />
        <div className="categories">
          {categories.map((c, i) => (
            <ProductCategoryCard key={c.id} category={c} index={i} onSelect={onSelectCategory} />
          ))}
        </div>
      </div>
    </section>
  );
}
