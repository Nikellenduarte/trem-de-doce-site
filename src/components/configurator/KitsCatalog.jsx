import { useState } from 'react';
import { useCatalog } from '../../hooks/useCatalog.js';
import { computeTotals } from '../../services/pricingService.js';
import { createOrder } from '../../utils/order.js';
import { cn } from '../../utils/cn.js';
import BuilderShell from './BuilderShell.jsx';
import Stage from './Stage.jsx';
import Price from '../ui/Price.jsx';
import Button from '../ui/Button.jsx';
import QuantityStepper from '../ui/QuantityStepper.jsx';
import { IconCheck } from '../ui/Icons.jsx';

const STEPS = [
  { id: 'kit', label: 'Kit' },
  { id: 'quantity', label: 'Quantidade' },
];

function KitCard({ kit, selected, quantity, onSelect, onQuantity }) {
  return (
    <article className={cn('kit-card', selected && 'kit-card--selected')}>
      <div className="kit-card__head">
        <span className="kit-card__guests">até {kit.guests} convidados</span>
        <h5 className="kit-card__title">{kit.name}</h5>
      </div>
      <ul className="kit-card__items">
        {kit.items.map((it) => (
          <li key={it.label}>
            <strong>{it.quantity}</strong> {it.label}
          </li>
        ))}
      </ul>
      <div className="kit-card__price">
        {kit.priceFrom && kit.price != null && <span className="small muted">a partir de </span>}
        <Price value={kit.price} unknownLabel="valor a confirmar" />
      </div>
      <div className="product-card__footer">
        {selected ? (
          <>
            <QuantityStepper size="sm" value={quantity} min={1} max={10} onChange={onQuantity} label={`Quantidade de ${kit.name}`} />
            <Button variant="ghost" size="sm" icon={<IconCheck className="btn__icon" />} aria-pressed="true">
              Escolhido
            </Button>
          </>
        ) : (
          <Button variant="secondary" size="sm" onClick={onSelect} aria-pressed="false">
            Escolher este kit
          </Button>
        )}
      </div>
    </article>
  );
}

/** Festa Completa: kits pré-definidos (bolo + doces). */
export default function KitsCatalog({ category, onReview }) {
  const catalog = useCatalog();
  const kits = catalog.getKits();
  const [kitId, setKitId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const kit = kitId ? kits.find((k) => k.id === kitId) : null;
  const totals = computeTotals(kit?.price ?? null, quantity);

  const select = (k) => {
    setKitId(k.id);
    setQuantity(1);
    document.getElementById(`stage-${category.id}-kit`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReview = () => {
    const order = createOrder({
      categoryId: category.id,
      productName: kit.name,
      options: [
        { label: 'Inclui', value: kit.summary },
        { label: 'Convidados', value: `até ${kit.guests} pessoas` },
      ],
      quantity,
      quantityLabel: `${quantity} ${quantity === 1 ? 'kit' : 'kits'}`,
      units: kit.items.reduce((s, it) => s + it.quantity, 0) * quantity,
      unitPrice: kit.price,
      priceNote: kit.note,
    });
    onReview(order);
  };

  const summary = {
    rows: [
      { label: 'Kit', value: kit?.name },
      { label: 'Inclui', value: kit?.summary },
    ],
    totals,
    pending: kit ? [] : ['Escolha um kit para começar.'],
    errors: [],
    note: kit ? [kit.note, !totals.known && 'O valor deste kit será confirmado pela confeitaria.'].filter(Boolean).join(' ') : null,
    canReview: Boolean(kit),
    onReview: handleReview,
  };

  return (
    <BuilderShell
      title={category.name}
      subtitle="Kits prontos para celebrar: bolo e doces na medida da sua festa."
      steps={STEPS}
      currentStep={kit ? 'quantity' : 'kit'}
      completedSteps={kit ? ['kit', 'quantity'] : []}
      summary={summary}
      stagePrefix={`stage-${category.id}`}
    >
      <Stage id={`stage-${category.id}-kit`} number={1} title="Escolha o kit" hint="Pensados para o número de convidados. Sabores e detalhes combinamos no WhatsApp.">
        {kits.length === 0 ? (
          <p className="stage__empty">Ainda não há kits cadastrados.</p>
        ) : (
          <div className="kits-grid">
            {kits.map((k) => (
              <KitCard key={k.id} kit={k} selected={kitId === k.id} quantity={quantity} onSelect={() => select(k)} onQuantity={setQuantity} />
            ))}
          </div>
        )}
      </Stage>
    </BuilderShell>
  );
}
