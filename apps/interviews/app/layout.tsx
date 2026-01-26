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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            <RootProvider>{children}</RootProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
