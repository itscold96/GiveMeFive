import { UserStore } from '@/types/user';
import { create } from 'zustand';

export const useUserStore = create<UserStore>(set => ({
  user: null,
  action: {
    setUser: newUser => {
      set(() => ({ user: newUser }));
    },
    updateProfileImageUrl: newImageUrl => {
      set(prevState => ({ ...prevState, profileImageUrl: newImageUrl }));
    },
    resetUser: () => {
      set(() => ({ user: null }));
    },
  },
}));
