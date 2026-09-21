import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { cartTotals, createCartItem } from '../utils/order.js';

/**
 * Carrinho + dados da reserva, persistidos no localStorage para o
 * cliente não perder o pedido ao sair e voltar (mobile/Instagram).
 * Na Fase 3 o mesmo contrato pode sincronizar com a API.
 */
const STORAGE_KEY = 'trem-de-doce:pedido:v1';
const EMPTY_BOOKING = { name: '', date: '', eventType: '', coupon: '', notes: '' };

export const CartContext = createContext(null);

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.items)) return null;
    return { items: data.items, booking: { ...EMPTY_BOOKING, ...(data.booking || {}) } };
  } catch {
    return null;
  }
}

function save(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* armazenamento indisponível: segue só em memória */
  }
}

export function CartProvider({ volumeDiscounts = [], children }) {
  const [state, setState] = useState(() => load() ?? { items: [], booking: EMPTY_BOOKING });
  const [lastAddedId, setLastAddedId] = useState(null);

  useEffect(() => save(state), [state]);

  const addItem = useCallback((order) => {
    const item = createCartItem(order);
    setState((s) => ({ ...s, items: [...s.items, item] }));
    setLastAddedId(item.id);
    return item;
  }, []);

  const removeItem = useCallback((id) => setState((s) => ({ ...s, items: s.items.filter((i) => i.id !== id) })), []);
  const clearItems = useCallback(() => setState((s) => ({ ...s, items: [] })), []);
  const setBooking = useCallback((patch) => setState((s) => ({ ...s, booking: { ...s.booking, ...patch } })), []);
  const resetAll = useCallback(() => setState({ items: [], booking: EMPTY_BOOKING }), []);

  const totals = useMemo(() => cartTotals(state.items, volumeDiscounts), [state.items, volumeDiscounts]);

  const value = useMemo(
    () => ({
      items: state.items,
      booking: state.booking,
      totals,
      count: state.items.length,
      lastAddedId,
      addItem,
      removeItem,
      clearItems,
      setBooking,
      resetAll,
    }),
    [state, totals, lastAddedId, addItem, removeItem, clearItems, setBooking, resetAll],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de <CartProvider>.');
  return ctx;
}
