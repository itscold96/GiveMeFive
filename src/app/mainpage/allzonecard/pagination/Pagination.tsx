import { Pagination as MantinePagination } from '@mantine/core';
import '@mantine/core/styles.css';
import styles from '../AllZoneCard.module.scss';
import S from './Pagination.module.scss';

interface PaginationProps {
  onChangePage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function Pagination({ onChangePage, totalItems, itemsPerPage, currentPage }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={`${styles.pagination} ${S.paginationWrapper}`}>
      <MantinePagination total={totalPages} value={currentPage} onChange={onChangePage} />
    </div>
  );
}
