import React, { forwardRef, ButtonHTMLAttributes, ReactElement } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  internal: {
    className: string;
  };
  external:
    | {
        disabled?: boolean;
        isLoading?: never;
        loadingIcon?: never;
        tabIndex?: number;
        children: React.ReactNode;
        onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
      }
    | {
        disabled?: boolean;
        isLoading: boolean;
        loadingIcon: ReactElement;
        tabIndex?: number;
        children: React.ReactNode;
        onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
      };
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps['internal'] & ButtonProps['external']
>((props, buttonRef) => {
  const { children, tabIndex = 0, isLoading, loadingIcon, ...rest } = props;

  return (
    <button
      data-testid="button"
      ref={buttonRef}
      tabIndex={tabIndex}
      type="button"
      {...rest}
    >
      {children}
      {isLoading && loadingIcon}
    </button>
  );
});
