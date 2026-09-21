import { useCatalog } from '../../hooks/useCatalog.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import Notice from '../ui/Notice.jsx';
import ProductConfigurator from '../configurator/ProductConfigurator.jsx';

/** Seção "Monte seu pedido". */
export default function OrderBuilder({ category, onCategoryChange, onAdded }) {
  const catalog = useCatalog();
  const placeholderCats = catalog.getPlaceholderCategories();
  const placeholders = placeholderCats.length > 0;
  const placeholderNames = placeholderCats.map((c) => c.name).join(' e ');
  return (
    <section className="section" id="montar" aria-labelledby="montar-title">
      <div className="container">
        <SectionHeading
          id="montar-title"
          align="center"
          eyebrow="Monte seu pedido"
          title={
            <>
              Escolha cada detalhe. <em>A gente cuida do resto.</em>
            </>
          }
          lead="Adicione os itens que deseja, acompanhe o valor estimado e envie seu orçamento pelo WhatsApp."
        />
        {placeholders && (
          <Notice tone="info" className="reveal" style={{ marginBottom: '1.5rem' }}>
            Os sabores de {placeholderNames} estão em atualização. Os valores já são os oficiais; a lista de sabores será confirmada pela
            confeitaria no WhatsApp.
          </Notice>
        )}
        <ProductConfigurator categoryId={category} onCategoryChange={onCategoryChange} onAdded={onAdded} />
      </div>
    </section>
  );
}
