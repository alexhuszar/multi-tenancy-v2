# DigitCode

Multi-digit code input (OTP / PIN / verification code). Each digit gets its own `<input>` element with full keyboard navigation, paste support, IME composition handling, and accessibility built in.

## Import

```tsx
import { DigitCode } from '@multi-tenancy/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Current code value (non-digit chars are stripped automatically) |
| `onValueChange` | `(value: string) => void` | — | **Required.** Called with the updated code string on every change |
| `length` | `number` | `6` | Number of digit inputs to render |
| `name` | `string` | — | Name for a hidden `<input>` used for form submission |
| `disabled` | `boolean` | — | Disables all inputs |
| `invalid` | `boolean` | — | Sets `aria-invalid` on the group |
| `autoFocus` | `boolean` | — | Auto-focuses the first input on mount |
| `aria-label` | `string` | — | Label for the group element |
| `aria-describedby` | `string` | — | ID of an external description element |

## Keyboard interactions

| Key | Behaviour |
|-----|-----------|
| `0–9` | Enters digit, advances focus to next input |
| `Backspace` | Clears the current digit; moves focus to the previous input if the field was already empty |
| `ArrowLeft` | Moves focus to the previous input |
| `ArrowRight` | Moves focus to the next input |
| `Paste` | Distributes pasted digits starting from the focused input |

## Accessibility

- Rendered as `<div role="group">` with `aria-invalid` and `aria-disabled`.
- Each input has an individual `aria-label` (`"Digit 1 of 6"`, etc.).
- The first input has `autoComplete="one-time-code"` for browser autofill.

## Usage

### Basic (controlled)

```tsx
import { useState } from 'react';
import { DigitCode } from '@multi-tenancy/ui';

function OtpForm() {
  const [code, setCode] = useState('');

  return (
    <DigitCode
      value={code}
      onValueChange={setCode}
      aria-label="One-time passcode"
    />
  );
}
```

### 4-digit PIN

```tsx
<DigitCode value={pin} onValueChange={setPin} length={4} aria-label="PIN" />
```

### With validation error

```tsx
<DigitCode
  value={code}
  onValueChange={setCode}
  invalid={isInvalid}
  aria-label="Verification code"
  aria-describedby="code-error"
/>
{isInvalid && <p id="code-error">Incorrect code. Please try again.</p>}
```

### Disabled

```tsx
<DigitCode value="123456" onValueChange={() => {}} disabled />
```

### With react-hook-form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { DigitCode } from '@multi-tenancy/ui';

const { control, handleSubmit } = useForm<{ otp: string }>();

<Controller
  name="otp"
  control={control}
  rules={{ validate: (v) => v.length === 6 || 'Enter all 6 digits' }}
  render={({ field, fieldState }) => (
    <DigitCode
      value={field.value ?? ''}
      onValueChange={field.onChange}
      invalid={!!fieldState.error}
      aria-label="OTP"
    />
  )}
/>
```
