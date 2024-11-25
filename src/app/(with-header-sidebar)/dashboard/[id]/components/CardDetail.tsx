import styles from './CardDetail.module.css';

interface CardDetailProps {
  closeModal: () => void;
}

export default function CardDetail({ closeModal }: CardDetailProps) {
  return <div>카드 디테일</div>;
}
