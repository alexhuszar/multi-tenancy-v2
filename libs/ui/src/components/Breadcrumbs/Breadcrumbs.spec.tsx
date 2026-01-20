import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  test(`behavior:
        ✓ applies custom className to nav element
        ✓ breadcrumbs items
        ✓ default separator
        ✓ custom separator`, () => {
  const { rerender } = render(
      <Breadcrumbs className="custom_className">
        <div>Home</div>
        <div>Stock</div>
        <div>Puma</div>
      </Breadcrumbs>,
    );

    const navElement = screen.getByRole('navigation', {
      name: /breadcrumb/i,
    });
    expect(navElement.className).toBe('custom_className');

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Stock')).toBeInTheDocument();
    expect(screen.getByText('Puma')).toBeInTheDocument();

    const separators = screen.getAllByTestId('separator');
    expect(separators).toHaveLength(2);

    expect(separators[0]).toHaveTextContent('/');
    expect(separators[1]).toHaveTextContent('/');

    rerender(
      <Breadcrumbs className="unused" separator="*-*">
        <div>Home</div>
        <div>Stock</div>
        <div>Puma</div>
      </Breadcrumbs>,
    );

    const customSeparators = screen.getAllByTestId('separator');
    expect(customSeparators).toHaveLength(2);
    expect(customSeparators[0]).toHaveTextContent('*-*');
    expect(customSeparators[1]).toHaveTextContent('*-*');
  });

  test(`has attributes:
        ✓ nav - [aria-label="breadcrumb"]
        ✓ separator - [data-element="separator"] [aria-hidden]`, () => {
    render(
      <Breadcrumbs className="unused">
        <div>Home</div>
        <div>Stock</div>
        <div>Puma</div>
      </Breadcrumbs>,
    );

    const navElement = screen.getByRole('navigation', {
      name: /breadcrumb/i,
    });
    expect(navElement).toHaveAttribute('aria-label', 'breadcrumb');

    const separators = screen.getAllByTestId('separator');

    separators.forEach((separator) => {
      expect(separator).toHaveAttribute('data-element', 'separator');
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
