import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn.js';
import { useBusiness } from '../../hooks/useCatalog.js';
import { useCart } from '../../hooks/useCart.jsx';
import { buildContactUrl } from '../../services/whatsappService.js';
import { IconWhatsApp } from '../ui/Icons.jsx';

/**
 * Botão flutuante de WhatsApp: discreto (só o ícone, em marsala).
 * Some enquanto alguma das seções de `hideWhenVisible` estiver na tela
 * e quando há itens no pedido (a barra do pedido assume o rodapé).
 */
export default function WhatsAppFloat({ hideWhenVisible = [] }) {
  const b = useBusiness();
  const cart = useCart();
  const [overTarget, setOverTarget] = useState(false);
  const key = hideWhenVisible.join(',');

  useEffect(() => {
    const targets = key
      .split(',')
      .filter(Boolean)
      .map((s) => document.querySelector(s))
      .filter(Boolean);
    if (targets.length === 0 || !('IntersectionObserver' in window)) return undefined;
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setOverTarget(visible.size > 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [key]);

  const hidden = overTarget || cart.count > 0;

  return (
    <a
      href={buildContactUrl(b)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('wa-float', hidden && 'wa-float--hidden')}
      aria-label="Falar pelo WhatsApp"
      tabIndex={hidden ? -1 : 0}
    >
      <IconWhatsApp />
    </a>
  );
}
