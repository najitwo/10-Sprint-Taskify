import { Cards } from '@/types/dashboardView';
import Assignment from './Assignment';
import styles from './CardInfo.module.css';

export default function CardInfo({ card }: { card: Cards }) {
  return (
    <div className={styles.cardInfo}>
      <div className={styles.assignmentContainer}>
        <Assignment card={card} />
      </div>
      <div className={styles.infoContainer}>카드 상세내용 + 댓글 영역</div>
    </div>
  );
}
