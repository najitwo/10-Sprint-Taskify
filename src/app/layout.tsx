import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './variables.css';
import './reset.css';
import Toast from '@/components/Toast';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Taskify',
  description: 'Task management application',
  openGraph: {
    title: 'Taskify',
    description: 'Task management application',
    url: 'https://taskify10.vercel.app/',
    images: [
      {
        url: '/images/home.png',
        width: 1200,
        height: 730,
        alt: 'Taskify - Task management application',
      },
    ],
    siteName: 'Taskify',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>
        {children}
        <Toast />
      </body>
    </html>
  );
}
