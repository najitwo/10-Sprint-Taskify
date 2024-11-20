'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useIdStore from '@/store/idStore';
import { getBoard, updateBoard } from '../_lib/boardService';
import { Dashboard, UpdateDashboardRequestParams } from '@/types/dashboards';
import Button from '@/components/Button';
import DashboardInput from '@/components/DashboardInput';
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
        <DashboardInput register={register} errors={errors}>
          <Button className={styles.button} type="submit" disabled={!isValid}>
            변경
          </Button>
        </DashboardInput>
      </form>
    )
  );
}
