import { cn } from '../../utils/cn.js';
import { IconAlert, IconCheck, IconInfo } from './Icons.jsx';

const icons = { info: IconInfo, error: IconAlert, success: IconCheck };

/** Mensagem amigável (info | error | success). Aceita string ou lista. */
export default function Notice({ tone = 'info', items, children, className, style }) {
  const Icon = icons[tone] ?? IconInfo;
  const list = items?.filter(Boolean) ?? [];
  if (!children && list.length === 0) return null;
  return (
    <div className={cn('notice', `notice--${tone}`, className)} style={style} role={tone === 'error' ? 'alert' : 'status'}>
      <Icon />
      <div>
        {children}
        {list.length === 1 && <span>{list[0]}</span>}
        {list.length > 1 && (
          <ul>
            {list.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
