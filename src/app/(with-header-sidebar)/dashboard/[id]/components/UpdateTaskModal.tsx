import useModalStore from '@/store/modalStore';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import SearchDropdown from './SearchDropdown';
import DatePicker from './DatePicker';
import Textarea from '@/components/Textarea';
import FileInput from '@/components/FileInput';
import TagsInput from '@/components/TagsInput';
import useMember from '../edit/_hooks/useMember';
import useDashboardStore from '@/store/dashboardStore';
import { ERROR_MESSAGES } from '@/constants/message';
import { updateCard } from '@/lib/cardService';
import { TaskFormValues } from './CreateTaskModal';
import useCardStore from '@/store/cardStore';
import styles from './UpdateTaskModal.module.css';
import { useEffect } from 'react';

export default function UpdateTaskModal() {
  const { closeModal } = useModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<TaskFormValues>({ mode: 'onChange' });
  const dashboard = useDashboardStore((state) => state.dashboard);
  const { members } = useMember(dashboard?.id.toString() || null, 10);
  const { card, setCard } = useCardStore();

  const onSubmit = async (data: TaskFormValues) => {
    if (card) {
      const response = await updateCard(data, card.columnId, card.id);
      setCard(response);
      closeModal();
    }
  };

  useEffect(() => {
    if (card) {
      const { title, description } = card;
      reset({
        title,
        description,
      });
    }
  }, [reset, card]);

  console.log(card);

  return (
    <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
      <h2>할일 수정</h2>
      <SearchDropdown
        name="assigneeUserId"
        options={members}
        setValue={setValue}
        defaultAssignee={
          members?.filter((member) => member.userId == card?.assignee.id)[0]
        }
      />
      <Input
        name="title"
        label="제목"
        placeholder="제목을 입력해주세요"
        className={styles.input}
        register={register('title', {
          required: ERROR_MESSAGES.TITLE_REQUIRE,
        })}
        error={errors.title}
        required={true}
      />
      <Textarea
        name="description"
        label="설명"
        placeholder="설명을 입력해주세요"
        className={styles.input}
        register={register('description', {
          required: ERROR_MESSAGES.DESCRIPTION_REQUIRE,
        })}
        error={errors.description}
        required={true}
      />
      <DatePicker
        name="dueDate"
        setValue={setValue}
        defaultDate={card?.dueDate}
      />
      <TagsInput name="tags" setValue={setValue} defaultTags={card?.tags} />
      <FileInput
        id="image"
        name="image"
        label="이미지"
        setValue={setValue}
        className={styles.image}
        url={card?.imageUrl}
      />
      <div className={styles.footer}>
        <Button onClick={closeModal} className={styles.cancel}>
          취소
        </Button>
        <Button type="submit" disabled={!isValid}>
          수정
        </Button>
      </div>
    </form>
  );
}
