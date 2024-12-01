import MiniCard from '@/components/landing/Section/MiniCard';
import styles from './SecondarySection.module.css';

interface Props {
  inView: boolean;
}

export default function SecondarySection({ inView }: Props) {
  return (
    <section id="primary" className={styles.section}>
      <div className={styles.title}>생산성을 높이는 다양한 설정 ⚡</div>
      <div className={styles.cards}>
        <MiniCard
          src="/images/landing_sm_1.png"
          alt="대시보드 설정 기능 소개"
          title="대시보드 설정"
          desc="대시보드 사진과 이름을 변경할 수 있어요."
          className={styles.cardSm1}
          inView={inView}
        />
        <MiniCard
          src="/images/landing_sm_2.png"
          alt="초대하기 기능 소개"
          title="초대"
          desc="새로운 팀원을 초대할 수 있어요."
          className={styles.cardSm2}
          inView={inView}
        />
        <MiniCard
          src="/images/landing_sm_3.png"
          alt="구성원 기능 소개"
          title="구성원"
          desc="구성원을 초대하고 내보낼 수 있어요."
          className={styles.cardSm3}
          inView={inView}
        />
      </div>
    </section>
  );
}
