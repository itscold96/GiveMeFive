import { SignupReturn } from '@/types/auth';
import { UserStore } from '@/types/user';
import { deleteCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';

export const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: (userInfo: { user: SignupReturn; accessToken?: string; refreshToken?: string }) => {
    set(() => {
      const { user, accessToken, refreshToken } = userInfo;
      const { email, profileImageUrl, nickname, id } = user;
      if (accessToken && refreshToken) {
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
      }
      return { user: { email, profileImageUrl, nickname, id } };
    });
  },
  updateProfileImageUrl: newImageUrl => {
    set(prevState => ({
      user: prevState.user ? { ...prevState.user, profileImageUrl: newImageUrl } : null,
    }));
  },
  logout: () => {
    set(() => {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return { user: null };
    });
  },
}));
