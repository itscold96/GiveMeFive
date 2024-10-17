import { Pagination as MantinePagination } from '@mantine/core';
import '@mantine/core/styles.css';
import styles from '../main.module.scss';
import paginationStyles from './Pagination.module.scss';

export default function Pagination() {
  return (
    <div className={`${styles.pagination} ${paginationStyles.paginationWrapper}`}>
      <MantinePagination total={5} defaultValue={1} />
    </div>
  );
}
