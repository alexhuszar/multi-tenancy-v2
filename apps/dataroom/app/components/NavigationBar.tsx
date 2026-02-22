import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationBar as PrimitiveNavigationBar,
  NavigationBarProps as PrimitiveNavigationBarProps,
  cn,
} from '@multi-tenancy/design-system';
import logoImage from '../../public/assets/images/logo.png';
import { LogoutButton } from '../core/auth/LogoutButton';

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
      titleClassName="w-full"
      title={
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoImage} alt="logo" width={52} height={52} />
          <span className="h4 hidden uppercase text-primary lg:block">
            Data Room
          </span>
        </Link>
      }
      isTitleCentered={false}
      NavigationRightSlot={<LogoutButton />}
      {...props}
    />
  );
};
