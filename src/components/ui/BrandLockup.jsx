import { cn } from '../../utils/cn.js';
import Monogram from './Monogram.jsx';
import { LogoSvg } from './Logo.jsx';

/**
 * Assinatura oficial usada no início e na tela de abertura:
 * TD | TREM DE DOCE alinhados pela base, CONFEITARIA centralizado sob o nome.
 * O tamanho vem de `--name-w` (largura do nome); o resto é proporcional.
 * Decorativo: quem usa fornece o nome acessível.
 */
export default function BrandLockup({ className }) {
  return (
    <span className={cn('lockup', className)} aria-hidden="true">
      <Monogram className="lockup__mark" />
      <span className="lockup__divider" />
      <LogoSvg variant="wordmark" part="name" className="lockup__name" />
      <LogoSvg variant="wordmark" part="sub" className="lockup__sub" />
    </span>
  );
}
