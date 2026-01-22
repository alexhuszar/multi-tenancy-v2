import type { Metadata } from 'next';
import './global.css';
import { ThemeProvider } from '@multi-tenancy/design-system';
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';

export const metadata: Metadata = {
  title: 'DataRoom',
  description: 'DataRoom - The only storage solution you need.',
};

/**
 * Application root layout that provides theme context to its children.
 *
 * @param children - The React nodes to render as the application's content.
 * @returns The root HTML structure with the ThemeProvider-wrapped children.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider adapter={tailwindAdapter}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}