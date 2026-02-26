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

const getNavigationBarStyles = ({ className }: { className?: string }) =>
  cn('w-full bg-white border-b border-gray-200', className);

const getNavListMenuStyles = ({ className }: { className?: string }) =>
  cn('grid w-full grid-cols-[auto_1fr_auto] items-center px-4 py-3', className);

export const NavigationBar = ({
  className,
  navListMenuClassName,
  ...props
}: NavigationBarProps) => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-2 focus:bg-white focus:text-primary-600 focus:underline"
      >
        Skip to main content
      </a>
      <PrimitiveNavigationBar
        {...props}
        className={getNavigationBarStyles({ className })}
        navListMenuClassName={getNavListMenuStyles({
          className: navListMenuClassName,
        })}
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
      />
    </>
  );
};
