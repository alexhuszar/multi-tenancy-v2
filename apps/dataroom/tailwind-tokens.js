// @ts-check
// Plain CJS file — no TypeScript, no imports from TS source files.
// Required by tailwind.config.ts at build/CSS-processing time, where the
// PostCSS evaluation context cannot resolve .ts extensions via require().

// ---------------------------------------------------------------------------
// Color palettes (from libs/ui/src/tokens/colors.ts)
// ---------------------------------------------------------------------------
const gray = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
};

const blue = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
};

const green = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
};

const red = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
};

const yellow = {
  50: '#fefce8',
  100: '#fef9c3',
  200: '#fef08a',
  300: '#fde047',
  400: '#facc15',
  500: '#eab308',
  600: '#ca8a04',
  700: '#a16207',
  800: '#854d0e',
  900: '#713f12',
};

// Custom primary palette (apps/dataroom/tokens.ts)
const primary = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
};

// ---------------------------------------------------------------------------
// Spacing (from libs/ui/src/tokens/spacing.ts)
// ---------------------------------------------------------------------------
const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
};

// ---------------------------------------------------------------------------
// Typography (from libs/ui/src/tokens/typography.ts)
// ---------------------------------------------------------------------------
const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
};

const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const lineHeights = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
};

// ---------------------------------------------------------------------------
// Custom radii & shadows (from apps/dataroom/tokens.ts overrides)
// ---------------------------------------------------------------------------
const radii = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
};

const shadows = {
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.08)',
  md: '0 4px 12px -1px rgb(0 0 0 / 0.12)',
  lg: '0 10px 20px -3px rgb(0 0 0 / 0.15)',
  xl: '0 20px 30px -5px rgb(0 0 0 / 0.18)',
};

