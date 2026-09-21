import { useMemo } from 'react';
import { CatalogContext } from './hooks/useCatalog.js';
import { CartProvider } from './hooks/useCart.jsx';
import { createStaticCatalog } from './services/catalogService.js';
import Home from './pages/Home.jsx';

// Links da versão com tela de pedido separada (#/pedido…) caem no montador da home.
if (window.location.hash.startsWith('#/pedido')) {
  window.history.replaceState(null, '', window.location.hash.endsWith('/reserva') ? '#reserva' : '#montar');
}

/**
 * Raiz da aplicação. O provider do catálogo é criado aqui — para a
 * Fase 3 troca-se createStaticCatalog por um provider de API.
 */
export default function App() {
  const catalog = useMemo(() => createStaticCatalog(), []);
  return (
    <CatalogContext.Provider value={catalog}>
      <CartProvider volumeDiscounts={catalog.getRules().volumeDiscounts}>
        <Home />
      </CartProvider>
    </CatalogContext.Provider>
  );
}
