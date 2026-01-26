import { ReactNode } from 'react';
export type SheetPosition = 'top' | 'bottom' | 'left' | 'right';
export interface SheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    position?: SheetPosition;
    children: ReactNode;
    className?: string;
    overlayClassName: string;
    contentClassName: string;
}
export declare const SheetTrigger: import("react").ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const SheetClose: import("react").ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const Sheet: ({ open, onOpenChange, overlayClassName, contentClassName, className, position, children, }: SheetProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Sheet.d.ts.map