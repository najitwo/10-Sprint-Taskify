import { TaskFormValues } from '@/app/(with-header-sidebar)/dashboard/[id]/components/CreateTaskModal';
import axiosInstance from '@/lib/axiosInstance';

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
    return response.data;
  } catch (error) {
    throw error;
  }
};
