import { SignupReturn } from './auth';

export interface User {
  email: string;
  nickname: string;
  profileImageUrl: string;
}

export interface UserStore {
  user: User | null;
  setUser: (userInfo: { user: SignupReturn; accessToken?: string; refreshToken?: string }) => void;
  updateProfileImageUrl: (url: string) => void;
  logout: () => void;
}
