import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn.js';
import BrandLockup from '../ui/BrandLockup.jsx';

/**
 * Tela de abertura com a logo (espelhada no protótipo: aparece ao
 * carregar e some ~800 ms depois). Mostra a mesma assinatura do início
 * (TD | TREM DE DOCE, CONFEITARIA embaixo); depois a cortina se dissolve. Sem animação em
 * prefers-reduced-motion; nunca bloqueia por mais de 1,6 s.
 */
const MIN_SHOW_MS = 800;
const MAX_SHOW_MS = 1600;

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let t1;
    const hide = () => {
      const elapsed = performance.now() - start;
      t1 = window.setTimeout(() => setHidden(true), Math.max(0, MIN_SHOW_MS - elapsed));
    };
    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide, { once: true });
    const t2 = window.setTimeout(() => setHidden(true), MAX_SHOW_MS);
    return () => {
      window.removeEventListener('load', hide);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!hidden) return undefined;
    const t = window.setTimeout(() => setGone(true), 600);
    return () => window.clearTimeout(t);
  }, [hidden]);

  if (gone) return null;

  return (
    <div className={cn('page-loader', hidden && 'page-loader--hidden')} aria-hidden="true">
      <BrandLockup className="page-loader__lockup" />
    </div>
  );
}
