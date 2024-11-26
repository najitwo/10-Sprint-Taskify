import useModalStore from '@/store/modalStore';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './CreateTaskModal.module.css';
import SearchDropdown from './SearchDropdown';
import DatePicker from './DatePicker';
import Textarea from '@/components/Textarea';
import FileInput from '@/components/FileInput';
import TagsInput from '@/components/TagsInput';
import useMember from '../edit/_hooks/useMember';
import useDashboardStore from '@/store/dashboardStore';

export interface TaskFormValues {
  assigneeUserId: number;
  image: File | null;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
}

export default function CreateTaskModal() {
  const { closeModal } = useModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<TaskFormValues>({ mode: 'onChange' });
  const dashboard = useDashboardStore((state) => state.dashboard);
  const { members } = useMember(dashboard?.id.toString() || null, 10);

  const onSubmit = (data: TaskFormValues) => {
    console.log(data);
    // closeModal();
  };

  return (
    <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
      <h2>할일 생성</h2>
      <SearchDropdown
        name="assigneeUserId"
        options={members}
        setValue={setValue}
      />
      <Input name="title" label="제목" placeholder="제목을 입력해주세요" />
      <Textarea name="description" label="내용" />
      <DatePicker name="dueDate" setValue={setValue} />
      <TagsInput name="tags" setValue={setValue} />
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
