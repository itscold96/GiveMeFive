import type { Metadata } from 'next';
import '@/styles/base/globals.scss';
import Header from './components/@shared/header/Header';
import Providers from './components/providers/Providers';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
export const metadata: Metadata = {
  title: 'GiveMeFive!',
  description: '즐거움을 나누는 이색 체험 플랫폼',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <Providers>
          <Header />
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
