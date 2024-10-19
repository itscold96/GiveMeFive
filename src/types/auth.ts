export interface SignupReturn {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginReturn {
  user: SignupReturn;
  refreshToken: string;
  accessToken: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams extends LoginParams {
  nickname: string;
}
