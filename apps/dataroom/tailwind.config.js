// const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// ../libs/buttons/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// !../libs/buttons/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    '../../libs/ui/src/**/*.{ts,tsx,js,jsx,html}',
    //     ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      colors: {
        // Map Tailwind colors to CSS variables
        primary: {
          50: 'var(--colors-primary-50)',
          100: 'var(--colors-primary-100)',
          200: 'var(--colors-primary-200)',
          300: 'var(--colors-primary-300)',
          400: 'var(--colors-primary-400)',
          500: 'var(--colors-primary-500)',
          600: 'var(--colors-primary-600)',
          700: 'var(--colors-primary-700)',
          800: 'var(--colors-primary-800)',
          900: 'var(--colors-primary-900)',
          950: 'var(--colors-primary-950)',
        },
        secondary: {
          50: 'var(--colors-secondary-50)',
          100: 'var(--colors-secondary-100)',
          200: 'var(--colors-secondary-200)',
          300: 'var(--colors-secondary-300)',
          400: 'var(--colors-secondary-400)',
          500: 'var(--colors-secondary-500)',
          600: 'var(--colors-secondary-600)',
          700: 'var(--colors-secondary-700)',
          800: 'var(--colors-secondary-800)',
          900: 'var(--colors-secondary-900)',
          950: 'var(--colors-secondary-950)',
        },
        // Semantic colors
        background: {
          primary: 'var(--semantic-background-primary)',
          secondary: 'var(--semantic-background-secondary)',
          tertiary: 'var(--semantic-background-tertiary)',
          inverse: 'var(--semantic-background-inverse)',
        },
        foreground: {
          primary: 'var(--semantic-foreground-primary)',
          secondary: 'var(--semantic-foreground-secondary)',
          muted: 'var(--semantic-foreground-muted)',
          inverse: 'var(--semantic-foreground-inverse)',
        },
        border: {
          DEFAULT: 'var(--semantic-border-default)',
          muted: 'var(--semantic-border-muted)',
          focus: 'var(--semantic-border-focus)',
        },
        interactive: {
          DEFAULT: 'var(--semantic-interactive-default)',
          hover: 'var(--semantic-interactive-hover)',
          active: 'var(--semantic-interactive-active)',
          disabled: 'var(--semantic-interactive-disabled)',
        },
      },
      fontFamily: {
        sans: 'var(--typography-fontFamily-sans)',
        serif: 'var(--typography-fontFamily-serif)',
        mono: 'var(--typography-fontFamily-mono)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        md: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
        xl: 'var(--border-radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
};
