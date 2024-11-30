import { TaskFormValues } from '@/app/(with-header-sidebar)/dashboard/[id]/components/CreateCardModal';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from '@/store/toastStore';

export const deleteCard = async (cardId: number) => {
  try {
    await axiosInstance.delete(`/cards/${cardId}`);
  } catch (error) {
    throw error;
  }
};

export const createCard = async (
  data: TaskFormValues,
  columnId: number,
  dashboardId: number
) => {
  const { image, ...body } = data;
  let url = null;

  try {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axiosInstance.post(
        `/columns/${columnId}/card-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      url = response.data.imageUrl;
    }
    const response = await axiosInstance.post('/cards', {
      columnId,
      dashboardId,
      ...body,
      ...(url && { imageUrl: url }),
    });
    toast.success({ message: '카드가 생성되었습니다.' });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error({ message: error.message });
    }
  }
};

export const updateCard = async (
  data: TaskFormValues,
  columnId: number,
  cardId: number
) => {
  const { image, ...body } = data;
  let url = null;

  try {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axiosInstance.post(
        `/columns/${columnId}/card-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      url = response.data.imageUrl;
    }
    const response = await axiosInstance.put(`/cards/${cardId}`, {
      columnId,
      ...body,
      ...(url && { imageUrl: url }),
    });
    toast.success({ message: '카드가 수정되었습니다.' });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error({ message: error.message });
    }
  }
};
