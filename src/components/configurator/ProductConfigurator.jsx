import { useEffect, useMemo, useState } from 'react';
import { useCatalog } from '../../hooks/useCatalog.js';
import { useCart } from '../../hooks/useCart.jsx';
import { getBoxPrice } from '../../services/pricingService.js';
import { validateBrigadeiroBox, validateBrownieBox } from '../../utils/validation.js';
import { unitsLabel } from '../../utils/format.js';
import CakeConfigurator from './CakeConfigurator.jsx';
import BoxConfigurator from './BoxConfigurator.jsx';
import MimosCatalog from './MimosCatalog.jsx';
import KitsCatalog from './KitsCatalog.jsx';
import OrderReview from './OrderReview.jsx';

/**
 * Configurações específicas de cada categoria "box". Traduz as regras
 * (data/rules.js) e o serviço de preços para o BoxConfigurator genérico.
 */
function useBoxConfigs() {
  const catalog = useCatalog();
  const rules = catalog.getRules();
  return useMemo(
    () => ({
      brigadeiro: {
        noun: 'brigadeiros',
        subtitle: 'Escolha a linha, o tamanho da caixa e misture os sabores como preferir.',
        details: rules.brigadeiro.details,
        lines: rules.brigadeiro.lines,
        quantityMode: 'fixed',
        boxSizes: rules.brigadeiro.boxSizes,
        quantityHint: 'Caixas fechadas. Misturar sabores não altera o valor.',
        minPerFlavor: rules.brigadeiro.minPerFlavor,
        allocStep: 1,
        mixNote: rules.brigadeiro.mixNote,
        perGuestNote: rules.brigadeiro.perGuestNote,
        customNote: rules.brigadeiro.customNote,
        priceFor: (line, boxSize) => ({
          unitPrice: getBoxPrice('brigadeiro', line, boxSize),
          orderQuantity: 1,
          units: boxSize,
          quantityLabel: `1 caixa com ${unitsLabel(boxSize)}`,
        }),
        validate: (state) => validateBrigadeiroBox(state, rules.brigadeiro),
      },
      brownie: {
        noun: 'brownies',
        subtitle: 'Escolha a linha, o tamanho da caixa e distribua entre os sabores.',
        details: rules.brownie.details,
        lines: rules.brownie.lines,
        quantityMode: 'fixed',
        boxSizes: rules.brownie.boxSizes,
        quantityHint: 'Caixas fechadas. Misturar sabores não altera o valor.',
        minPerFlavor: rules.brownie.minPerFlavor,
        allocStep: 1,
        mixNote: rules.brownie.mixNote,
        perGuestNote: rules.brownie.perGuestNote,
        customNote: rules.brownie.customNote,
        priceFor: (line, boxSize) => ({
          unitPrice: getBoxPrice('brownie', line, boxSize),
          orderQuantity: 1,
          units: boxSize,
          quantityLabel: `1 caixa com ${unitsLabel(boxSize)}`,
        }),
        validate: (state) => validateBrownieBox(state, rules.brownie),
      },
    }),
    [rules],
  );
}

const scrollTo = (id) => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

/**
 * Orquestra o montador: abas de categoria, configurador correspondente,
 * revisão do item e entrada no carrinho. `categoryId` controlado pela
 * Home (vitrine/CTAs). `onAdded(mode)` avisa a Home após adicionar.
 */
export default function ProductConfigurator({ categoryId, onCategoryChange, onAdded }) {
  const catalog = useCatalog();
  const cart = useCart();
  const categories = catalog.getCategories();
  const boxConfigs = useBoxConfigs();
  const category = catalog.getCategory(categoryId) ?? categories[0];
  const [order, setOrder] = useState(null);
  const [builderKey, setBuilderKey] = useState(0);
  const [notice, setNotice] = useState(null);

  // Trocar de categoria com um item em revisão: o item entra no pedido
  // automaticamente (antes era descartado e o cliente perdia a escolha).
  const changeCategory = (id) => {
    if (id === category.id) return;
    if (order) {
      cart.addItem(order);
      setOrder(null);
      setBuilderKey((k) => k + 1);
      setNotice(`${order.productName} adicionado ao pedido. Continue escolhendo.`);
    }
    onCategoryChange(id);
  };

  useEffect(() => {
    if (!notice) return undefined;
    const t = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(t);
  }, [notice]);

  const handleReview = (o) => {
    setOrder(o);
    scrollTo('montar');
  };

  const handleEdit = () => {
    setOrder(null);
    scrollTo('montar');
  };

  const handleAdd = (mode) => {
    cart.addItem(order);
    setOrder(null);
    setBuilderKey((k) => k + 1); // reinicia o configurador para o próximo item
    if (mode === 'more') setNotice(`${order.productName} adicionado ao pedido. Escolha o próximo item.`);
    onAdded?.(mode);
  };

  /** Todos os configuradores ficam montados (ocultos) para não perder a escolha ao trocar de aba. */
  const renderBuilder = (c) => {
    const key = `${c.id}-${builderKey}`;
    switch (c.builder) {
      case 'cake':
        return <CakeConfigurator key={key} category={c} onReview={handleReview} />;
      case 'box':
        return <BoxConfigurator key={key} category={c} config={boxConfigs[c.id]} onReview={handleReview} />;
      case 'catalog':
        return <MimosCatalog key={key} category={c} onReview={handleReview} />;
      case 'kits':
        return <KitsCatalog key={key} category={c} onReview={handleReview} />;
      default:
        return null;
    }
  };

  return (
    <div className="builder">
      <div className="builder__tabs" role="tablist" aria-label="Categorias">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            className="tab"
            aria-selected={c.id === category.id}
            aria-controls="builder-panel"
            onClick={() => changeCategory(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {(notice || cart.count > 0) && (
        <div className="builder__strip" role="status" aria-live="polite">
          <span className="builder__strip-text">
            {notice ?? `Seu pedido tem ${cart.count} ${cart.count === 1 ? 'item' : 'itens'}. Pode adicionar de outras categorias.`}
          </span>
          {cart.count > 0 && (
            <button type="button" className="builder__strip-link" onClick={() => scrollTo('reserva')}>
              Finalizar reserva ({cart.count})
            </button>
          )}
        </div>
      )}

      <div id="builder-panel" role="tabpanel">
        {order && (
          <div className="builder__panel">
            <OrderReview order={order} categoryName={category.name} cartCount={cart.count} onEdit={handleEdit} onAdd={handleAdd} />
          </div>
        )}
        {categories.map((c) => (
          <div key={c.id} hidden={Boolean(order) || c.id !== category.id}>
            {renderBuilder(c)}
          </div>
        ))}
      </div>
    </div>
  );
}
