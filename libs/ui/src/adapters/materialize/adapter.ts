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
import { cn } from '../../utils/classNames';

export function createMaterializeAdapter(
  _config?: StyleAdapterConfig,
): StyleAdapter {
  return {
    name: 'materialize',

    cn,

    getButtonStyles({
      variant = 'primary',
      size = 'md',
      disabled,
      loading,
      className,
    }: ButtonStyleProps): string {
      return cn(
        'btn waves-effect',

        variant === 'primary' && 'waves-light blue darken-1',
        variant === 'secondary' && 'waves-light grey darken-1',
        variant === 'outline' && 'btn-flat waves-teal',
        variant === 'ghost' && 'btn-flat waves-teal transparent',

        size === 'sm' && 'btn-small',
        size === 'lg' && 'btn-large',

        disabled && 'disabled',
        loading && 'disabled',

        className,
      );
    },

    getDialogStyles({ overlayClassName, contentClassName }: DialogStyleProps): {
      overlay: string;
      content: string;
    } {
      return {
        overlay: cn('modal-overlay', overlayClassName),
        content: cn('modal', contentClassName),
      };
    },

    getToastStyles({
      variant = 'default',
      className,
    }: ToastStyleProps): string {
      return cn(
        'toast',
        variant === 'default' && 'white black-text',
        variant === 'success' && 'green lighten-4 green-text text-darken-4',
        variant === 'error' && 'red lighten-4 red-text text-darken-4',
        variant === 'warning' && 'yellow lighten-4 orange-text text-darken-4',
        className,
      );
    },

    getSheetStyles({
      side = 'right',
      overlayClassName,
      contentClassName,
    }: SheetStyleProps): { overlay: string; content: string } {
      const sideClasses = {
        top: '',
        right: 'sidenav right-aligned',
        bottom: '',
        left: 'sidenav',
      };

      return {
        overlay: cn('sidenav-overlay', overlayClassName),
        content: cn(sideClasses[side] || 'sidenav', contentClassName),
      };
    },

    getInputStyles({
      size = 'md',
      error,
      disabled,
      className,
    }: InputStyleProps): string {
      return cn(
        'input-field',
        error && 'invalid',
        disabled && 'disabled',
        size === 'sm' && 'input-sm',
        size === 'lg' && 'input-lg',
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
        container: cn('breadcrumb-wrapper', className),
        item: cn('breadcrumb', itemClassName),
        separator: cn('breadcrumb-separator', separatorClassName),
      };
    },

    getNavigationBarStyles({ className }: NavigationBarStyleProps): string {
      return cn('nav-wrapper', className);
    },
  };
}
export const materializeAdapter = createMaterializeAdapter();
