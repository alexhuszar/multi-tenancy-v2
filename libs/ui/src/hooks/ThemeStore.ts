export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeSnapshot {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
}

const STORAGE_KEY = 'theme-preference';

export class ThemeStore {
  private mode: ThemeMode = 'system';
  private resolvedTheme: ResolvedTheme = 'light';
  private listeners = new Set<() => void>();
  private mediaQuery: MediaQueryList | null = null;
  private readonly serverSnapshot: ThemeSnapshot = {
    mode: 'system',
    resolvedTheme: 'light',
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored && ['system', 'light', 'dark'].includes(stored)) {
      this.mode = stored;
    }

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', this.handleSystemChange);

    this.resolvedTheme = this.resolveTheme();
  }

  private handleSystemChange = () => {
    if (this.mode === 'system') {
      this.resolvedTheme = this.resolveTheme();
      this.emitChange();
    }
  };

  private resolveTheme(): ResolvedTheme {
    if (this.mode === 'system') {
      return this.mediaQuery?.matches ? 'dark' : 'light';
    }
    return this.mode;
  }

  private emitChange() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): ThemeSnapshot => ({
    mode: this.mode,
    resolvedTheme: this.resolvedTheme,
  });

  getServerSnapshot = (): ThemeSnapshot => this.serverSnapshot;

  setTheme = (mode: ThemeMode) => {
    this.mode = mode;
    this.resolvedTheme = this.resolveTheme();

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode);
    }

    this.emitChange();
  };
}

export const themeStore = new ThemeStore();
