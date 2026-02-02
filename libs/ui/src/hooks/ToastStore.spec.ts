import '@testing-library/jest-dom';
import { ToastStore, ToastOptions } from './ToastStore';

describe('ToastStore', () => {
  let store: ToastStore;

  beforeEach(() => {
    store = new ToastStore();

    jest
      .spyOn(global.crypto, 'randomUUID')
      .mockImplementation(() => 'mock-id-s1-s2-s3-s4');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns empty snapshot by default', () => {
    expect(store.getSnapshot()).toEqual([]);
  });

  test('getServerSnapshot always returns empty array', () => {
    expect(store.getServerSnapshot()).toEqual([]);
  });

  test('toast adds a new toast and returns its id', () => {
    const options: ToastOptions = {
      title: 'Hello',
      subtitle: 'World',
      variant: 'success',
      duration: 3000,
    };

    const id = store.toast(options);

    expect(id).toBe('mock-id-s1-s2-s3-s4');
    expect(store.getSnapshot()).toEqual([
      {
        id: 'mock-id-s1-s2-s3-s4',
        ...options,
      },
    ]);
  });

  test('toast notifies subscribers', () => {
    const listener = jest.fn();
    store.subscribe(listener);

    store.toast({ title: 'Test' });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('dismiss removes a toast by id', () => {
    store.toast({ title: 'Toast 1' });
    store.toast({ title: 'Toast 2' });

    store.dismiss('mock-id-s1-s2-s3-s4');

    expect(store.getSnapshot()).toEqual([]);
  });

  test('dismiss does nothing for unknown id', () => {
    store.toast({ title: 'Toast' });

    store.dismiss('non-existent-id');

    expect(store.getSnapshot().length).toBe(1);
  });

  test('dismissAll removes all toasts', () => {
    store.toast({ title: 'Toast 1' });
    store.toast({ title: 'Toast 2' });

    store.dismissAll();

    expect(store.getSnapshot()).toEqual([]);
  });

  test('dismiss and dismissAll notify subscribers', () => {
    const listener = jest.fn();
    store.subscribe(listener);

    store.toast({ title: 'Toast' });
    store.dismiss('mock-id-s1-s2-s3-s4');
    store.toast({ title: 'Toast again' });
    store.dismissAll();

    expect(listener).toHaveBeenCalledTimes(4);
  });

  test('unsubscribe stops notifications', () => {
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);

    unsubscribe();
    store.toast({ title: 'Toast' });

    expect(listener).not.toHaveBeenCalled();
  });
});
