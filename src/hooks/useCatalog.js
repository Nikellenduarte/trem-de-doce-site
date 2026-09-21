import { createContext, useContext } from 'react';

/**
 * Contexto do catálogo. O valor é o provider criado em App.jsx
 * (hoje: createStaticCatalog). Componentes só conhecem o contrato.
 */
export const CatalogContext = createContext(null);

export function useCatalog() {
  const catalog = useContext(CatalogContext);
  if (!catalog) throw new Error('useCatalog deve ser usado dentro de <CatalogContext.Provider>.');
  return catalog;
}

export function useBusiness() {
  return useCatalog().getBusiness();
}
