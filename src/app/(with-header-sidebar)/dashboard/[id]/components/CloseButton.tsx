import Image from 'next/image';
import styles from './CloseButton.module.css';

interface Props {
  onClick: () => void;
}

export default function CloseButton({ onClick }: Props) {
  return (
    <div className={styles.closeButtonWrapper}>
      <button
        onClick={onClick}
        aria-label="Close modal"
        type="button"
        className={styles.closeButton}
      >
        <Image src="/icons/x_lg.svg" alt="Close icon" fill />
      </button>
    </div>
  );
}
