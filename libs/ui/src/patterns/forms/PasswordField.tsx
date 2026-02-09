import { useState } from 'react';
import { FormField } from './FormField';
import { FormItem } from './FormItem';
import { FormControl } from './FormControl';
import { FormMessage, Input } from '../..';

export const PasswordField = ({
  control,
  name,
  showToggle = true,
  showText = 'Show',
  hideText = 'Hide',
  label = 'Password',
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: 'password' | 'confirmPassword';
  label: string;
  showToggle?: boolean;
  showText?: string;
  hideText?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              type={isVisible ? 'text' : 'password'}
              data-password
              endAdornment={
                showToggle ? (
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    aria-pressed={isVisible}
                    data-password-toggle
                  >
                    {isVisible ? hideText : showText}
                  </button>
                ) : undefined
              }
              label={label}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
