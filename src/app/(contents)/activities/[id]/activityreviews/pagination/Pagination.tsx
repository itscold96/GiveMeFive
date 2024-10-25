import { Pagination as MantinePagination } from '@mantine/core';
import '@mantine/core/styles.css';
import S from './Pagination.module.scss';

interface ReviewPaginationProps {
  totalItems?: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

export default function ReviewPagination({ totalItems, currentPage, onChangePage }: ReviewPaginationProps) {
  const itemsPerPage = 3;

  if (!totalItems || totalItems <= 0) {
    return null;
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={`${S.pagination} ${S.paginationWrapper}`}>
      <MantinePagination total={totalPages} value={currentPage} onChange={onChangePage} />
    </div>
  );
}
