import { cn } from '../../utils/cn.js';

/**
 * Botão reutilizável. `href` renderiza <a>; caso contrário <button>.
 * variant: primary | secondary | ghost | whatsapp | on-primary | on-primary-outline
 * size: sm | md | lg
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  block = false,
  icon = null,
  iconRight = null,
  className,
  children,
  external = false,
  type = 'button',
  ...rest
}) {
  const classes = cn(
    'btn',
    variant !== 'primary' && `btn--${variant}`,
    size !== 'md' && `btn--${size}`,
    block && 'btn--block',
    className,
  );

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
