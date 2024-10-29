import { Category } from '@/app/(contents)/mainpage/allzonecard/category/CategoryAndDropdown';

export function useURLManager(router: any, pathname: string, searchParams: URLSearchParams) {
  const updateURL = (params: { page?: number; category?: Category | null; sort?: string }) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return { updateURL };
}
