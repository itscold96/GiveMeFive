import Main from './mainpage/main';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
    </div>
  );
}
