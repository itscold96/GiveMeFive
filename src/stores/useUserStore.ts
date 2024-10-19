import { LoginReturn } from '@/types/auth';
import { UserStore } from '@/types/user';
import { deleteCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';

export const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: (userInfo: LoginReturn) => {
    set(() => {
      const { user, accessToken, refreshToken } = userInfo;
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
      return { user };
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
