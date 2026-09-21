/** Junta classes ignorando valores falsy. */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
