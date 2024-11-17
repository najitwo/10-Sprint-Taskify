import ImageWrapper from '@/components/root/ImageWrapper';
import styles from './SectionCard.module.css';

interface Props {
  title: string;
  subTitle: string;
  src: string;
  alt: string;
  className: string;
  imgFirst?: boolean;
}

export default function SectionCard({
  title,
  subTitle,
  src,
  alt,
  className,
  imgFirst = false,
}: Props) {
  return (
    <div
      className={`${styles.card} ${imgFirst ? styles.imgFirst : styles.textFirst}`}
    >
      {imgFirst && <ImageWrapper src={src} alt={alt} className={className} />}

      <div className={styles.titleWrapper}>
        <div className={styles.subTitle}>{subTitle}</div>
        <div className={styles.title}>{title}</div>
      </div>

      {!imgFirst && <ImageWrapper src={src} alt={alt} className={className} />}
    </div>
  );
}
