import './global.css';
import { RootProvider } from './providers';

export const metadata = {
  title: 'Welcome to interviews',
  description: 'Interviews examples',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
