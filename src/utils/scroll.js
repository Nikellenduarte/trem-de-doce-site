/** Rola até um id respeitando prefers-reduced-motion. */
export function scrollToId(id, { instant = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: instant || reduce ? 'instant' : 'smooth', block: 'start' });
  return true;
}
