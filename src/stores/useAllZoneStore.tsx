import { create } from 'zustand';
import { Category } from '@/app/(contents)/mainpage/allzonecard/category/CategoryAndDropdown';

interface AllZoneState {
  selectedSort: string | undefined;
  selectedCategory: Category | null;
  page: number;
  imgError: Record<number, boolean>;
  itemsPerPage: number;

  setSelectedSort: (sort: string | undefined) => void;
  setSelectedCategory: (category: Category | null) => void;
  setPage: (page: number) => void;
  setImgError: (value: Record<number, boolean> | ((prev: Record<number, boolean>) => Record<number, boolean>)) => void;
  resetState: () => void;
  setItemsPerPage: (count: number) => void;
}

const BREAKPOINTS = {
  DESKTOP: 1201,
  TABLET: 768,
} as const;

const getItemsPerPage = () => {
  const width = window.innerWidth;
  if (width >= BREAKPOINTS.DESKTOP) {
    return 12;
  }
  if (width >= BREAKPOINTS.TABLET) {
    return 9;
  }
  return 6;
};

const initialState = {
  selectedSort: undefined,
  selectedCategory: null,
  page: 1,
  imgError: {},
  itemsPerPage: getItemsPerPage(),
};

export const useAllZoneStore = create<AllZoneState>(set => ({
  ...initialState,

  setSelectedSort: sort => set({ selectedSort: sort }),

  setSelectedCategory: category => set({ selectedCategory: category }),

  setPage: page => set({ page }),

  setImgError: (value: Record<number, boolean> | ((prev: Record<number, boolean>) => Record<number, boolean>)) =>
    set(state => ({ imgError: typeof value === 'function' ? value(state.imgError) : value })),

  resetState: () => set(initialState),
  setItemsPerPage: count => set({ itemsPerPage: count }),
}));
