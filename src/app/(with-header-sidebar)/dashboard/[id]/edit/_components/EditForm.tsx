'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useIdStore from '../_store/idStore';
import { getBoard, updateBoard } from '../_lib/boardService';
import { Dashboard, UpdateDashboardRequestParams } from '../_types/board';
import Input from '@/components/Input';
import Button from '@/components/Button';
import RadioInput from './RadioInput';
import { ERROR_MESSAGES } from '@/constants/message';
import styles from './EditForm.module.css';

export default function EditForm() {
  const [board, setBoard] = useState<Dashboard>();
  const id = useIdStore((state) => state.id);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateDashboardRequestParams>({ mode: 'onChange' });

  const handleLoad = async (id: string) => {
    const response = await getBoard(id);
    setBoard(response);
  };

  const onSubmit = async (data: UpdateDashboardRequestParams) => {
    const response = await updateBoard(id, data);
    setBoard(response);
  };

  useEffect(() => {
    if (id) {
      handleLoad(id);
    }
  }, [id]);

  useEffect(() => {
    if (board) {
      const { title, color } = board;
      reset({ title, color });
    }
  }, [reset, board]);

  return (
    board && (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>{board.title}</h2>
        <Input
          className={styles.input}
          name="title"
          label="대시보드 이름"
          register={register('title', {
            required: ERROR_MESSAGES.DASHBOARD_TITLE_REQUIRE,
          })}
          error={errors.title}
        />
        <RadioInput register={register('color')} />
        <Button className={styles.button} type="submit" disabled={!isValid}>
          변경
        </Button>
      </form>
    )
  );
}
