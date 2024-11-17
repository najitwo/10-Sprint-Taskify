import Logo from '/public/images/logo.svg';

interface Props {
  className?: string;
}

export default function CustomLogo({ className }: Props) {
  return <Logo className={className} />;
}
