import { cn } from '../../utils/cn.js';

export default function Badge({ tone, children, className }) {
  return <span className={cn('badge', tone && `badge--${tone}`, className)}>{children}</span>;
}
