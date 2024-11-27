import ImageWrapper from '@/components/ImageWrapper';
import styles from './MainCard.module.css';

interface Props {
  title: string;
  subTitle: string;
  src: string;
  alt: string;
  className: string;
  imgFirst?: boolean;
}

export default function MainCard({
  title,
  subTitle,
  src,
  alt,
  className,
  imgFirst = false,
}: Props) {
  const destopFor = imgFirst ? styles.imgFirst : '';
  return (
    <div className={`${styles.card} ${destopFor}`}>
      {imgFirst && (
        <ImageWrapper
          src={src}
          alt={alt}
          className={`${className} ${styles.img}`}
        />
      )}

      <div className={styles.titleWrapper}>
        <div className={styles.subTitle}>{subTitle}</div>
        <div className={`${styles.title} ${styles.textLast}`}>{title}</div>
      </div>

      {!imgFirst && <ImageWrapper src={src} alt={alt} className={className} />}
    </div>
  );
}
