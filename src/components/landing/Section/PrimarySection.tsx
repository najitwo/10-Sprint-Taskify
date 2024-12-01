import MainCard from '@/components/landing/Section/MainCard';
import styles from './PrimarySection.module.css';

interface Props {
  inView: boolean;
}

export default function PrimarySection({ inView }: Props) {
  return (
    <section id="secondary" className={styles.section}>
      <MainCard
        title="일의 우선순위를 관리하세요"
        subTitle="Point 1"
        src="/images/landing_lg_1.png"
        alt="우선순위 설정 기능 소개"
        className={styles.cardLg1}
        inView={inView}
      />
      <MainCard
        title="해야 할 일을 등록하세요"
        subTitle="Point 2"
        src="/images/landing_lg_2.png"
        alt="할 일 카드 생성 기능 소개"
        className={styles.cardLg2}
        imgFirst={true}
        inView={inView}
      />
    </section>
  );
}
