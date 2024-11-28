import useModalStore from '../../modalStore/modalStore';
import styles from './Modal.module.css';
import AlertModal from './Modal';

const ModalContainer = () => {
  const { isOpen, message } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <AlertModal message={message} />
    </div>
  );
};

export default ModalContainer;
