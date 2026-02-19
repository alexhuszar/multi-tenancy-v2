import type { Config } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');
const { tokens, cssVars, darkCssVars } = require('./tokens');

const { core } = tokens;

export default {
  darkMode: 'class',

  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
  ],

  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',

      gray: core.colors.gray,
      blue: core.colors.blue,
      green: core.colors.green,
      red: core.colors.red,
      yellow: core.colors.yellow,

      primary: {
        ...Object.fromEntries(
          Object.entries(core.colors.primary ?? core.colors.blue),
        ),
        DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
        foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
      },
      secondary: {
        ...Object.fromEntries(
          Object.entries(core.colors.secondary ?? core.colors.gray),
        ),
        DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
        foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
        foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
        foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
      },
      success: {
        DEFAULT: 'hsl(var(--success) / <alpha-value>)',
        foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
      },
      warning: {
        DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
        foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
      },
      background: 'hsl(var(--background) / <alpha-value>)',
      foreground: 'hsl(var(--foreground) / <alpha-value>)',
      card: {
        DEFAULT: 'hsl(var(--card) / <alpha-value>)',
        foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
        foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
        foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
      },
      border: 'hsl(var(--border) / <alpha-value>)',
      input: 'hsl(var(--input) / <alpha-value>)',
      ring: 'hsl(var(--ring) / <alpha-value>)',
    },

    spacing: core.spacing,
    fontSize: core.fontSizes,
    fontWeight: Object.fromEntries(
      Object.entries(core.fontWeights).map(([k, v]) => [k, String(v)]),
    ),
    lineHeight: Object.fromEntries(
      Object.entries(core.lineHeights).map(([k, v]) => [k, String(v)]),
    ),
    borderRadius: core.radii,
    boxShadow: core.shadows,
  },

  plugins: [
    require('tailwindcss-animate'),

    /* Injects :root and .dark CSS variable blocks from precomputed token maps */
    plugin(({ addBase }) => {
      addBase({ ':root': cssVars, '.dark': darkCssVars });
    }),
  ],
} satisfies Config;
