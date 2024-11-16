'use client';

import styles from './page.module.css';
import Link from 'next/link';
import Logo from '/public/images/logo.svg';
import EmailIcon from '/public/icons/email.svg';
import FacebookIcon from '/public/icons/facebook.svg';
import InstagramIcon from '/public/icons/instagram.svg';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="홈으로 이동">
          <Logo className={styles.logo} alt="로고" />
        </Link>

        <nav className={styles.nav}>
          <Link href="/login" className={styles.navLink}>
            로그인
          </Link>
          <Link href="/signup" className={styles.navLink}>
            회원가입
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={`${styles.imgWrapper} ${styles.imgMainWrapper}`}>
            <Image
              src={'/images/ehmo.png'}
              className={styles.img}
              width={722}
              height={423}
              alt="일정 관리 웹 어플리케이션"
              loading="eager"
              priority={true}
            />
          </div>

          <div className={styles.titleMainWrapper}>
            <div className={styles.titleMain}>새로운 일정관리</div>
            <div className={styles.titleBrand}>Taskify</div>
          </div>

          <Link href="/login" className={styles.loginBtn}>
            로그인하기
          </Link>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionContent}>
              <div className={styles.titleLandingWrapper}>
                <div className={styles.titleSub}>Point 1</div>
                <div className={styles.titleLanding}>
                  일의 <span className={styles.titleAccent}>우선순위</span>를
                  관리하세요
                </div>
              </div>
              <div
                className={`${styles.imgWrapper} ${styles.imgLandingWrapper}`}
              >
                <Image
                  src={'/images/landing1.png'}
                  className={styles.img}
                  width={594}
                  height={498}
                  alt="우선순위 설정 기능"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionContent}>
              <div className={styles.titleLandingWrapper}>
                <div className={styles.titleSub}>Point 2</div>
                <div className={styles.titleLanding}>
                  해야 할 일을 등록하세요
                </div>
              </div>
              <div
                className={`${styles.imgWrapper} ${styles.imgLandingWrapper}`}
              >
                <Image
                  src={'/images/landing2.png'}
                  className={styles.img}
                  width={436}
                  height={502}
                  alt="할 일 카드 생성 기능"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        <section></section>
      </main>

      <footer className={styles.footer}>
        <div>©codeit - 2023</div>
        <div className={styles.legalLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className={styles.socialLinks}>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="이메일 바로가기"
          >
            <EmailIcon aria-hidden="true" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="페이스북 바로가기"
          >
            <FacebookIcon aria-hidden="true" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="인스타그램 바로가기"
          >
            <InstagramIcon aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
