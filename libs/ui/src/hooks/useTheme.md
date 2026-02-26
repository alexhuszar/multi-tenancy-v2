# useTheme

Read and set the application theme. Backed by a module-level store using `useSyncExternalStore`; no provider is required.

## Import

```tsx
import { useTheme } from '@multi-tenancy/ui';
```

## Returns

| Key | Type | Description |
|-----|------|-------------|
| `mode` | `ThemeMode` | Current mode: `'light' \| 'dark' \| 'system'` |
| `resolvedTheme` | `ResolvedTheme` | Actual applied theme: `'light' \| 'dark'` |
| `setTheme` | `(mode: ThemeMode) => void` | Change the theme |
| `isDark` | `boolean` | `resolvedTheme === 'dark'` |
| `isLight` | `boolean` | `resolvedTheme === 'light'` |
| `isSystem` | `boolean` | `mode === 'system'` |

## Usage

### Toggle between light and dark

```tsx
import { useTheme } from '@multi-tenancy/ui';

function ThemeToggle() {
  const { isDark, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  );
}
```

### Follow system preference

```tsx
const { setTheme } = useTheme();
setTheme('system');
```

### Conditional styling

```tsx
const { isDark, resolvedTheme } = useTheme();

return (
  <div data-theme={resolvedTheme}>
    {isDark ? <MoonIcon /> : <SunIcon />}
  </div>
);
```
