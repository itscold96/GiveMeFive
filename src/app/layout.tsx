import type { Metadata } from 'next';
import '@/styles/base/globals.scss';
import Header from './components/@shared/header/Header';
import Providers from './components/providers/Providers';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export const metadata: Metadata = {
  title: 'GiveMeFive!',
  description: '특별한 순간을 만드는 하이파이브! 당신만의 체험을 나누고 새로운 경험을 발견하는 이색 체험 플랫폼',
  keywords: [
    '하이파이브',
    '체험',
    '이색체험',
    '특별한 순간',
    '새로운 경험',
    '특별한 활동',
    '라이프스타일',
    '액티비티',
    '원데이클래스',
  ],
  metadataBase: new URL('https://give-me-five.vercel.app/'),

  openGraph: {
    title: 'GiveMeFive!',
    description: '특별한 순간을 만드는 하이파이브! 당신만의 체험을 나누고 새로운 경험을 발견하는 이색 체험 플랫폼',
    url: 'https://give-me-five.vercel.app/',
    siteName: 'GiveMeFive!',
    locale: 'ko-KR',
    type: 'website',
    images: '/images/logos/logo-big.png',
  },
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
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <div id="toast" />
        <Providers>
          <Header />
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
