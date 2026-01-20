import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
