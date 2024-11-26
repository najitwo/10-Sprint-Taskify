import type { CardData } from '@/types/dashboardView';
import Assignment from './Assignment';
import Tag from '@/components/card/Tag';
import ColumnLabel from '@/components/card/ColumnLabel';
import Pipe from '@/components/svg/Pipe';
import Image from 'next/image';
import styles from './CardInfo.module.css';
import MenuDropdown from '@/components/MenuDropdown';

const sample = {
  id: 1,
  title: '카드타이틀',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex molestias enim beatae in accusantium cumque necessitatibus quia, dolorem laboriosam soluta maxime error minima. Dolores quis culpa aut hic, cum dolorem?',
  tags: ['마늘', '기여어', '세젤귀', '맨날자'],
  dueDate: '2024-11-11 11:00',
  assignee: {
    profileImageUrl: null,
    nickname: '김희진',
    id: 1,
  },
  imageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/10-1_4804_1731757528194.jpeg',
  // null,
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
      <MenuDropdown menus={sampleMenu} />
    </div>
  );
}

const sampleMenu = [
  {
    name: 'login',
    handleOnClick: () => {
      console.log('Login clicked');
    },
  },
  {
    name: 'register',
    handleOnClick: () => {
      console.log('Register clicked');
    },
  },
];
