import type { Metadata } from 'next';
import '@/styles/base/globals.scss';

export const metadata: Metadata = {
  title: 'GiveMeFive!',
  description: '즐거움을 나누는 이색 체험 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
