import { ReactNode } from 'react';
export interface DialogProps {
    id: string;
    title: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    closeIcon?: ReactNode;
    overlayClassName?: string;
    contentClassName: string;
}
export declare const Dialog: ({ id, title, open, onOpenChange, closeIcon, children, overlayClassName, contentClassName, }: DialogProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Dialog.d.ts.map