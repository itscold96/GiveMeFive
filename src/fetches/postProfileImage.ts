import { axiosAuth } from './setupAxios';

export interface PostProfileImageResponse {
  profileImageUrl: string;
}

/**
 * 프로필 이미지를 업로드하고 URL을 반환하는 함수
 * @param image - 업로드할 이미지 파일
 * @returns 프로필 이미지 URL
 */
export const postProfileImage = async (image: File): Promise<PostProfileImageResponse> => {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await axiosAuth.post<PostProfileImageResponse>('/users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
