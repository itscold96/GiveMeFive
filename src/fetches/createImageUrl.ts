import { axiosAuth } from './setupAxios';

export const createImageUrl = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await axiosAuth.post('/activities/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.activityImageUrl;
  } catch (error) {
    console.error('이미지 업로드중 에러:', error);
    throw error;
  }
};

export const createImageUrls = async (files: File[] = []) => {
  const urls: string[] = [];

  if (!Array.isArray(files)) {
    throw new Error('files가 배열이 아닙니다');
  }

  for (const file of files) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axiosAuth.post('/activities/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      urls.push(data.activityImageUrl);
    } catch (error) {
      console.error('이미지 업로드중 에러:', error);
      throw error;
    }
  }
  return urls;
};
