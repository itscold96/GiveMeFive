import Main from './mainpage/main';
import { Suspense } from 'react';
import { Loader } from '@mantine/core';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              left: 0,
              top: 0,
            }}
          >
            <Loader size="lg" />
          </div>
        }
      >
        <Main />
      </Suspense>
    </div>
  );
}
