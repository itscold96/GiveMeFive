import { Loader as MantineLoader } from '@mantine/core';
import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <MantineLoader size="lg" />
    </div>
  );
}
