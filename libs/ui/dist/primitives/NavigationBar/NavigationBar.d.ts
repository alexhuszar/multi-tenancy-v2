import { ReactElement, ReactNode } from 'react';
export type NavigationBarProps = {
    className?: string;
    titleClassName?: string;
    title?: string | ReactNode;
    isTitleCentered?: boolean;
    NavigationLeftSlot?: ReactElement;
    NavigationRightSlot?: ReactElement;
};
export declare const NavigationBar: ({ className, titleClassName, title, isTitleCentered, NavigationLeftSlot, NavigationRightSlot, }: NavigationBarProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=NavigationBar.d.ts.map