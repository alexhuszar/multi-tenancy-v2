# Form System

Composable form primitives built on top of **react-hook-form**. Provides accessible labels, controls, and error messages with automatic ID linking and `aria-*` wiring.

## Import

```tsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  PasswordField,
  useFormField,
} from '@multi-tenancy/ui';
```

---

## Components

### `Form`

Re-export of react-hook-form's `FormProvider`. Wrap your form with it to share the form instance with all child components.

```tsx
const form = useForm<MySchema>();

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>…</form>
</Form>
```

---

### `FormField`

Wraps react-hook-form's `Controller` and provides the field name to the context. Accepts all `ControllerProps` including `rules`, `defaultValue`, and `render`.

```tsx
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <input type="email" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

---

### `FormItem`

Container div that generates a unique ID shared by `FormLabel`, `FormControl`, and `FormMessage`. Must wrap a complete field (label + control + message).

| Prop | Type | Description |
|------|------|-------------|
| `...rest` | `HTMLAttributes<HTMLDivElement>` | Standard div props including `className` |

---

### `FormLabel`

Label that auto-connects to the field control via `formItemId`. Applies an optional error class when the field is invalid.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `errorClassName` | `string` | — | CSS class applied when the field has an error |
| `className` | `string` | — | Base CSS class |
| `...rest` | `LabelHTMLAttributes` | — | Standard label props |

---

### `FormControl`

Radix `Slot` wrapper that merges accessibility attributes into the child control element without adding any DOM element.

Sets on the child:
- `id` → `formItemId`
- `aria-invalid` → `true` when there is an error
- `aria-describedby` → links to the description and/or error message

```tsx
<FormControl>
  <Input placeholder="your@email.com" {...field} />
</FormControl>
```

---

### `FormMessage`

Renders the field's error message (from react-hook-form) or custom children. Returns `null` when there is no error and no children.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Fallback content when no error exists |
| `...rest` | `HTMLAttributes<HTMLParagraphElement>` | Standard `<p>` props |

---

### `PasswordField`

Pre-built password input with show/hide toggle. Built on the `Input` primitive.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `'password' \| 'confirmPassword'` | — | **Required.** Field name |
| `label` | `string` | `'Password'` | Label text |
| `showToggle` | `boolean` | `true` | Show the visibility toggle button |
| `showText` | `string` | `'Show'` | Toggle button label when password is hidden |
| `hideText` | `string` | `'Hide'` | Toggle button label when password is visible |
| `...rest` | `InputProps` | — | All `Input` props except `type`, `endAdornment`, and `label` |

Toggle button has `aria-pressed` reflecting the current visibility state.

---

### `useFormField()`

Hook that reads the current field state and ID values from context. Must be called inside `FormField` → `FormItem`.

**Returns:**

| Key | Type | Description |
|-----|------|-------------|
| `name` | `string` | Field name |
| `id` | `string` | Item ID |
| `formItemId` | `string` | `${id}-control` — connect to `<input id>` |
| `formDescriptionId` | `string` | `${id}-description` |
| `formMessageId` | `string` | `${id}-message` |
| `error` | `FieldError \| undefined` | Current validation error |
| `...fieldState` | `ControllerFieldState` | `invalid`, `isDirty`, `isTouched` |

---

## Full example

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  PasswordField,
} from '@multi-tenancy/ui';
import { Input } from '@multi-tenancy/ui';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => console.log(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel errorClassName="label--error">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password — pre-built field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordField name="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button type="submit">Sign in</button>
      </form>
    </Form>
  );
}
```

## Confirm password example

```tsx
<FormField
  control={form.control}
  name="confirmPassword"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <PasswordField
          name="confirmPassword"
          label="Confirm password"
          showText="Reveal"
          hideText="Conceal"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```
