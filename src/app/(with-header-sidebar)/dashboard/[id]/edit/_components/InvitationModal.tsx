import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import useModalStore from '@/store/modalStore';
import Input from '@/components/Input';
import styles from './InvitationModal.module.css';
import { ERROR_MESSAGES } from '@/constants/message';

export default function InvitationModal({
  handleInvite,
}: {
  handleInvite: (email: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({ mode: 'onChange' });
  const { closeModal } = useModalStore();

  const onSubmit = async ({ email }: { email: string }) => {
    handleInvite(email);
    closeModal();
  };

  return (
    <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <h2>초대하기</h2>
        <Button onClick={closeModal} className={styles.xButton}>
          <Image
            src="/icons/x_sm.svg"
            alt="모달 종료"
            width={24}
            height={24}
            className={styles.image}
          />
        </Button>
      </div>
      <Input
        className={styles.input}
        label="이메일"
        name="email"
        placeholder="이메일 입력"
        register={register('email', {
          required: ERROR_MESSAGES.EMAIL_REQUIRE,
        })}
        error={errors.email}
      />
      <div className={styles.footer}>
        <Button onClick={closeModal} className={styles.cancel}>
          취소
        </Button>
        <Button type="submit" disabled={!isValid}>
          생성
        </Button>
      </div>
    </form>
  );
}
