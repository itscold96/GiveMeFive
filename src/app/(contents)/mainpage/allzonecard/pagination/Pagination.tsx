import { Pagination as MantinePagination } from '@mantine/core';
import '@mantine/core/styles.css';
import styles from '../AllZoneCard.module.scss';
import S from './Pagination.module.scss';

interface PaginationProps {
  onChangePage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  disabled?: boolean;
}

export default function Pagination({
  onChangePage,
  totalItems,
  itemsPerPage,
  currentPage,
  disabled = false,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const PAGES_PER_GROUP = 5;

  const currentGroup = Math.floor((currentPage - 1) / PAGES_PER_GROUP);
  const startPage = currentGroup * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

  const handlePrevGroup = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  return (
    <div className={`${styles.pagination} ${S.paginationWrapper}`}>
      <MantinePagination
        total={totalPages}
        value={currentPage}
        onChange={onChangePage}
        disabled={disabled}
        getItemProps={page => ({
          style: {
            display: page >= startPage && page <= endPage ? 'flex' : 'none',
          },
        })}
        onNextPage={handleNextGroup}
        onPreviousPage={handlePrevGroup}
      />
    </div>
  );
}
