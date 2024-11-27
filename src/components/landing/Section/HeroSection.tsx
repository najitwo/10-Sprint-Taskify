import ImageWrapper from '../../ImageWrapper';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.section}>
      <ImageWrapper
        src="/images/home.png"
        alt="일정 관리 웹 어플리케이션"
        className={styles.homeImg}
        priority={true}
      />
      <div className={styles.homeTitleWrapper}>
        <div className={styles.homeTitle}>새로운 일정관리</div>
        <div className={styles.homeBrand}>Taskify</div>
      </div>
      <Link role="button" href="/login" className={styles.homeLoginBtn}>
        로그인하기
      </Link>
    </section>
  );
}
