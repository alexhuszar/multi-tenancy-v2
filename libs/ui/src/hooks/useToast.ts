import { useSyncExternalStore } from 'react';
import { toastStore } from './ToastStore';

export type { ToastItem, ToastOptions } from './ToastStore';

/**
 * Hook for managing toast notifications.
 * Uses useSyncExternalStore for optimal performance - no provider needed.
 */
export function useToast() {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    toastStore.getServerSnapshot
  );

  return {
    toasts,
    toast: toastStore.toast,
    dismiss: toastStore.dismiss,
    dismissAll: toastStore.dismissAll,
  };
}
