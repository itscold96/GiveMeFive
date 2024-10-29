import { create } from 'zustand';
import { Category } from '@/app/(contents)/mainpage/allzonecard/category/CategoryAndDropdown';

interface AllZoneState {
  selectedSort: string | undefined;
  selectedCategory: Category | null;
  page: number;
  imgError: Record<number, boolean>;

  setSelectedSort: (sort: string | undefined) => void;
  setSelectedCategory: (category: Category | null) => void;
  setPage: (page: number) => void;
  setImgError: (value: Record<number, boolean> | ((prev: Record<number, boolean>) => Record<number, boolean>)) => void;
  resetState: () => void;
}

const initialState = {
  selectedSort: undefined,
  selectedCategory: null,
  page: 1,
  imgError: {},
};

export const useAllZoneStore = create<AllZoneState>(set => ({
  ...initialState,

  setSelectedSort: sort => set({ selectedSort: sort }),

  setSelectedCategory: category => set({ selectedCategory: category }),

  setPage: page => set({ page }),

  setImgError: (value: Record<number, boolean> | ((prev: Record<number, boolean>) => Record<number, boolean>)) =>
    set(state => ({ imgError: typeof value === 'function' ? value(state.imgError) : value })),

  resetState: () => set(initialState),
}));
