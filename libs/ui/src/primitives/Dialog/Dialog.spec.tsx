import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dialog } from './Dialog';

describe('Dialog internal functionality', () => {
  test(`behavior:
        ✓ renders with 'custom_className_content' className on Content element
        ✓ renders 'custom_className_overlay' className on Overlay element
        ✓ renders children
        ✓ renders title
        ✓ renders close button if closeIcon prop is provided`, async () => {
    render(
      <Dialog
        id="TEST"
        contentClassName="custom_className_content"
        overlayClassName="custom_className_overlay"
        title="TEST"
        open={true}
        closeIcon={<span>close</span>}
        onOpenChange={() => true}
      >
        <div>TEST CHILDREN</div>
      </Dialog>,
    );

    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass('custom_className_content');

    const overlay = screen.getByRole('presentation', { hidden: true });
    expect(overlay).toBeInTheDocument();

    const title = screen.getByRole('heading', { name: 'TEST' });
    expect(title).toBeVisible();

    expect(screen.getByText('TEST CHILDREN')).toBeVisible();

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeVisible();
  });

  test('clicking close triggers onOpenChange(false)', () => {
    const onOpenChangeSpy = jest.fn();

    render(
      <Dialog
        id="TEST"
        contentClassName="content"
        title="TEST"
        open
        closeIcon={<span>close</span>}
        onOpenChange={onOpenChangeSpy}
      >
        <div>Body</div>
      </Dialog>,
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    closeButton.click();

    expect(onOpenChangeSpy).toHaveBeenCalledWith(false);
  });

  test('focus is trapped inside the dialog', () => {
    const onOpenChangeSpy = jest.fn();

    render(
      <Dialog
        id="TEST"
        contentClassName="content"
        title="TEST"
        open
        closeIcon={<span>close</span>}
        onOpenChange={onOpenChangeSpy}
      >
        <div>Body</div>
      </Dialog>,
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toHaveFocus();
  });
});
