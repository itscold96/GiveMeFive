import { Loader as MantineLoader } from '@mantine/core';
import S from './loading.module.scss';

export default function Loading() {
  return (
    <div className={S.loaderWrapper}>
      <MantineLoader size="lg" />
    </div>
  );
}
