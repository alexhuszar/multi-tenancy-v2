import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Input } from './Input';

describe('<Input />', () => {
  it('associates the label with the input', () => {
    render(<Input label="Email" />);

    const input = screen.getByLabelText('Email');

    expect(input).toBeInTheDocument();

    expect(input).toHaveAttribute('type', 'text');
  });

  it('marks the input as required when required prop is true', () => {
    render(<Input label="Username" required />);

    const input = screen.getByRole('textbox', { name: 'Username' });

    expect(input).toBeRequired();
  });

  it('renders helper text and associates it with the input', () => {
    render(
      <Input label="Password" helperText="Must be at least 8 characters" />,
    );

    const input = screen.getByLabelText('Password');
    const helperText = screen.getByText('Must be at least 8 characters');

    expect(helperText).toBeInTheDocument();
    expect(input).toHaveAttribute(
      'aria-describedby',
      helperText.getAttribute('id'),
    );
  });

  it('renders error text with proper a11y attributes', () => {
    render(<Input label="Email" error="Email is invalid" />);

    const input = screen.getByLabelText('Email');
    const error = screen.getByText('Email is invalid');

    expect(error).toBeInTheDocument();
    expect(error).toHaveAttribute('role', 'alert');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute(
      'aria-errormessage',
      error.getAttribute('id'),
    );
  });

  it('prefers error text over helper text when both are provided', () => {
    render(
      <Input
        label="Email"
        helperText="We will not spam you"
        error="Email is invalid"
      />,
    );

    expect(screen.queryByText('We will not spam you')).not.toBeInTheDocument();

    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  });

  it('disables the input when disabled is true', () => {
    render(<Input label="Name" disabled />);

    const input = screen.getByLabelText('Name');
    expect(input).toBeDisabled();
  });

  it('disables the input and sets aria-busy when loading is true', () => {
    render(<Input label="Search" loading />);

    const input = screen.getByLabelText('Search');

    expect(input).toBeDisabled();

    expect(input).toHaveAttribute('aria-busy', 'true');
  });

  it('renders an end adornment when provided', () => {
    render(
      <Input
        label="Search"
        endAdornment={<span data-testid="icon">🔍</span>}
      />,
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not set aria-describedby when there is no helper or error text', () => {
    render(<Input label="First name" />);

    const input = screen.getByLabelText('First name');

    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('forwards refs to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input label="Ref test" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
