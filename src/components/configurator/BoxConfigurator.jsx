import { useMemo, useState } from 'react';
import { useCatalog } from '../../hooks/useCatalog.js';
import { computeTotals } from '../../services/pricingService.js';
import { createOrder, distributeEvenly } from '../../utils/order.js';
import { unitsLabel, formatCurrency } from '../../utils/format.js';
import BuilderShell from './BuilderShell.jsx';
import Stage from './Stage.jsx';
import FlavorAllocator from './FlavorAllocator.jsx';
import OptionCard from '../ui/OptionCard.jsx';
import QuantityStepper from '../ui/QuantityStepper.jsx';

const STEPS = [
  { id: 'line', label: 'Linha' },
  { id: 'quantity', label: 'Quantidade' },
  { id: 'flavors', label: 'Sabores' },
];

/**
 * Configurador de caixas (Brigadeiros e Petit Brownie).
 * `config` (ver ProductConfigurator) descreve linhas, modo de quantidade,
 * mínimos, preço e validação — a UI é a mesma.
 */
export default function BoxConfigurator({ category, config, onReview }) {
  const catalog = useCatalog();
  const [lineId, setLineId] = useState(null);
  const [quantity, setQuantity] = useState(config.quantityMode === 'free' ? config.min : null);
  const [quantityTouched, setQuantityTouched] = useState(false);
  const [allocations, setAllocations] = useState({});

  const line = config.lines.find((l) => l.id === lineId) ?? null;
  const flavors = useMemo(
    () => (lineId ? catalog.getFlavors({ categoryId: category.id, line: lineId }) : []),
    [catalog, category.id, lineId],
  );

  const quantityChosen = config.quantityMode === 'fixed' ? quantity != null : quantityTouched;
  const maxFlavors = quantity ? Math.max(1, Math.floor(quantity / config.minPerFlavor)) : 1;

  const redistribute = (ids, total) => {
    if (!total) return {};
    const dist = distributeEvenly(total, ids);
    return Object.fromEntries(ids.map((id) => [id, { flavor: catalog.getFlavor(id), quantity: dist[id] }]));
  };

  const selectLine = (id) => {
    setLineId(id);
    setAllocations({}); // sabores pertencem a uma linha
  };

  const selectQuantity = (q) => {
    setQuantity(q);
    setQuantityTouched(true);
    const ids = Object.keys(allocations).slice(0, Math.max(1, Math.floor(q / config.minPerFlavor)));
    setAllocations(redistribute(ids, q));
  };

  const toggleFlavor = (flavor) => {
    const ids = Object.keys(allocations);
    const next = ids.includes(flavor.id) ? ids.filter((i) => i !== flavor.id) : [...ids, flavor.id];
    setAllocations(redistribute(next, quantity));
  };

  const changeQuantity = (flavorId, value) => {
    setAllocations((prev) => ({ ...prev, [flavorId]: { ...prev[flavorId], quantity: value } }));
  };

  const currentStep = !lineId ? 'line' : !quantityChosen ? 'quantity' : 'flavors';
  const selected = Object.values(allocations);
  const flavorsDone = selected.length > 0;
  const completed = [lineId && 'line', quantityChosen && 'quantity', flavorsDone && 'flavors'].filter(Boolean);

  const pricing = line && quantity ? config.priceFor(line.id, quantity) : null;
  const totals = pricing ? computeTotals(pricing.unitPrice, pricing.orderQuantity) : computeTotals(null, 0);

  const pending = [
    !lineId && `Escolha a linha de ${config.noun}.`,
    lineId && !quantityChosen && 'Escolha a quantidade.',
    quantityChosen && !flavorsDone && 'Escolha pelo menos um sabor.',
  ].filter(Boolean);

  const validation = config.validate({ line, boxSize: quantity, allocations });
  const allChosen = Boolean(lineId && quantityChosen && flavorsDone);
  const canReview = allChosen && validation.valid;

  const handleReview = () => {
    const flavorText = selected.map((a) => `${a.flavor.name} (${a.quantity})`).join(', ');
    const order = createOrder({
      categoryId: category.id,
      productName: category.name,
      options: [
        { label: 'Linha', value: line.name },
        { label: 'Sabores', value: flavorText },
      ],
      quantity: pricing.orderQuantity,
      quantityLabel: pricing.quantityLabel,
      units: pricing.units,
      unitPrice: pricing.unitPrice,
      priceNote: config.mixNote,
    });
    onReview(order);
  };

  const summary = {
    rows: [
      { label: 'Linha', value: line?.name },
      { label: 'Quantidade', value: quantityChosen ? unitsLabel(quantity) : '' },
      { label: 'Sabores', value: selected.map((a) => a.flavor.name).join(', ') },
    ],
    totals,
    pending,
    errors: allChosen ? validation.errors : [],
    hints: validation.hints,
    note: [config.mixNote, config.perGuestNote, config.customNote].filter(Boolean).join(' '),
    canReview,
    onReview: handleReview,
  };

  return (
    <BuilderShell title={category.name} subtitle={config.subtitle} steps={STEPS} currentStep={currentStep} completedSteps={completed} summary={summary} stagePrefix={`stage-${category.id}`}>
      <Stage id={`stage-${category.id}-line`} number={1} title="Escolha a linha" hint={config.details || undefined}>
        <div className="option-grid option-grid--wide" role="radiogroup" aria-label="Linha">
          {config.lines.map((l) => (
            <OptionCard key={l.id} title={l.name} hint={l.hint} selected={lineId === l.id} onSelect={() => selectLine(l.id)} />
          ))}
        </div>
      </Stage>

      <Stage id={`stage-${category.id}-quantity`} number={2} title="Agora escolha a quantidade" hint={config.quantityHint} locked={!lineId}>
        {config.quantityMode === 'fixed' ? (
          <div className="option-grid" role="radiogroup" aria-label="Quantidade">
            {config.boxSizes.map((q) => (
              <OptionCard
                key={q}
                title={unitsLabel(q)}
                hint={`até ${Math.floor(q / config.minPerFlavor)} sabores`}
                meta={line ? formatCurrency(config.priceFor(line.id, q).unitPrice) : undefined}
                selected={quantity === q}
                onSelect={() => selectQuantity(q)}
              />
            ))}
          </div>
        ) : (
          <div className="qty-row">
            <div className="qty-row__label">
              <strong>{unitsLabel(quantity)}</strong>
              <span className="small muted">Mínimo de {config.min} unidades.</span>
            </div>
            <QuantityStepper value={quantity} min={config.min} max={config.max} step={config.step} onChange={selectQuantity} label="Quantidade total" />
          </div>
        )}
      </Stage>

      <Stage
        id={`stage-${category.id}-flavors`}
        number={3}
        title="Escolha os sabores"
        hint={`Pelo menos ${config.minPerFlavor} unidades de cada sabor. Distribuímos igualmente; ajuste se quiser.`}
        locked={!quantityChosen}
      >
        <FlavorAllocator
          flavors={flavors}
          allocations={allocations}
          onToggle={toggleFlavor}
          onChangeQuantity={changeQuantity}
          minPerFlavor={config.minPerFlavor}
          maxFlavors={maxFlavors}
          target={quantity}
          step={config.allocStep}
        />
      </Stage>
    </BuilderShell>
  );
}
