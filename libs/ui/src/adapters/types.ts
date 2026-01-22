/**
 * Style Adapter Types
 * Interface for CSS framework adapters
 */

import type { ClassValue } from '../utils/classNames';
import type { DesignTokens } from '../tokens/types';

// Button style props
export interface ButtonStyleProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

// Dialog style props
export interface DialogStyleProps {
  overlayClassName?: string;
  contentClassName?: string;
}

// Toast style props
export interface ToastStyleProps {
  variant?: 'default' | 'success' | 'error' | 'warning';
  className?: string;
}

// Sheet style props
export interface SheetStyleProps {
  side?: 'top' | 'right' | 'bottom' | 'left';
  overlayClassName?: string;
  contentClassName?: string;
}

// Input style props
export interface InputStyleProps {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

// Breadcrumbs style props
export interface BreadcrumbsStyleProps {
  className?: string;
  itemClassName?: string;
  separatorClassName?: string;
}

// NavigationBar style props
export interface NavigationBarStyleProps {
  className?: string;
}

/**
 * Style Adapter Interface
 * Each CSS framework implements this interface
 */
export interface StyleAdapter {
  /** Adapter name for identification */
  name: string;

  /** Class name utility - merges and deduplicates classes */
  cn(...classes: ClassValue[]): string;

  /** Button component styles */
  getButtonStyles(props: ButtonStyleProps): string;

  /** Dialog component styles */
  getDialogStyles(props: DialogStyleProps): {
    overlay: string;
    content: string;
  };

  /** Toast component styles */
  getToastStyles(props: ToastStyleProps): string;

  /** Sheet component styles */
  getSheetStyles(props: SheetStyleProps): {
    overlay: string;
    content: string;
  };

  /** Input component styles */
  getInputStyles(props: InputStyleProps): string;

  /** Breadcrumbs component styles */
  getBreadcrumbsStyles(props: BreadcrumbsStyleProps): {
    container: string;
    item: string;
    separator: string;
  };

  /** NavigationBar component styles */
  getNavigationBarStyles(props: NavigationBarStyleProps): string;
}

/**
 * Style Adapter Configuration
 */
export interface StyleAdapterConfig {
  tokens?: DesignTokens;
}
