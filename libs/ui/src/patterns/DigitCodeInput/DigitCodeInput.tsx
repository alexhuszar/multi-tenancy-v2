'use client';

import {
  FC,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  CompositionEvent,
} from 'react';

export type DigitCodeProps = {
  value: string;
  onValueChange: (value: string) => void;
  length?: number;
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  className?: string;
  inputClassName: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

export const DigitCode: FC<DigitCodeProps> = ({
  value,
  onValueChange,
  length = 6,
  name,
  disabled,
  className,
  inputClassName,
  invalid,
  autoFocus,
  ...ariaProps
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  const normalizedValue = value
    .replace(/\D/g, '')
    .slice(0, length)
    .padEnd(length, '');

  const focusIndex = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const updateValue = (nextArray: string[]) => {
    onValueChange(nextArray.join(''));
  };

  const distributeDigits = (startIndex: number, raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (!digits) return;

    const next = normalizedValue.split('');

    for (let i = 0; i < digits.length; i++) {
      if (startIndex + i < length) {
        next[startIndex + i] = digits[i];
      }
    }

    updateValue(next);

    const focusTo = Math.min(startIndex + digits.length, length - 1);
    focusIndex(focusTo);
  };

  const handleChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      if (isComposing) return;

      const raw = e.target.value;

      if (raw.length > 1) {
        distributeDigits(index, raw);
        return;
      }

      const digit = raw.replace(/\D/g, '');

      const next = normalizedValue.split('');
      next[index] = digit;

      updateValue(next);

      if (digit && index < length - 1) {
        focusIndex(index + 1);
      }
    };

  const handleKeyDown =
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        const next = normalizedValue.split('');

        if (next[index]) {
          next[index] = '';
          updateValue(next);
        } else if (index > 0) {
          focusIndex(index - 1);
        }
      }

      if (e.key === 'ArrowLeft' && index > 0) {
        focusIndex(index - 1);
      }

      if (e.key === 'ArrowRight' && index < length - 1) {
        focusIndex(index + 1);
      }

      if (
        !e.metaKey &&
        !e.ctrlKey &&
        !/^\d$/.test(e.key) &&
        !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

  const handlePaste =
    (index: number) => (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      distributeDigits(index, e.clipboardData.getData('text'));
    };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd =
    (index: number) => (e: CompositionEvent<HTMLInputElement>) => {
      setIsComposing(false);
      distributeDigits(index, e.currentTarget.value);
    };

  return (
    <div
      role="group"
      aria-invalid={invalid || undefined}
      aria-disabled={disabled || undefined}
      className={className}
      {...ariaProps}
    >
      {name && <input type="hidden" name={name} value={normalizedValue} />}

      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          autoComplete={index === 0 ? 'one-time-code' : undefined}
          maxLength={length}
          value={normalizedValue[index] || ''}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          aria-label={`Digit ${index + 1} of ${length}`}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          onPaste={handlePaste(index)}
          className={inputClassName}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd(index)}
        />
      ))}
    </div>
  );
};
