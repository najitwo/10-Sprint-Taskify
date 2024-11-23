import ImageWrapper from '@/components/ImageWrapper';
import styles from './MiniCard.module.css';

interface Props {
  src: string;
  alt: string;
  title: string;
  desc: string;
  className: string;
}

export default function MiniCard({ src, alt, title, desc, className }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <ImageWrapper src={src} alt={alt} className={className} />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  );
}
