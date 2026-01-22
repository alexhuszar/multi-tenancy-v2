import type {
  StyleAdapter,
  StyleAdapterConfig,
  ButtonStyleProps,
  DialogStyleProps,
  ToastStyleProps,
  SheetStyleProps,
  InputStyleProps,
  BreadcrumbsStyleProps,
  NavigationBarStyleProps,
} from '../types';
import { cn as baseCn } from '../../utils/classNames';
import type { ClassValue } from '../../utils/classNames';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  const merged = baseCn(...inputs);
  return twMerge ? twMerge(merged) : merged;
}

export function createTailwindAdapter(
  _config?: StyleAdapterConfig,
): StyleAdapter {
  return {
    name: 'tailwind',
    cn,
    getButtonStyles({
      variant = 'primary',
      size = 'md',
      disabled,
      loading,
      className,
    }: ButtonStyleProps): string {
      return cn(
        'inline-flex items-center justify-center font-medium rounded-md transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' &&
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        variant === 'secondary' &&
          'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        variant === 'outline' &&
          'border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500',
        variant === 'ghost' &&
          'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
        size === 'sm' && 'h-8 px-3 text-sm',
        size === 'md' && 'h-10 px-4 text-base',
        size === 'lg' && 'h-12 px-6 text-lg',
        loading && 'cursor-wait',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      );
    },

    getDialogStyles({ overlayClassName, contentClassName }: DialogStyleProps): {
      overlay: string;
      content: string;
    } {
      return {
        overlay: cn(
          'fixed inset-0 z-50 bg-black/50',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          overlayClassName,
        ),
        content: cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'bg-white rounded-xl shadow-xl p-6',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          contentClassName,
        ),
      };
    },

    getToastStyles({
      variant = 'default',
      className,
    }: ToastStyleProps): string {
      return cn(
        // Base
        'flex items-center justify-between gap-4 p-4 rounded-md shadow-lg border',

        // Variants
        variant === 'default' && 'bg-white border-gray-200 text-gray-900',
        variant === 'success' && 'bg-green-50 border-green-200 text-green-800',
        variant === 'error' && 'bg-red-50 border-red-200 text-red-800',
        variant === 'warning' &&
          'bg-yellow-50 border-yellow-200 text-yellow-800',

        className,
      );
    },

    getSheetStyles({
      side = 'right',
      overlayClassName,
      contentClassName,
    }: SheetStyleProps): { overlay: string; content: string } {
      const slideAnimations = {
        top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        right:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        bottom:
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
      };

      const positions = {
        top: 'inset-x-0 top-0 border-b',
        right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l',
        bottom: 'inset-x-0 bottom-0 border-t',
        left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r',
      };

      return {
        overlay: cn(
          'fixed inset-0 z-50 bg-black/50',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          overlayClassName,
        ),
        content: cn(
          'fixed z-50 bg-white p-6 shadow-xl',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          positions[side],
          slideAnimations[side],
          contentClassName,
        ),
      };
    },

    getInputStyles({
      size = 'md',
      error,
      disabled,
      className,
    }: InputStyleProps): string {
      return cn(
        // Base
        'w-full rounded-md border bg-white transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'placeholder:text-gray-400',

        // Default state
        !error && 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',

        // Error state
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',

        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed bg-gray-50',

        // Sizes
        size === 'sm' && 'h-8 px-2 text-sm',
        size === 'md' && 'h-10 px-3 text-base',
        size === 'lg' && 'h-12 px-4 text-lg',

        className,
      );
    },

    getBreadcrumbsStyles({
      className,
      itemClassName,
      separatorClassName,
    }: BreadcrumbsStyleProps): {
      container: string;
      item: string;
      separator: string;
    } {
      return {
        container: cn('flex items-center text-sm', className),
        item: cn(
          'text-gray-500 hover:text-gray-700 transition-colors',
          '[&[aria-current="page"]]:text-gray-900 [&[aria-current="page"]]:font-medium',
          itemClassName,
        ),
        separator: cn('mx-2 text-gray-400', separatorClassName),
      };
    },

    getNavigationBarStyles({
      className,
    }: NavigationBarStyleProps): string {
      return cn(
        'flex items-center justify-between w-full px-4 py-3',
        'bg-white border-b border-gray-200',
        className
      );
    },
  };
}

export const tailwindAdapter = createTailwindAdapter();
