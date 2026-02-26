# Input

Accessible text input with label, helper text, error messaging, end adornment, and loading state.

## Import

```tsx
import { Input } from '@multi-tenancy/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text displayed above the input |
| `helperText` | `string` | — | Supplemental text shown below the input |
| `error` | `string` | — | Error message; replaces `helperText` and sets `aria-invalid` |
| `loading` | `boolean` | `false` | Shows loading state and disables the input |
| `required` | `boolean` | `false` | Marks the field required; adds `*` indicator |
| `endAdornment` | `ReactNode` | — | Content rendered at the trailing edge of the input (icon, button, etc.) |
| `id` | `string` | auto | Custom input ID; auto-generated with `useId()` if omitted |
| `type` | `string` | `'text'` | Native input type (`email`, `password`, `number`, …) |
| `disabled` | `boolean` | — | Disables the input |
| `readOnly` | `boolean` | — | Makes the input read-only |
| `className` | `string` | — | CSS class for the outermost wrapper |
| `labelClassName` | `string` | — | CSS class for the `<label>` element |
| `containerClassName` | `string` | — | CSS class for the input + adornment container |
| `inputFieldClassName` | `string` | — | CSS class applied directly to `<input>` |
| `endAdornmentClassName` | `string` | — | CSS class for the adornment wrapper |
| `...rest` | `InputHTMLAttributes` | — | Any standard input attribute (`placeholder`, `pattern`, `onChange`, …) |

## Accessibility

- `aria-invalid` is set when `error` is provided.
- `aria-describedby` links the input to the helper/error message.
- `aria-errormessage` is set when `error` is non-empty.
- `aria-busy` is set when `loading` is true.
- Error messages use `role="alert"` + `aria-live="assertive"`; helper text uses `aria-live="polite"`.

## Usage

### Basic

```tsx
<Input
  label="Email"
  placeholder="you@example.com"
  onChange={(e) => setEmail(e.target.value)}
/>
```

### With helper text

```tsx
<Input
  label="Username"
  helperText="Must be 3–20 characters"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
```

### With error

```tsx
<Input
  label="Email"
  value={email}
  error="Enter a valid email address"
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Required field

```tsx
<Input label="Full name" required value={name} onChange={(e) => setName(e.target.value)} />
```

### End adornment (icon button)

```tsx
<Input
  label="Search"
  endAdornment={<button type="button" aria-label="Clear"><XIcon /></button>}
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

### Loading state

```tsx
<Input label="Verifying…" loading value={value} onChange={() => {}} />
```
