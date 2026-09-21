import { cn } from '../../utils/cn.js';
import Monogram from './Monogram.jsx';

/**
 * Moldura de imagem com placeholder elegante.
 * - `src` presente → renderiza <img> (lazy por padrão).
 * - `src` ausente → placeholder com monograma + rótulo.
 * shape: arch | rounded | round | square
 */
export default function ImageFrame({
  src,
  alt = '',
  ratio,
  shape = 'rounded',
  label = 'Foto em breve',
  priority = false,
  offsetFrame = false,
  className,
  style,
  monogram = 'TD',
}) {
  const shapeClass = shape !== 'square' ? `img-frame--${shape}` : null;
  return (
    <figure
      className={cn('img-frame', ratio && 'img-frame--ratio', shapeClass, offsetFrame && 'frame-offset', className)}
      style={{ ...(ratio ? { '--ratio': ratio } : {}), ...style }}
    >
      {src ? (
        <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchpriority={priority ? 'high' : undefined} />
      ) : (
        <div className="img-placeholder" role="img" aria-label={alt || label}>
          <div className="img-placeholder__inner">
            <Monogram />
            {label && <span className="img-placeholder__label">{label}</span>}
          </div>
        </div>
      )}
    </figure>
  );
}
