import Main from './mainpage/main';
import { Suspense } from 'react';
import Loader from '@/app/components/@shared/loader/Loader';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loader />}>
        <Main />
      </Suspense>
    </div>
  );
}
