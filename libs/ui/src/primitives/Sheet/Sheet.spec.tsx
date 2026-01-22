import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Sheet } from './sheet';

const mockOnOpenChange = jest.fn();

describe('Sheet component', () => {
  test(`behavior:
        ✓ renders children when open
        ✓ renders custom className, overlayClassName and contentClassName
        ✓ calls mockOnOpenChange when dialog requests close
        ✓ does not render children when closed`, () => {
      render(
      <Sheet
        open={true}
        onOpenChange={mockOnOpenChange}
        overlayClassName="my-custom-overlay-class"
        className="my-custom-class"
        contentClassName="my-custom-content-class"
      >
        <div>Sheet content</div>
      </Sheet>,
    );

    expect(screen.getByText('Sheet content')).toBeInTheDocument();

    const content = screen.getByText('Sheet content').parentElement;
    const overlay = document.querySelector('[data-element="sheet-overlay"]');
    expect(overlay).toBeTruthy();

    // contentClassName takes precedence when provided
    expect(content).toHaveClass('my-custom-content-class');
    expect(overlay).toHaveClass('my-custom-overlay-class');

    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

    expect(mockOnOpenChange).toHaveBeenCalledTimes(1);
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);

    cleanup();

    render(
      <Sheet
        open={false}
        onOpenChange={mockOnOpenChange}
        overlayClassName="my-custom-overlay-class"
        className="my-custom-class"
        contentClassName="my-custom-content-class"
      >
        <div>Sheet content</div>
      </Sheet>,
    );

    expect(screen.queryByText('Sheet content')).toBeNull();
  });
  test.each(['top', 'bottom', 'left', 'right'] as const)(
    'renders with correct data-position for %s',
    (position) => {
      render(
        <Sheet
          open={true}
          onOpenChange={mockOnOpenChange}
          overlayClassName="unset"
          className="unset"
          contentClassName="unset"
          position={position}
        >
          <div>Content</div>
        </Sheet>,
      );

      const content = screen.getByText('Content').parentElement;

      expect(content).toHaveAttribute('data-position', position);
      expect(content).toHaveAttribute(
        'data-element',
        `sheet-content-${position}`,
      );
    },
  );
});
