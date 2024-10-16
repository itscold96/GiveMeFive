import { UserStore } from '@/types/user';
import { deleteCookie } from 'cookies-next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist<UserStore>(
    set => ({
      user: null,
      setUser: newUser => {
        set(() => ({ user: newUser }));
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
    }),
    {
      name: 'authStore',
    },
  ),
);
