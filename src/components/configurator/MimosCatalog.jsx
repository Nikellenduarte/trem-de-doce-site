import { useState } from 'react';
import { useCatalog } from '../../hooks/useCatalog.js';
import { computeTotals, getProductPrice } from '../../services/pricingService.js';
import { createOrder } from '../../utils/order.js';
import { validateCatalogItem } from '../../utils/validation.js';
import { cn } from '../../utils/cn.js';
import BuilderShell from './BuilderShell.jsx';
import Stage from './Stage.jsx';
import ImageFrame from '../ui/ImageFrame.jsx';
import Price from '../ui/Price.jsx';
import Button from '../ui/Button.jsx';
import QuantityStepper from '../ui/QuantityStepper.jsx';
import { IconCheck } from '../ui/Icons.jsx';

const STEPS = [
  { id: 'product', label: 'Mimo' },
  { id: 'quantity', label: 'Quantidade' },
];

function ProductCard({ product, selected, quantity, min, max, step, onSelect, onQuantity }) {
  const price = getProductPrice(product);
  return (
    <article className={cn('product-card', selected && 'product-card--selected')}>
      <ImageFrame src={product.image} alt={product.imageAlt} ratio="1" shape="rounded" label="" />
      <div className="product-card__body">
        <h5 className="product-card__title">{product.name}</h5>
        <p className="product-card__desc">{product.blurb || product.description}</p>
        <div className="product-card__meta">
          <span>
            {product.priceFrom && price != null && 'a partir de '}
            <Price value={price} /> {price != null && `/ ${product.unit}`}
          </span>
          <span>Mínimo: {product.minQuantity != null ? `${product.minQuantity} ${product.unit}s` : 'a confirmar'}</span>
        </div>
      </div>
      <div className="product-card__footer">
        {selected ? (
          <>
            <QuantityStepper size="sm" value={quantity} min={min} max={max} step={step} onChange={onQuantity} label={`Quantidade de ${product.name}`} />
            <Button variant="ghost" size="sm" icon={<IconCheck className="btn__icon" />} aria-pressed="true">
              Escolhido
            </Button>
          </>
        ) : (
          <Button variant="secondary" size="sm" onClick={onSelect} aria-pressed="false">
            Escolher este mimo
          </Button>
        )}
      </div>
    </article>
  );
}

/** Mimos: catálogo de itens simples com quantidade mínima. */
export default function MimosCatalog({ category, onReview }) {
  const catalog = useCatalog();
  const rules = catalog.getRules().mimos;
  const products = catalog.getProducts(category.id);
  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(rules.defaultMinQuantity);

  const product = productId ? catalog.getProduct(productId) : null;
  const min = product?.minQuantity ?? rules.defaultMinQuantity;

  const select = (p) => {
    setProductId(p.id);
    setQuantity(p.minQuantity ?? rules.defaultMinQuantity);
    document.getElementById(`stage-${category.id}-product`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const unitPrice = getProductPrice(product);
  const totals = computeTotals(unitPrice, quantity);
  const validation = validateCatalogItem({ product, quantity }, rules);
  const canReview = Boolean(product) && validation.valid;

  const handleReview = () => {
    const order = createOrder({
      categoryId: category.id,
      productName: product.name,
      options: [{ label: 'Categoria', value: category.name }],
      quantity,
      quantityLabel: `${quantity} ${quantity === 1 ? product.unit : `${product.unit}s`}`,
      unitPrice,
      priceNote: product.priceFrom ? 'Valor a partir de; o valor final depende da personalização.' : null,
    });
    onReview(order);
  };

  const summary = {
    rows: [
      { label: 'Mimo', value: product?.name },
      { label: 'Quantidade', value: product ? `${quantity} ${product.unit}${quantity === 1 ? '' : 's'}` : '' },
    ],
    totals,
    pending: product ? [] : ['Escolha um mimo para começar.'],
    errors: product ? validation.errors : [],
    note: product && !totals.known
      ? 'O valor deste mimo será confirmado pela confeitaria.'
      : product?.priceFrom
        ? 'Valor a partir de; o valor final depende da personalização.'
        : null,
    canReview,
    onReview: handleReview,
  };

  return (
    <BuilderShell
      title={category.name}
      subtitle="Lembrancinhas delicadas. Escolha o mimo e a quantidade."
      steps={STEPS}
      currentStep={product ? 'quantity' : 'product'}
      completedSteps={product ? ['product', 'quantity'] : []}
      summary={summary}
      stagePrefix={`stage-${category.id}`}
    >
      <Stage id={`stage-${category.id}-product`} number={1} title="Escolha o mimo" hint="A quantidade aparece ao escolher.">
        {products.length === 0 ? (
          <p className="stage__empty">Ainda não há mimos cadastrados.</p>
        ) : (
          <div className="mimos-grid">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                selected={productId === p.id}
                quantity={quantity}
                min={p.minQuantity ?? rules.defaultMinQuantity}
                max={rules.maxQuantity}
                step={rules.step}
                onSelect={() => select(p)}
                onQuantity={setQuantity}
              />
            ))}
          </div>
        )}
      </Stage>
    </BuilderShell>
  );
}
