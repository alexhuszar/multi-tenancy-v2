import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToastProvider } from './ToastProvider';

describe('ToastProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('applies custom viewport className', () => {
    render(
      <ToastProvider viewPortClassName="custom_viewport">
        <div>TOASTER CHILDREN</div>
      </ToastProvider>,
    );

    const list = screen.getByRole('list');
    expect(list.className).toEqual('custom_viewport');

    expect(screen.queryByText('TOASTER CHILDREN')).toBeVisible();
  });
});
