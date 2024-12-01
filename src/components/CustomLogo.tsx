import Symbol from '/public/images/logo_symbol.svg';
import Typo from '/public/images/logo_typo.svg';

interface Props {
  className?: string;
  fill?: string;
}

export function CustomSymbol({ className, fill }: Props) {
  return <Symbol className={className} fill={fill} />;
}

export function CustomTypo({ className, fill }: Props) {
  return <Typo className={className} fill={fill} />;
}
