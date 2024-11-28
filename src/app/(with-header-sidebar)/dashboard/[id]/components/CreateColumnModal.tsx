import useModalStore from '@/store/modalStore';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useDashboardStore from '@/store/dashboardStore';
import { ERROR_MESSAGES } from '@/constants/message';
import { PostColumnRequest } from '@/types/dashboardView';
import useDashBoardView from '../hooks/useDashBoardView';
import { createColumn } from '@/lib/columnServie';

export default function CreateColumnModal() {
  const { closeModal } = useModalStore();
  const dashboard = useDashboardStore((state) => state.dashboard);
  const { columns } = dashboard
    ? useDashBoardView(`${dashboard.id}`)
    : { columns: [] };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostColumnRequest>({ mode: 'onChange' });

  const onSubmit = async (data: PostColumnRequest) => {
    if (dashboard) {
      await createColumn(dashboard.id, data.title);
      closeModal();
    }
  };

  return (
    <div>
      <h2>새 컬럼 생성</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          label="이름"
          placeholder="새로운 프로젝트"
          register={register('title', {
            required: ERROR_MESSAGES.TITLE_REQUIRE,
            validate: (value) => {
              const isDuplicate = columns.some(
                (column) => column.title === value
              );
              return isDuplicate ? '이미 존재하는 컬럼 이름입니다.' : true;
            },
          })}
          error={errors.title}
        />

        <div>
          <Button
            onClick={() => {
              closeModal();
            }}
          >
            취소
          </Button>
          <Button type="submit" disabled={!isValid}>
            생성
          </Button>
        </div>
      </form>
    </div>
  );
}
