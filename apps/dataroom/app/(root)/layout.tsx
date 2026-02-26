import React from 'react';
import { NavigationBar } from '../components/NavigationBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen overflow-hidden">
      <section className="flex flex-auto flex-col overflow-hidden">
        <NavigationBar />
        <div id="main-content" className="flex-1 overflow-auto">
          {children}
        </div>
      </section>
    </main>
  );
};
export default Layout;
