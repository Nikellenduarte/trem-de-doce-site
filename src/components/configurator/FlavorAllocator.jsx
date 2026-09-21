import { cn } from '../../utils/cn.js';
import { unitsLabel } from '../../utils/format.js';
import QuantityStepper from '../ui/QuantityStepper.jsx';
import { IconCheck, IconClose } from '../ui/Icons.jsx';

/**
 * Seleção múltipla de sabores com distribuição de unidades.
 * - chips: ligar/desligar sabores (limite = maxFlavors)
 * - linhas: quantidade por sabor com mínimo
 */
export default function FlavorAllocator({
  flavors,
  allocations, // { [flavorId]: { flavor, quantity } }
  onToggle,
  onChangeQuantity,
  minPerFlavor,
  maxFlavors,
  target, // total esperado (caixa) — null para livre
  step = 1,
}) {
  const selected = Object.values(allocations);
  const total = selected.reduce((s, a) => s + a.quantity, 0);
  const limitReached = selected.length >= maxFlavors;

  if (flavors.length === 0) {
    return <p className="stage__empty">Ainda não há sabores cadastrados nesta linha.</p>;
  }

  return (
    <div className="stage__group">
      <div className="chips" role="group" aria-label="Sabores disponíveis">
        {flavors.map((f) => {
          const on = Boolean(allocations[f.id]);
          const disabled = !on && limitReached;
          return (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={on}
              disabled={disabled}
              onClick={() => onToggle(f)}
              title={disabled ? `Limite de ${maxFlavors} sabores para esta quantidade` : undefined}
            >
              {on && <IconCheck />}
              {f.name}
            </button>
          );
        })}
      </div>
      {limitReached && (
        <p className="stage__group-hint">
          Limite de {maxFlavors} {maxFlavors === 1 ? 'sabor' : 'sabores'} para esta quantidade (mínimo de {minPerFlavor} unidades por sabor).
        </p>
      )}

      {selected.length > 0 && (
        <div className="alloc" aria-live="polite">
          {selected.map(({ flavor, quantity }) => {
            const invalid = quantity < minPerFlavor;
            return (
              <div key={flavor.id} className={cn('alloc__row', invalid && 'alloc__row--invalid')}>
                <div>
                  <div className="alloc__name">{flavor.name}</div>
                  {invalid ? (
                    <div className="alloc__note">Mínimo de {minPerFlavor} unidades por sabor.</div>
                  ) : (
                    <button type="button" className="alloc__remove" onClick={() => onToggle(flavor)}>
                      <IconClose style={{ width: 12, height: 12 }} /> remover
                    </button>
                  )}
                </div>
                <QuantityStepper
                  size="sm"
                  value={quantity}
                  min={0}
                  max={target ?? 999}
                  step={step}
                  onChange={(v) => onChangeQuantity(flavor.id, v)}
                  label={`Quantidade de ${flavor.name}`}
                />
              </div>
            );
          })}
          <div className={cn('alloc__total', target != null && total === target && 'alloc__total--ok')}>
            <span>{target != null ? `Distribuído / caixa de ${target}` : 'Total do pedido'}</span>
            <strong>
              {unitsLabel(total)}
              {target != null && ` de ${target}`}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}
