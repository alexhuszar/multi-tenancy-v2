'use client';

import { twMerge } from 'tailwind-merge';
import {
  NavigationBar as PrimitiveNavigationBar,
  NavigationBarProps as PrimitiveNavigationBarProps,
  cn,
} from '@multi-tenancy/design-system';

type NavigationBarProps = PrimitiveNavigationBarProps;

function getNavigationBarStyles({ className }: { className?: string }) {
  return twMerge(
    cn(
      'flex items-center justify-between w-full px-4 py-3',
      'bg-white border-b border-gray-200',
      className,
    ),
  );
}

export const NavigationBar = ({ className, ...props }: NavigationBarProps) => {
  return (
    <PrimitiveNavigationBar
      className={getNavigationBarStyles({ className })}
      {...props}
    />
  );
};
