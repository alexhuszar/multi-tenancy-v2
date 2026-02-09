'use client';

import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationBar as PrimitiveNavigationBar,
  NavigationBarProps as PrimitiveNavigationBarProps,
  cn,
} from '@multi-tenancy/design-system';
import logoImage from '../../public/assets/images/logo.png';

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
      title="Data Room"
      NavigationLeftSlot={
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src={logoImage} alt="logo" width={52} height={52} />
        </Link>
      }
      {...props}
    />
  );
};
