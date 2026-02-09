import { ThemeStore } from './ThemeStore';

let mockMatches = false;
let changeHandler: (() => void) | null = null;

function mockMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation(() => ({
      get matches() {
        return mockMatches;
      },
      media: '(prefers-color-scheme: dark)',
      addEventListener: (_event: string, handler: () => void) => {
        changeHandler = handler;
      },
      removeEventListener: jest.fn(),
    })),
  });
}

function setSystemDarkMode(dark: boolean) {
  mockMatches = dark;
  changeHandler?.();
}

describe('ThemeStore', () => {
  let store: ThemeStore;

  beforeEach(() => {
    localStorage.clear();
    mockMatches = false;
    changeHandler = null;
    mockMatchMedia();

    store = new ThemeStore();
  });

  test('returns default snapshot', () => {
    expect(store.getSnapshot()).toEqual({
      mode: 'system',
      resolvedTheme: 'light',
    });
  });

  test('initializes theme from localStorage', () => {
    localStorage.setItem('theme-preference', 'dark');

    store = new ThemeStore();

    expect(store.getSnapshot()).toEqual({
      mode: 'dark',
      resolvedTheme: 'dark',
    });
  });

  test('setTheme updates snapshot and persists value', () => {
    store.setTheme('dark');

    expect(store.getSnapshot()).toEqual({
      mode: 'dark',
      resolvedTheme: 'dark',
    });

    expect(localStorage.getItem('theme-preference')).toBe('dark');
  });

  test('resolves system theme from matchMedia', () => {
    mockMatches = true;

    store = new ThemeStore();

    expect(store.getSnapshot().resolvedTheme).toBe('dark');
  });

  test('reacts to system theme changes in system mode', () => {
    const listener = jest.fn();
    store.subscribe(listener);

    setSystemDarkMode(true);

    expect(store.getSnapshot().resolvedTheme).toBe('dark');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('does NOT react to system changes when mode is explicit', () => {
    const listener = jest.fn();

    store.setTheme('light');
    store.subscribe(listener);

    setSystemDarkMode(true);

    expect(store.getSnapshot().resolvedTheme).toBe('light');
    expect(listener).not.toHaveBeenCalled();
  });

  test('unsubscribe removes listener', () => {
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);

    unsubscribe();
    store.setTheme('dark');

    expect(listener).not.toHaveBeenCalled();
  });

  test('getServerSnapshot returns stable snapshot', () => {
    expect(store.getServerSnapshot()).toEqual({
      mode: 'system',
      resolvedTheme: 'light',
    });
  });
});
