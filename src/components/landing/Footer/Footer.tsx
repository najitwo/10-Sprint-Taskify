import Link from 'next/link';
import EmailIcon from '/public/icons/email.svg';
import FacebookIcon from '/public/icons/facebook.svg';
import InstagramIcon from '/public/icons/instagram.svg';
import styles from './Footer.module.css';

export default function Footer() {
  return (
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
  );
}
