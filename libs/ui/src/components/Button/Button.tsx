import React, { forwardRef, ButtonHTMLAttributes, ReactElement } from 'react';

type BaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;

type LoadingProps =
  | {
      isLoading?: false;
      loadingIcon?: never;
    }
  | {
      isLoading: true;
      loadingIcon: ReactElement;
    };

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = BaseProps &
  LoadingProps & {
    children: React.ReactNode;
    disabled?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
  };

/**
 * CSS variable-based styles for Button variants
 */
const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--semantic-interactive-default)',
    color: 'var(--semantic-foreground-inverse)',
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: 'var(--colors-secondary-500)',
    color: 'var(--semantic-foreground-inverse)',
    borderColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--semantic-interactive-default)',
    borderColor: 'var(--semantic-interactive-default)',
    borderWidth: 'var(--border-width-1)',
    borderStyle: 'solid',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--semantic-foreground-primary)',
    borderColor: 'transparent',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: 'var(--spacing-1) var(--spacing-2)',
    fontSize: 'var(--typography-fontSize-sm)',
  },
  md: {
    padding: 'var(--spacing-2) var(--spacing-4)',
    fontSize: 'var(--typography-fontSize-base)',
  },
  lg: {
    padding: 'var(--spacing-3) var(--spacing-6)',
    fontSize: 'var(--typography-fontSize-lg)',
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, buttonRef) => {
    const {
      children,
      isLoading,
      loadingIcon,
      disabled,
      className,
      variant = 'primary',
      size = 'md',
      style,
      type = 'button',
      ...rest
    } = props;

    const isDisabled = disabled || isLoading;

    // Merge CSS variable styles with any custom styles
    const buttonStyle: React.CSSProperties = {
      ...variantStyles[variant],
      ...sizeStyles[size],
      borderRadius: 'var(--border-radius-md)',
      fontFamily: 'var(--typography-fontFamily-sans)',
      fontWeight: 'var(--typography-fontWeight-medium)',
      transition: `all var(--transition-duration-fast) var(--transition-timing-ease)`,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--spacing-2)',
      ...style,
    };

    return (
      <button
        ref={buttonRef}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        data-testid="button"
        data-variant={variant}
        data-size={size}
        className={className}
        style={buttonStyle}
        {...rest}
      >
        <span aria-hidden={isLoading}>{children}</span>

        {isLoading && (
          <span role="status" aria-live="polite" aria-label="Loading">
            {loadingIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
