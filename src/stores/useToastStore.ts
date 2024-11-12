import { ToastStore } from '@/types/toast';
import { create } from 'zustand';

export const useToastStore = create<ToastStore>(set => ({
  toastList: [],
  action: {
    addToast: newToast => {
      set(prevState => {
        return { toastList: [...prevState.toastList, { ...newToast, id: Date.now().toString() }] };
      });
    },
    removeToast: id => {
      set(prevState => {
        return { toastList: prevState.toastList.filter(toast => toast.id !== id) };
      });
    },
  },
}));
