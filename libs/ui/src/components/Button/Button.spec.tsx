import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button internal functionality', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`behavior:
        ✓ render with correct className
        ✓ display correct label
        ✓ type = button
        ✓ tabindex = 0
        ✓ disabled attribute present
        ✓ should not call onClick when disabled
        ✓ disabled attribute not present
        ✓ should call onClick when enabled
        ✓ loading icon should be visible when isLoading is true and loadingIcon is provided`, async () => {
    const onClickSpy = jest.fn();

    const user = userEvent.setup();

    const { rerender } = render(
      <Button
        onClick={onClickSpy}
        disabled
        className="custom_className"
        tabIndex={0}
      >
        Click me!
      </Button>,
    );
    const buttonComponent = screen.getByRole('button', {
      name: /Click me!/i,
    });

    // render with correct className
    expect(buttonComponent.className).toBe('custom_className');

    // display correct label

    expect(buttonComponent).toHaveAttribute('type', 'button');
    // ✓ type = button

    expect(buttonComponent).toHaveAttribute('tabindex', '0');
    // ✓  tabindex = 0

    expect(buttonComponent).toHaveAttribute('disabled');
    // ✓ disabled attribute present

    expect(onClickSpy).not.toHaveBeenCalled();

    await user.click(buttonComponent);

    expect(onClickSpy).toHaveBeenCalledTimes(0);
    // ✓ should not call onClick when disabled

    rerender(
      <Button onClick={onClickSpy} className="custom_className">
        Click me!
      </Button>,
    );

    const buttonComponent2 = screen.getByRole('button', {
      name: /Click me!/i,
    });

    expect(buttonComponent2.getAttribute('disabled')).toBe(null);
    // ✓ disabled attribute not present

    expect(onClickSpy).not.toHaveBeenCalled();

    await user.click(buttonComponent2);

    expect(onClickSpy).toHaveBeenCalledTimes(1);
    // ✓ should call onClick when enabled

    rerender(
      <Button
        onClick={onClickSpy}
        isLoading
        className="custom_className"
        loadingIcon={<span data-testid="test-loading-icon"></span>}
      >
        Click me!
      </Button>,
    );

    const loadingIcon = screen.getByRole('status');

    expect(loadingIcon).toBeVisible();
  });
});
