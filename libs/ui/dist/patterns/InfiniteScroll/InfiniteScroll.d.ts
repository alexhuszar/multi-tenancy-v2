import { ReactNode } from 'react';
export type Identifiable = {
    id: string;
};
export interface InfiniteScrollProps<T extends Identifiable> {
    items: T[];
    hasMore: boolean;
    onLoadMore: () => void;
    renderItem: (item: T) => ReactNode;
    loader?: ReactNode;
}
export declare function InfiniteScroll<T extends Identifiable>({ items, hasMore, onLoadMore, renderItem, loader, }: InfiniteScrollProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=InfiniteScroll.d.ts.map