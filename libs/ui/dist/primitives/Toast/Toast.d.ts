import { ReactNode } from 'react';
export interface ToastProps {
    className?: string;
    contentClassName?: string;
    title?: ReactNode;
    subtitle?: ReactNode;
    open?: boolean;
    onOpenChange: (open: boolean) => void;
    duration?: number;
    closeIcon?: ReactNode;
    action?: {
        component: ReactNode;
        altText: string;
    };
}
export declare const Toast: ({ className, contentClassName, onOpenChange, open, title, subtitle, action, duration, closeIcon, }: ToastProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Toast.d.ts.map