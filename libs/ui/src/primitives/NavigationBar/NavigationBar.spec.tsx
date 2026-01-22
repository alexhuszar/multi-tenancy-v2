import { cleanup, render, screen } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';

describe('NavigationBar', () => {
  test(`behavior:
        ✓ renders title
        ✓ renders NavigationLeftSlot and NavigationRightSlot
        ✓ renders custom className and titleClassName
        ✓ does not render title when title prop is missing`, () => {
    render(
      <NavigationBar
        className="custom_className"
        titleClassName="custom_className_input"
        title="Sample title"
        NavigationLeftSlot={<button>Back</button>}
        NavigationRightSlot={<button>Close</button>}
      />,
    );

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();

    const title = screen.getByRole('heading', { name: 'Sample title' });
    expect(title).toBeInTheDocument();

    const leftButton = screen.getByRole('button', { name: 'Back' });
    const rightButton = screen.getByRole('button', { name: 'Close' });

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list).toHaveClass('custom_className');

    expect(title).toHaveClass('custom_className_input');
    
    cleanup();

    render(<NavigationBar className="navigation-bar" />);

    const titles = screen.queryByRole('heading');
    expect(titles).toBeNull();
  });

  test('keyboard navigation works for interactive slots', () => {
    render(
      <NavigationBar
        className="navigation-bar"
        title="Sample title"
        NavigationLeftSlot={<button>Left</button>}
        NavigationRightSlot={<button>Right</button>}
      />,
    );

    const leftButton = screen.getByRole('button', { name: 'Left' });
    const rightButton = screen.getByRole('button', { name: 'Right' });

    leftButton.focus();
    expect(document.activeElement).toBe(leftButton);

    rightButton.focus();
    expect(document.activeElement).toBe(rightButton);
  });

  test('data-visual attribute changes with isTitleCentered', () => {
    const { rerender } = render(
      <NavigationBar
        className="navigation-bar"
        title="Sample title"
        isTitleCentered={true}
      />,
    );

    const title = screen.getByRole('heading', { name: 'Sample title' });
    expect(title.getAttribute('data-visual')).toBe('centered');

    rerender(
      <NavigationBar
        className="navigation-bar"
        title="Sample title"
        isTitleCentered={false}
      />,
    );

    expect(title.getAttribute('data-visual')).toBe('');
  });
});
