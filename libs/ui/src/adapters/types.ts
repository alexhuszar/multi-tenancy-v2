
import type { ClassValue } from '../utils/classNames';
import type { DesignTokens } from '../tokens/types';

export interface ButtonStyleProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface DialogStyleProps {
  overlayClassName?: string;
  contentClassName?: string;
}

export interface ToastStyleProps {
  variant?: 'default' | 'success' | 'error' | 'warning';
  className?: string;
}

export interface ToastViewportStyleProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export interface SheetStyleProps {
  side?: 'top' | 'right' | 'bottom' | 'left';
  overlayClassName?: string;
  contentClassName?: string;
}

export interface InputStyleProps {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface BreadcrumbsStyleProps {
  className?: string;
  itemClassName?: string;
  separatorClassName?: string;
}

export interface NavigationBarStyleProps {
  className?: string;
}

export interface StyleAdapter {

  name: string;

  cn(...classes: ClassValue[]): string;

  getButtonStyles(props: ButtonStyleProps): string;

  getDialogStyles(props: DialogStyleProps): {
    overlay: string;
    content: string;
  };

  getToastStyles(props: ToastStyleProps): string;

  getToastViewportStyles(props: ToastViewportStyleProps): string;

  getSheetStyles(props: SheetStyleProps): {
    overlay: string;
    content: string;
  };

  getInputStyles(props: InputStyleProps): string;

  getBreadcrumbsStyles(props: BreadcrumbsStyleProps): {
    container: string;
    item: string;
    separator: string;
  };

  getNavigationBarStyles(props: NavigationBarStyleProps): string;
}

export interface StyleAdapterConfig {
  tokens?: DesignTokens;
}
