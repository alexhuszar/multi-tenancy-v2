import type { Metadata } from 'next';
import './global.css';
import { RootProvider } from './providers';

export const metadata: Metadata = {
  title: 'DataRoom',
  description: 'DataRoom - The only storage solution you need.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
