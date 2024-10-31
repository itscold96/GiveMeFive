import Main from './mainpage/main';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <p>콘텐츠를 불러오는 중입니다.</p>
          </div>
        }
      >
        <Main />
      </Suspense>
    </main>
  );
}
