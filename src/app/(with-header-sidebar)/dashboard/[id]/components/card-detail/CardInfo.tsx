import { Card } from '@/types/dashboardView';
import Assignment from './Assignment';
import Tag from '@/components/card/Tag';
import ColumnLabel from '@/components/card/ColumnLabel';
import Pipe from '@/components/svg/Pipe';
import Image from 'next/image';
import styles from './CardInfo.module.css';

interface CardInfoProps {
  card: Card;
  columnTitle: string;
}

export default function CardInfo({ card, columnTitle }: CardInfoProps) {
  const { description, tags, imageUrl } = card;

  return (
    <div className={styles.cardInfo}>
      <div className={styles.assignmentContainer}>
        <Assignment card={card} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.labelArea}>
          <div>
            <ColumnLabel name={columnTitle} />
          </div>
          <Pipe />
          <div className={styles.tagContainer}>
            {tags.map((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        {imageUrl && (
          <div className={styles.imageWrapper}>
            <Image src={imageUrl} alt="할일 이미지" fill />
          </div>
        )}
      </div>
    </div>
  );
}
