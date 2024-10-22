import { Pagination as MantinePagination } from '@mantine/core';
import '@mantine/core/styles.css';
import styles from '../AllZoneCard.module.scss';
import S from './Pagination.module.scss';

interface PaginationProps {
  onChangePage: (page: number) => void;
  pageCount: number;
  defaultValue: number;
}

export default function Pagination({ onChangePage, pageCount, defaultValue }: PaginationProps) {
  return (
    <div className={`${styles.pagination} ${S.paginationWrapper}`}>
      <MantinePagination total={pageCount} defaultValue={defaultValue} onChange={onChangePage} />
    </div>
  );
}
