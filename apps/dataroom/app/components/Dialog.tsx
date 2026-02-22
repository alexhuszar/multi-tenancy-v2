import {
  cn,
  Dialog as PrimitiveDialog,
  DialogProps as PrimitiveDialogProps,
} from '@multi-tenancy/design-system';
import { twMerge } from 'tailwind-merge';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Variant = 'default' | 'destructive' | 'success';
const sizeClasses: Record<Size, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

const variantClasses: Record<Variant, string> = {
  default: 'bg-white text-gray-900',
  destructive: 'bg-red-50 text-red-900 border border-red-200',
  success: 'bg-green-50 text-green-900 border border-green-200',
};

export interface DialogProps
  extends Omit<PrimitiveDialogProps, 'contentClassName'> {
  size?: Size;
  contentClassName?: string;
  overlayClassName?: string;
  variant?: Variant;
  centered?: boolean;
}

const getOverlayStyles = (overlayClassName?: string) =>
  twMerge(
    cn(
      'fixed inset-0 z-40',
      'bg-black/50 backdrop-blur-sm',

      'data-[state=open]:animate-in',
      'data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
    ),
    overlayClassName,
  );

const getContentStyles = ({
  contentClassName,
  size = 'md',
  variant = 'default',
}: {
  contentClassName?: string;
  size?: Size;
  variant?: Variant;
}) =>
  twMerge(
    cn(
      'fixed inset-0 z-50 m-auto h-fit w-full',
      'rounded-md p-6 shadow-xl',
      'origin-center transform-gpu duration-200 ease-out',
      '[&_[data-element="dialog-title"]]:pb-6',
      '[&_[data-element="dialog-title"]]:pt-2',
      'data-[state=open]:animate-in',
      'data-[state=open]:fade-in-0',
      'data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-95',
      sizeClasses[size],
      variantClasses[variant],
    ),
    contentClassName,
  );

export const Dialog = ({
  size = 'md',
  variant = 'default',
  centered = true,
  children,
  overlayClassName,
  contentClassName,
  ...props
}: DialogProps) => {
  return (
    <PrimitiveDialog
      {...props}
      titleClassName={cn('text-lg font-semibold', centered && 'text-center')}
      overlayClassName={getOverlayStyles(overlayClassName)}
      contentClassName={getContentStyles({ contentClassName, size, variant })}
    >
      {children}
    </PrimitiveDialog>
  );
};
