export type { ToastItem, ToastOptions } from './ToastStore';
/**
 * Hook for managing toast notifications.
 * Uses useSyncExternalStore for optimal performance - no provider needed.
 */
export declare function useToast(): {
    toasts: import("./ToastStore").ToastItem[];
    toast: (options: import("./ToastStore").ToastOptions) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
};
//# sourceMappingURL=useToast.d.ts.map