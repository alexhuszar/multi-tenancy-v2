import './global.css';
import { RootProvider } from './providers/RootProvider';

export const metadata = {
  title: 'Welcome to CryptoSwap',
  description: 'Cryptocurrency exchange made it easy!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
