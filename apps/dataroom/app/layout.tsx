import { NavigationBar } from '@multi-tenancy/design-system';
import './global.css';

export const metadata = {
  title: 'Dataroom',
  description: 'Manage your files the best way in a virtual DataRoom',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body><NavigationBar title={metadata.title}/>{children}</body>
    </html>
  );
}
