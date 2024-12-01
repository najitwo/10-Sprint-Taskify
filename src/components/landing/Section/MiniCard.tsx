import ImageWrapper from '@/components/ImageWrapper';
import styles from './MiniCard.module.css';

interface Props {
  src: string;
  alt: string;
  title: string;
  desc: string;
  className: string;
  inView?: boolean;
}

export default function MiniCard({
  src,
  alt,
  title,
  desc,
  className,
  inView,
}: Props) {
  const cardClassName = inView
    ? `${styles.card} ${styles.inView}`
    : styles.card;

  return (
    <div className={`${cardClassName}`}>
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
