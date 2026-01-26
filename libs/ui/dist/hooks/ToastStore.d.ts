import { ReactNode } from 'react';
export interface ToastItem {
    id: string;
    variant?: 'default' | 'success' | 'error' | 'warning';
    title?: ReactNode;
    subtitle?: ReactNode;
    duration?: number;
    action?: {
        component: ReactNode;
        altText: string;
    };
}
export type ToastOptions = Omit<ToastItem, 'id'>;
export declare class ToastStore {
    private toasts;
    private listeners;
    private readonly emptySnapshot;
    private emitChange;
    subscribe: (listener: () => void) => () => boolean;
    getSnapshot: () => ToastItem[];
    getServerSnapshot: () => ToastItem[];
    toast: (options: ToastOptions) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}
export declare const toastStore: ToastStore;
//# sourceMappingURL=ToastStore.d.ts.map