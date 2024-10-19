import { LoginReturn } from './auth';

export interface User {
  email: string;
  nickname: string;
  profileImageUrl: string;
}

export interface UserStore {
  user: User | null;
  setUser: (userInfo: LoginReturn) => void;
  updateProfileImageUrl: (url: string) => void;
  logout: () => void;
}
