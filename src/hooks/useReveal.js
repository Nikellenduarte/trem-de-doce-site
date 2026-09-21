import { useEffect } from 'react';

/**
 * Anima a entrada de elementos com a classe `.reveal` quando entram na
 * viewport. Respeita prefers-reduced-motion e degrada sem JS.
 * Fallback por scroll garante que nada fique invisível após saltos de
 * âncora (menu, CTAs) ou quando a aba estava em segundo plano.
 */
export function useReveal(root = document) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(root.querySelectorAll('.reveal'));
    const show = (n) => n.classList.add('is-visible');

    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(show);
      return undefined;
    }

    const pending = new Set(nodes);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target);
            pending.delete(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    nodes.forEach((n) => io.observe(n));

    // Fallback: revela tudo que já passou (ou está) acima da dobra atual.
    const sweep = () => {
      const limit = window.innerHeight;
      pending.forEach((n) => {
        if (n.getBoundingClientRect().top < limit) {
          show(n);
          pending.delete(n);
          io.unobserve(n);
        }
      });
    };
    window.addEventListener('scroll', sweep, { passive: true });
    const t = window.setTimeout(sweep, 400);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', sweep);
      window.clearTimeout(t);
    };
  }, [root]);
}
