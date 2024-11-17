import styles from './ImageWrapper.module.css';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function ImageWrapper({ src, alt, className, priority }: Props) {
  return (
    <div className={`${styles.imgWrapper} ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} />
    </div>
  );
}
