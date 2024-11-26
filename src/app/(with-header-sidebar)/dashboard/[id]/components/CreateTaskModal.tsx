import useModalStore from '@/store/modalStore';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './CreateTaskModal.module.css';
import SearchDropdown from './SearchDropdown';
import DatePicker from './DatePicker';
import Textarea from '@/components/Textarea';
import FileInput from '@/components/FileInput';

export interface ManagerOption {
  id: number;
  name: string;
}

export interface TaskFormValues {
  image: File | null;
  title: string;
  description: string;
}

export default function CreateTaskModal() {
  const { closeModal } = useModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<TaskFormValues>({ mode: 'onChange' });

  const onSubmit = () => {
    // closeModal();
  };

  const options = [
    { id: 1, name: '김김김' },
    { id: 2, name: '이이이' },
    { id: 3, name: '최최최' },
  ];

  const handleSelect = (selected: ManagerOption) => {
    console.log('선택된 담당자:', selected);
  };

  return (
    <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
      <h2>할일 생성</h2>
      <SearchDropdown options={options} onSelect={handleSelect} />
      <Input name="title" label="제목" placeholder="제목을 입력해주세요" />
      <Textarea name="description" label="내용" />

      <DatePicker />
      <FileInput
        id="image"
        name="image"
        label="이미지"
        setValue={setValue}
        className={styles.image}
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
