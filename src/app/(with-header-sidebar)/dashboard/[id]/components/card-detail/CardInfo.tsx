import { CardData, ColumnData } from '@/types/dashboardView';
import Assignment from './Assignment';
import styles from './CardInfo.module.css';
import Tag from '@/components/card/Tag';
import ColumnLabel from '@/components/card/ColumnLabel';

const sample = {
  id: 1,
  title: '카드타이틀',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex molestias enim beatae in accusantium cumque necessitatibus quia, dolorem laboriosam soluta maxime error minima. Dolores quis culpa aut hic, cum dolorem?',
  tags: ['마늘', '귀여어', '마늘아아아아'],
  dueDate: '2024-11-11 11:00',
  assignee: {
    profileImageUrl: null,
    nickname: '김희진',
    id: 1,
  },
  imageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/10-1_4804_1731757528194.jpeg',
  teamId: '1',
  columnId: 1234,
  createdAt: '2024',
  updatedAt: '2024',
};

interface CardInfoProps {
  card: CardData;
  columnTitle: string;
}

export default function CardInfo({ card, columnTitle }: CardInfoProps) {
  card = sample;
  const { description, tags, imageUrl } = card;
  return (
    <div className={styles.cardInfo}>
      <div className={styles.assignmentContainer}>
        <Assignment card={card} />
      </div>

      <div className={styles.infoContainer}>
        <div>
          <ColumnLabel name={columnTitle} />
        </div>
        <div>
          <Tag name="하하호호" />
          <Tag name="김" />
          <Tag name="마" />
          <Tag name="늘" />
          <Tag name="귀여워" />
          <Tag name="마느리" />
        </div>
      </div>
    </div>
  );
}
