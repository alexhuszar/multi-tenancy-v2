import React, { ButtonHTMLAttributes, ReactElement } from 'react';
type BaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;
type LoadingProps = {
    isLoading?: false;
    loadingIcon?: never;
} | {
    isLoading: true;
    loadingIcon: ReactElement;
};
export type ButtonProps = BaseProps & LoadingProps & {
    children: React.ReactNode;
    disabled?: boolean;
};
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=Button.d.ts.map