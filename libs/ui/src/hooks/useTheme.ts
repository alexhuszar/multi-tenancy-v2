import { useSyncExternalStore, useCallback } from 'react';
import { themeStore, ThemeMode } from './ThemeStore';

export type { ThemeMode, ResolvedTheme } from './ThemeStore';

export function useTheme() {
  const { mode, resolvedTheme } = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  const setTheme = useCallback((newMode: ThemeMode) => {
    themeStore.setTheme(newMode);
  }, []);

  return {
    mode,
    resolvedTheme,
    setTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystem: mode === 'system',
  };
}
