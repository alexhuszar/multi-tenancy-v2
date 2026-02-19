import { useState } from 'react';
import { Input } from '../..';

export const PasswordField = ({
  name,
  showToggle = true,
  showText = 'Show',
  hideText = 'Hide',
  label = 'Password',
  ...otherProps
}: {
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
    <Input
      {...otherProps}
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
  );
};
