import { useMemo, useState } from 'react';
import { useCatalog } from '../../hooks/useCatalog.js';
import { getCakePrice } from '../../services/pricingService.js';
import { createOrder } from '../../utils/order.js';
import { validateCake } from '../../utils/validation.js';
import { computeTotals } from '../../services/pricingService.js';
import { formatCurrency } from '../../utils/format.js';
import { sizeHint } from '../../data/sizes.js';
import BuilderShell from './BuilderShell.jsx';
import Stage from './Stage.jsx';
import OptionCard from '../ui/OptionCard.jsx';
import QuantityStepper from '../ui/QuantityStepper.jsx';

const STEPS = [
  { id: 'size', label: 'Tamanho' },
  { id: 'dough', label: 'Massa' },
  { id: 'flavor', label: 'Sabor' },
];

/** Bolo de Festa: tamanho → massa → sabor (compatível) → quantidade. */
export default function CakeConfigurator({ category, onReview }) {
  const catalog = useCatalog();
  const rules = catalog.getRules().cake;
  const sizeLines = catalog.getSizeLines();
  const sizes = catalog.getSizes();
  const doughs = catalog.getDoughs();
  const tiers = catalog.getFlavorTiers();

  const [sizeId, setSizeId] = useState(null);
  const [doughId, setDoughId] = useState(null);
  const [flavorId, setFlavorId] = useState(null);
  const [quantity, setQuantity] = useState(rules.minQuantity);

  const size = sizeId ? catalog.getSize(sizeId) : null;
  const dough = doughId ? catalog.getDough(doughId) : null;
  const flavor = flavorId ? catalog.getFlavor(flavorId) : null;

  const compatibleFlavors = useMemo(
    () => (doughId ? catalog.getFlavors({ categoryId: category.id, dough: doughId }) : []),
    [catalog, category.id, doughId],
  );

  const selectDough = (id) => {
    setDoughId(id);
    // Regra: cada sabor pertence a uma massa — limpa sabor incompatível.
    if (flavor && flavor.dough !== id) setFlavorId(null);
  };

  const currentStep = !sizeId ? 'size' : !doughId ? 'dough' : 'flavor';
  const completed = [sizeId && 'size', doughId && 'dough', flavorId && 'flavor'].filter(Boolean);

  const unitPrice = size && flavor ? getCakePrice(size.id, flavor.tier) : null;
  const totals = computeTotals(unitPrice, quantity);

  const pending = [
    !sizeId && 'Escolha o tamanho do bolo.',
    !doughId && 'Escolha a massa.',
    doughId && !flavorId && 'Escolha o sabor.',
  ].filter(Boolean);

  const validation = validateCake({ size, dough, flavor, quantity }, rules);
  const allChosen = Boolean(size && dough && flavor);
  const canReview = allChosen && validation.valid;

  const tierName = (id) => tiers.find((t) => t.id === id)?.name ?? id;

  /** "a partir de R$ 140,00" no cartão do tamanho (menor preço entre os tiers). */
  const sizePriceLabel = (id) => {
    const prices = tiers.map((t) => getCakePrice(id, t.id)).filter((p) => p != null);
    if (prices.length === 0) return undefined;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatCurrency(min) : `a partir de ${formatCurrency(min)}`;
  };

  /** Preço do sabor no tamanho escolhido, exibido no cartão do sabor. */
  const flavorPriceLabel = (tier) => (size ? formatCurrency(getCakePrice(size.id, tier)) : undefined);

  const handleReview = () => {
    const order = createOrder({
      categoryId: category.id,
      productName: category.name,
      options: [
        { label: 'Tamanho', value: size.name },
        { label: 'Massa', value: dough.name },
        { label: 'Sabor', value: `${flavor.name} (${tierName(flavor.tier)})` },
      ],
      quantity,
      quantityLabel: `${quantity} ${quantity === 1 ? 'bolo' : 'bolos'}`,
      unitPrice,
    });
    onReview(order);
  };

  const summary = {
    rows: [
      { label: 'Tamanho', value: size?.name },
      { label: 'Massa', value: dough?.name },
      { label: 'Sabor', value: flavor ? `${flavor.name} · ${tierName(flavor.tier)}` : '' },
    ],
    totals,
    quantityControl: (
      <div className="qty-row">
        <div className="qty-row__label">
          <strong>Quantos bolos?</strong>
          <span className="small muted">Normalmente, um por comemoração.</span>
        </div>
        <QuantityStepper value={quantity} min={rules.minQuantity} max={rules.maxQuantity} onChange={setQuantity} label="Quantidade de bolos" />
      </div>
    ),
    pending,
    errors: allChosen ? validation.errors : [],
    note: allChosen && !totals.known ? 'O valor deste bolo será confirmado pela confeitaria.' : null,
    canReview,
    onReview: handleReview,
  };

  return (
    <BuilderShell
      title={category.name}
      subtitle={`Escolha o tamanho, a massa e o sabor. ${rules.details ?? ''}`.trim()}
      steps={STEPS}
      currentStep={currentStep}
      completedSteps={completed}
      summary={summary}
      stagePrefix={`stage-${category.id}`}
    >
      <Stage id={`stage-${category.id}-size`} number={1} title="Escolha o tamanho" hint={`Fatias e medidas aproximadas. ${rules.extrasNote ?? ''}`.trim()}>
        {sizeLines.map((line) => (
          <div key={line.id} className="stage__group">
            {line.name && <h5 className="stage__group-title">{line.name}</h5>}
            {line.hint && <p className="stage__group-hint">{line.hint}</p>}
            <div className="option-grid" role="radiogroup" aria-label={line.name ?? 'Tamanho'}>
              {sizes
                .filter((s) => s.line === line.id)
                .map((s) => (
                  <OptionCard
                    key={s.id}
                    title={s.name}
                    hint={sizeHint(s) || undefined}
                    meta={sizePriceLabel(s.id)}
                    selected={sizeId === s.id}
                    onSelect={() => setSizeId(s.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </Stage>

      <Stage id={`stage-${category.id}-dough`} number={2} title="Agora escolha a massa" locked={!sizeId}>
        <div className="option-grid option-grid--wide" role="radiogroup" aria-label="Massa">
          {doughs.map((d) => (
            <OptionCard key={d.id} title={d.name} hint={d.description} selected={doughId === d.id} onSelect={() => selectDough(d.id)} />
          ))}
        </div>
      </Stage>

      <Stage
        id={`stage-${category.id}-flavor`}
        number={3}
        title="Escolha seu sabor"
        hint={dough ? `Sabores preparados na massa ${dough.name}.` : undefined}
        locked={!doughId}
      >
        {compatibleFlavors.length === 0 ? (
          <p className="stage__empty">Ainda não há sabores cadastrados para esta massa.</p>
        ) : (
          tiers.map((tier) => {
            const list = compatibleFlavors.filter((f) => f.tier === tier.id);
            if (list.length === 0) return null;
            return (
              <div key={tier.id} className="stage__group">
                <h5 className="stage__group-title">{tier.name}</h5>
                <div className="option-grid option-grid--wide" role="radiogroup" aria-label={`Sabores ${tier.name}`}>
                  {list.map((f) => (
                    <OptionCard
                      key={f.id}
                      title={f.name}
                      hint={f.description || undefined}
                      badge={f.badge || undefined}
                      meta={[tier.name, flavorPriceLabel(tier.id)].filter(Boolean).join(' · ')}
                      selected={flavorId === f.id}
                      onSelect={() => setFlavorId(f.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </Stage>
    </BuilderShell>
  );
}
