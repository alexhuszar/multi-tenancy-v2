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

export type ButtonProps = BaseProps &
  LoadingProps & {
    children: React.ReactNode;
    disabled?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, buttonRef) => {
    const {
      children,
      isLoading,
      loadingIcon,
      disabled,
      className,
      type = 'button',
      ...rest
    } = props;

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={buttonRef}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        data-testid="button"
        className={className}
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
  },
);
