import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
