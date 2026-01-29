import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'PineSmile - Nha Khoa Từ Lá Dứa Tự Nhiên',
  description: 'Sản phẩm chăm sóc nha khoa tự nhiên từ lá dứa. Bền vững, hiệu quả, an toàn cho cả gia đình.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
