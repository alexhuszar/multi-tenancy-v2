'use client';

import { ReactNode } from 'react';
import { ToastRenderer } from './ToastRenderer';

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => {
  return <ToastRenderer>{children}</ToastRenderer>;
};
