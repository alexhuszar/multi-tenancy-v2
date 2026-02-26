import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { DigitCode } from './DigitCodeInput';

describe('DigitCode', () => {
  function setup(
    initial = '',
    props: Partial<React.ComponentProps<typeof DigitCode>> = {},
  ) {
    let value = initial;

    const handleChange = jest.fn((v: string) => {
      value = v;
    });

    const utils = render(
      <DigitCode
        value={value}
        onValueChange={handleChange}
        length={6}
        aria-label="Verification code"
        {...props}
      />,
    );

    const inputs = screen.getAllByRole('textbox');

    const rerender = (next: string) =>
      utils.rerender(
        <DigitCode
          value={next}
          onValueChange={handleChange}
          length={6}
          aria-label="Verification code"
          {...props}
        />,
      );

    return { inputs, handleChange, rerender };
  }

  test('renders correct number of inputs', () => {
    const { inputs } = setup();
    expect(inputs).toHaveLength(6);
  });

  test('typing a digit calls onValueChange', async () => {
    const user = userEvent.setup();
    const { inputs, handleChange } = setup();

    await user.type(inputs[0], '5');

    expect(handleChange).toHaveBeenCalledWith('5');
  });

  test('moves focus forward after typing', async () => {
    const user = userEvent.setup();
    const { inputs } = setup();

    await user.type(inputs[0], '3');

    expect(document.activeElement).toBe(inputs[1]);
  });

  test('backspace clears current digit', async () => {
    const user = userEvent.setup();
    const { inputs, handleChange, rerender } = setup('12');

    rerender('12');
    inputs[1].focus();

    await user.keyboard('{Backspace}');

    expect(handleChange).toHaveBeenCalledWith('1');
  });

  test('backspace moves focus backward when empty', async () => {
    const user = userEvent.setup();
    const { inputs } = setup('1');

    inputs[1].focus();
    await user.keyboard('{Backspace}');

    expect(document.activeElement).toBe(inputs[0]);
  });

  test('arrow navigation works', async () => {
    const user = userEvent.setup();
    const { inputs } = setup();

    inputs[2].focus();
    await user.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(inputs[1]);

    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(inputs[2]);
  });

  test('paste distributes digits from start', async () => {
    const user = userEvent.setup();
    const { inputs, handleChange } = setup();

    inputs[0].focus();
    await user.paste('123456');

    expect(handleChange).toHaveBeenCalledWith('123456');
  });

  test('paste distributes from middle index', async () => {
    const user = userEvent.setup();
    const { inputs, handleChange, rerender } = setup('12');

    rerender('12');
    inputs[2].focus();
    await user.paste('3456');

    expect(handleChange).toHaveBeenCalledWith('123456');
  });

  test('handles multi-character autofill injection', () => {
    const { inputs, handleChange } = setup();

    fireEvent.change(inputs[0], { target: { value: '654321' } });

    expect(handleChange).toHaveBeenCalled();
  });

  test('handles IME composition correctly', () => {
    const { inputs, handleChange } = setup();

    fireEvent.compositionStart(inputs[0]);

    fireEvent.change(inputs[0], { target: { value: 'あ' } });
    expect(handleChange).not.toHaveBeenCalled();

    (inputs[0] as HTMLInputElement).value = '5';
    fireEvent.compositionEnd(inputs[0]);

    expect(handleChange).toHaveBeenCalled();
  });

  test('respects disabled state', () => {
    render(
      <DigitCode
        value=""
        onValueChange={jest.fn()}
        disabled
        aria-label="Verification code"
      />,
    );

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  test('applies accessibility attributes', () => {
    render(
      <DigitCode
        value=""
        onValueChange={jest.fn()}
        invalid
        aria-label="Verification code"
      />,
    );

    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-invalid', 'true');
  });
});
