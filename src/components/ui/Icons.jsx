/**
 * Conjunto mínimo de ícones em SVG inline (traço fino, coerente com a
 * identidade). Todos decorativos por padrão (aria-hidden).
 */
const base = { viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' };
const cls = (p, extra = '') => `icon ${extra} ${p.className ?? ''}`.trim();

export const IconWhatsApp = (p) => (
  <svg {...base} {...p} className={cls(p, 'icon--fill')}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67c4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24c-1.53 0-3.02-.42-4.32-1.21l-.31-.18-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.31c0-4.54 3.7-8.24 8.24-8.24m-3.4 4.43c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.14.19 1.98 3.03 4.79 4.24 2.34 1.01 2.81.81 3.32.76.51-.05 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.12-.26-.19-.54-.33-.29-.14-1.68-.83-1.94-.92-.26-.1-.45-.14-.64.14-.19.29-.74.92-.9 1.11-.17.19-.33.21-.62.07-.29-.14-1.21-.45-2.3-1.42-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.44.12-.58.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49h-.55" />
  </svg>
);

export const IconInstagram = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconArrowRight = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowDown = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const IconCheck = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const IconClose = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconMenu = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconMinus = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconPlus = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconInfo = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const IconAlert = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M12 3l9.5 17h-19L12 3z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
);

export const IconHeart = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </svg>
);

export const IconCake = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M4 20h16M5 20v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" />
    <path d="M5 15c1.5 1.5 3 0 4 0s2.5 1.5 4 0 2.5 0 4 0M12 12V9" />
    <path d="M12 9c-1-1-1-2.5 0-3.5 1 1 1 2.5 0 3.5z" />
  </svg>
);

export const IconHand = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12M11 6a1.5 1.5 0 0 1 3 0v6M14 7.5a1.5 1.5 0 0 1 3 0V13" />
    <path d="M17 12.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.8-2.4L4.6 14.4a1.4 1.4 0 0 1 2.2-1.7L8 14.2" />
  </svg>
);

export const IconCar = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M3 13l2-5.5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.5L21 13v5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-11v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z" />
    <path d="M3 13h18M7 16h.01M17 16h.01" />
  </svg>
);

export const IconPin = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M12 21s-6-5.4-6-11a6 6 0 0 1 12 0c0 5.6-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const IconCalendar = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const IconSparkle = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    <path d="M18.5 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
  </svg>
);

export const IconBox = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M3.5 8L12 3.5 20.5 8v8L12 20.5 3.5 16V8z" />
    <path d="M3.5 8l8.5 4.5L20.5 8M12 12.5v8" />
  </svg>
);

export const IconEdit = (p) => (
  <svg {...base} {...p} className={cls(p)}>
    <path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4z" />
    <path d="M13 7l4 4" />
  </svg>
);
