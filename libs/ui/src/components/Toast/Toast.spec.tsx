import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toast } from './Toast';
import { ToastProvider } from './ToastProvider';

describe('Toast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`behavior:
      ✓ display correct title
      ✓ display correct subtitle
      ✓ renders the action
      ✓ renders the close icon
      ✓ renders correct custom-className`, () => {
    const onOpenChangeSpy = jest.fn();

    const { rerender } = render(
      <ToastProvider viewPortClassName="toast-viewport">
        <Toast
          className="custom_className"
          title="Toast title"
          open
          onOpenChange={onOpenChangeSpy}
          duration={4000}
        />
      </ToastProvider>,
    );

    const list = screen.getByRole('list');
    expect(list.getElementsByTagName('li')[0].className).toContain(
      'custom_className',
    );

    const title = screen.getByRole('heading', { name: 'Toast title' });
    expect(title).toBeVisible();

    expect(screen.queryByText('Content toast test')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Upgrade' })).toBeNull();

    rerender(
      <ToastProvider viewPortClassName="toast-viewport">
        <Toast
          className="toast-root"
          title="Toast title"
          open
          onOpenChange={onOpenChangeSpy}
          duration={4000}
          subtitle="Content toast test"
          action={{
            component: <button>Upgrade</button>,
            altText: 'Goto account settings to upgrade',
          }}
        />
      </ToastProvider>,
    );

    expect(screen.getByText('Content toast test')).toBeVisible();

    const actionButton = screen.getByRole('button', { name: /upgrade/i });
    expect(actionButton).toBeVisible();
  });

  test('Close button triggers onOpenChange', () => {
    const onOpenChangeSpy = jest.fn();

    render(
      <ToastProvider viewPortClassName="toast-viewport">
        <Toast
          title="Toast title"
          open
          onOpenChange={onOpenChangeSpy}
          closeIcon={<span>X</span>}
        />
      </ToastProvider>,
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onOpenChangeSpy).toHaveBeenCalledWith(false);
  });

  test('Action button triggers click', () => {
    const onOpenChangeSpy = jest.fn();
    const actionClickSpy = jest.fn();

    render(
      <ToastProvider viewPortClassName="toast-viewport">
        <Toast
          title="Toast title"
          open
          onOpenChange={onOpenChangeSpy}
          action={{
            component: <button onClick={actionClickSpy}>Upgrade</button>,
            altText: 'Goto account settings to upgrade',
          }}
        />
      </ToastProvider>,
    );

    const actionButton = screen.getByText('Upgrade');

    fireEvent.click(actionButton);
    expect(actionClickSpy).toHaveBeenCalled();
  });

  test('renders live region with aria-live for screen readers', () => {
    const onOpenChangeSpy = jest.fn();

    render(
      <ToastProvider viewPortClassName="toast-viewport">
        <Toast
          title="Toast title"
          open
          onOpenChange={onOpenChangeSpy}
          subtitle="Content toast test"
        />
      </ToastProvider>,
    );

    const root = screen.getAllByRole('status');

    expect(root[0]).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByRole('heading', { name: 'Toast title' })).toBeVisible();
    expect(screen.getByText('Content toast test')).toBeVisible();
  });
});
