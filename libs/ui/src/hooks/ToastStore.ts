import { ReactNode } from 'react';

export interface ToastItem {
  id: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  title?: ReactNode;
  subtitle?: ReactNode;
  duration?: number;
  action?: { component: ReactNode; altText: string };
}

export type ToastOptions = Omit<ToastItem, 'id'>;

export class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners = new Set<() => void>();
  private readonly emptySnapshot: ToastItem[] = [];

  private emitChange() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.toasts;

  getServerSnapshot = () => this.emptySnapshot;

  toast = (options: ToastOptions): string => {
    const id = crypto.randomUUID();
    this.toasts = [...this.toasts, { id, ...options }];
    this.emitChange();
    return id;
  };

  dismiss = (id: string) => {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.emitChange();
  };

  dismissAll = () => {
    this.toasts = [];
    this.emitChange();
  };
}

export const toastStore = new ToastStore();
