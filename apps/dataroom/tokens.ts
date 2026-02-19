import { createDesignTokens } from '@multi-tenancy/design-system/tokens';
import type {
  CoreTokens,
  SemanticTokens,
} from '@multi-tenancy/design-system/tokens';

// ─── CSS variable helpers (Tailwind / dataroom-specific) ──────────────────────

function hexToHSL(hex: string): string {
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
      case r:
        hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        hue = ((b - r) / d + 2) / 6;
        break;
      case b:
        hue = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(hue * 360)} ${Math.round(sat * 100)}% ${Math.round(lig * 100)}%`;
}

function buildCSSVars(
  semantic: SemanticTokens,
  core: CoreTokens,
): Record<string, string> {
  return {
    '--background': hexToHSL(semantic.colors.background.default),
    '--foreground': hexToHSL(semantic.colors.foreground.default),
    '--card': hexToHSL(semantic.colors.background.default),
    '--card-foreground': hexToHSL(semantic.colors.foreground.default),
    '--popover': hexToHSL(semantic.colors.background.default),
    '--popover-foreground': hexToHSL(semantic.colors.foreground.default),
    '--primary': hexToHSL(semantic.colors.primary.default),
    '--primary-foreground': hexToHSL(semantic.colors.primary.foreground),
    '--secondary': hexToHSL(semantic.colors.secondary.default),
    '--secondary-foreground': hexToHSL(semantic.colors.secondary.foreground),
    '--muted': hexToHSL(semantic.colors.background.muted),
    '--muted-foreground': hexToHSL(semantic.colors.foreground.muted),
    '--accent': hexToHSL(semantic.colors.secondary.default),
    '--accent-foreground': hexToHSL(semantic.colors.secondary.foreground),
    '--destructive': hexToHSL(semantic.colors.error.default),
    '--destructive-foreground': hexToHSL(semantic.colors.error.foreground),
    '--success': hexToHSL(semantic.colors.success.default),
    '--success-foreground': hexToHSL(semantic.colors.success.foreground),
    '--warning': hexToHSL(semantic.colors.warning.default),
    '--warning-foreground': hexToHSL(semantic.colors.warning.foreground),
    '--border': hexToHSL(semantic.colors.border.default),
    '--input': hexToHSL(semantic.colors.border.default),
    '--ring': hexToHSL(semantic.colors.focus.ring),
    '--radius': core.radii.lg,
  };
}

function buildDarkCSSVars(core: CoreTokens): Record<string, string> {
  const primaryColor = core.colors.primary ?? core.colors.blue;
  const secondaryColor = core.colors.secondary ?? core.colors.gray;
  return {
    '--background': hexToHSL(core.colors.gray[900]),
    '--foreground': hexToHSL(core.colors.gray[50]),
    '--card': hexToHSL(core.colors.gray[900]),
    '--card-foreground': hexToHSL(core.colors.gray[50]),
    '--popover': hexToHSL(core.colors.gray[900]),
    '--popover-foreground': hexToHSL(core.colors.gray[50]),
    '--primary': hexToHSL(primaryColor[400]),
    '--primary-foreground': hexToHSL('#ffffff'),
    '--secondary': hexToHSL(secondaryColor[700]),
    '--secondary-foreground': hexToHSL(core.colors.gray[50]),
    '--muted': hexToHSL(core.colors.gray[800]),
    '--muted-foreground': hexToHSL(core.colors.gray[400]),
    '--accent': hexToHSL(core.colors.gray[800]),
    '--accent-foreground': hexToHSL(core.colors.gray[50]),
    '--destructive': hexToHSL(core.colors.red[400]),
    '--destructive-foreground': hexToHSL('#ffffff'),
    '--success': hexToHSL(core.colors.green[400]),
    '--success-foreground': hexToHSL('#ffffff'),
    '--warning': hexToHSL(core.colors.yellow[400]),
    '--warning-foreground': hexToHSL(core.colors.gray[900]),
    '--border': hexToHSL(core.colors.gray[700]),
    '--input': hexToHSL(core.colors.gray[700]),
    '--ring': hexToHSL(primaryColor[400]),
    '--radius': core.radii.lg,
  };
}

export const tokens = createDesignTokens({
  colors: {
    primary: {
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
    }
  },
  radii: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.08)',
    md: '0 4px 12px -1px rgb(0 0 0 / 0.12)',
    lg: '0 10px 20px -3px rgb(0 0 0 / 0.15)',
    xl: '0 20px 30px -5px rgb(0 0 0 / 0.18)'
  },
});

export const cssVars = buildCSSVars(tokens.semantic, tokens.core);
export const darkCssVars = buildDarkCSSVars(tokens.core);
