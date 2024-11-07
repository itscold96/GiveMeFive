import { Loader as MantineLoader } from '@mantine/core';
import S from './loading.module.scss';

export default function Loader() {
  return (
    <div className={S.loaderWrapper}>
      <MantineLoader size="lg" />
    </div>
  );
}
