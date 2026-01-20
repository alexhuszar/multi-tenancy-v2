import {render, screen } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';

describe('NavigationBar', () => {
  test('renders correctly with title', () => {
    render(<NavigationBar className="navigation-bar" title="Sample title" />);

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();

    const title = screen.getByRole('heading', { name: 'Sample title' });
    expect(title).toBeInTheDocument();
  });

  test('renders NavigationLeftSlot and NavigationRightSlot', () => {
    render(
      <NavigationBar
        className="navigation-bar"
        title="Sample title"
        NavigationLeftSlot={<button>Back</button>}
        NavigationRightSlot={<button>Close</button>}
      />,
    );

    const leftButton = screen.getByRole('button', { name: 'Back' });
    const rightButton = screen.getByRole('button', { name: 'Close' });

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  test('applies custom className and titleClassName', () => {
    render(
      <NavigationBar
        className="custom_className"
        titleClassName="custom_className_input"
        title="Sample title 2"
      />,
    );

    const list = screen.getByRole('list'); 
    expect(list.className).toContain('custom_className');

    const title = screen.getByRole('heading', { name: 'Sample title 2' });
    expect(title.className).toContain('custom_className_input');
  });

  test('does not render title when title prop is missing', () => {
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