// ---------------------------------------------------------------------------
// Semantic tokens (subset of createSemanticTokens from defaults.ts)
// ---------------------------------------------------------------------------
function createSemanticColors(colors) {
  const primaryColor = colors.primary;
  const secondaryColor = colors.gray;
  return {
    colors: {
      background: {
        default: '#ffffff',
        subtle: colors.gray[50],
        muted: colors.gray[100],
        inverse: colors.gray[900],
      },
      foreground: {
        default: colors.gray[900],
        muted: colors.gray[600],
        subtle: colors.gray[400],
        inverse: '#ffffff',
      },
      primary: {
        default: primaryColor[600],
        hover: primaryColor[700],
        active: primaryColor[800],
        subtle: primaryColor[50],
        foreground: '#ffffff',
      },
      secondary: {
        default: secondaryColor[200],
        hover: secondaryColor[300],
        active: secondaryColor[400],
        subtle: secondaryColor[50],
        foreground: secondaryColor[900],
      },
      success: {
        default: colors.green[600],
        hover: colors.green[700],
        subtle: colors.green[50],
        foreground: '#ffffff',
      },
      warning: {
        default: colors.yellow[500],
        hover: colors.yellow[600],
        subtle: colors.yellow[50],
        foreground: colors.gray[900],
      },
      error: {
        default: colors.red[600],
        hover: colors.red[700],
        subtle: colors.red[50],
        foreground: '#ffffff',
      },
      border: {
        default: colors.gray[200],
        subtle: colors.gray[100],
        strong: colors.gray[300],
      },
      focus: {
        ring: primaryColor[500],
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Core token object
// ---------------------------------------------------------------------------
const core = {
  colors: { gray, blue, green, red, yellow, primary, secondary: gray },
  spacing,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  shadows,
};

const semantic = createSemanticColors(core.colors);

// ---------------------------------------------------------------------------
// CSS variable builders (from apps/dataroom/tokens.ts)
// ---------------------------------------------------------------------------
function hexToHSL(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  let sat = 0;
  const lig = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    sat = lig > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hue = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: hue = ((b - r) / d + 2) / 6; break;
      case b: hue = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(hue * 360)} ${Math.round(sat * 100)}% ${Math.round(lig * 100)}%`;
}

function buildCSSVars(semanticColors, coreTokens) {
  return {
    '--background': hexToHSL(semanticColors.colors.background.default),
    '--foreground': hexToHSL(semanticColors.colors.foreground.default),
    '--card': hexToHSL(semanticColors.colors.background.default),
    '--card-foreground': hexToHSL(semanticColors.colors.foreground.default),
    '--popover': hexToHSL(semanticColors.colors.background.default),
    '--popover-foreground': hexToHSL(semanticColors.colors.foreground.default),
    '--primary': hexToHSL(semanticColors.colors.primary.default),
    '--primary-foreground': hexToHSL(semanticColors.colors.primary.foreground),
    '--secondary': hexToHSL(semanticColors.colors.secondary.default),
    '--secondary-foreground': hexToHSL(semanticColors.colors.secondary.foreground),
    '--muted': hexToHSL(semanticColors.colors.background.muted),
    '--muted-foreground': hexToHSL(semanticColors.colors.foreground.muted),
    '--accent': hexToHSL(semanticColors.colors.secondary.default),
    '--accent-foreground': hexToHSL(semanticColors.colors.secondary.foreground),
    '--destructive': hexToHSL(semanticColors.colors.error.default),
    '--destructive-foreground': hexToHSL(semanticColors.colors.error.foreground),
    '--success': hexToHSL(semanticColors.colors.success.default),
    '--success-foreground': hexToHSL(semanticColors.colors.success.foreground),
    '--warning': hexToHSL(semanticColors.colors.warning.default),
    '--warning-foreground': hexToHSL(semanticColors.colors.warning.foreground),
    '--border': hexToHSL(semanticColors.colors.border.default),
    '--input': hexToHSL(semanticColors.colors.border.default),
    '--ring': hexToHSL(semanticColors.colors.focus.ring),
    '--radius': coreTokens.radii.lg,
  };
}

function buildDarkCSSVars(coreTokens) {
  const primaryColor = coreTokens.colors.primary;
  return {
    '--background': hexToHSL(coreTokens.colors.gray[900]),
    '--foreground': hexToHSL(coreTokens.colors.gray[50]),
    '--card': hexToHSL(coreTokens.colors.gray[900]),
    '--card-foreground': hexToHSL(coreTokens.colors.gray[50]),
    '--popover': hexToHSL(coreTokens.colors.gray[900]),
    '--popover-foreground': hexToHSL(coreTokens.colors.gray[50]),
    '--primary': hexToHSL(primaryColor[400]),
    '--primary-foreground': hexToHSL('#ffffff'),
    '--secondary': hexToHSL(coreTokens.colors.gray[700]),
    '--secondary-foreground': hexToHSL(coreTokens.colors.gray[50]),
    '--muted': hexToHSL(coreTokens.colors.gray[800]),
    '--muted-foreground': hexToHSL(coreTokens.colors.gray[400]),
    '--accent': hexToHSL(coreTokens.colors.gray[800]),
    '--accent-foreground': hexToHSL(coreTokens.colors.gray[50]),
    '--destructive': hexToHSL(coreTokens.colors.red[400]),
    '--destructive-foreground': hexToHSL('#ffffff'),
    '--success': hexToHSL(coreTokens.colors.green[400]),
    '--success-foreground': hexToHSL('#ffffff'),
    '--warning': hexToHSL(coreTokens.colors.yellow[400]),
    '--warning-foreground': hexToHSL(coreTokens.colors.gray[900]),
    '--border': hexToHSL(coreTokens.colors.gray[700]),
    '--input': hexToHSL(coreTokens.colors.gray[700]),
    '--ring': hexToHSL(primaryColor[400]),
    '--radius': coreTokens.radii.lg,
  };
}

// ---------------------------------------------------------------------------
// Exports — mirrors what tokens.ts exports for use in tailwind.config.ts
// ---------------------------------------------------------------------------
const tokens = { core, semantic };
const cssVars = buildCSSVars(semantic, core);
const darkCssVars = buildDarkCSSVars(core);

module.exports = { tokens, cssVars, darkCssVars };
