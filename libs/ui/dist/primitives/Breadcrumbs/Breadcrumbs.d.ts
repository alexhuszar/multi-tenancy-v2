import React, { ReactNode } from 'react';
interface BreadcrumbSeparatorProps {
    separator: string | ReactNode;
}
export type BreadcrumbsProps = {
    className?: string;
    children: ReactNode;
    separator?: BreadcrumbSeparatorProps['separator'];
};
export declare const Breadcrumbs: React.ForwardRefExoticComponent<BreadcrumbsProps & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=Breadcrumbs.d.ts.map