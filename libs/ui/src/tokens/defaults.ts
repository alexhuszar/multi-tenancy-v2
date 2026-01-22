import type {
  CoreTokens,
  SemanticTokens,
  ComponentTokens,
  DesignTokens,
  RadiusKey,
  ShadowKey,
} from './types';
import { colors } from './colors';
import { spacing } from './spacing';
import { fontSizes, fontWeights, lineHeights } from './typography';

const radii: Record<RadiusKey, string> = {
  none: '0',
  sm: '0.125rem', // 2px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  full: '9999px',
};

const shadows: Record<ShadowKey, string> = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

export const defaultCoreTokens: CoreTokens = {
  colors,
  spacing,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  shadows,
};

export function createSemanticTokens(core: CoreTokens): SemanticTokens {
  return {
    colors: {
      background: {
        default: '#ffffff',
        subtle: core.colors.gray[50],
        muted: core.colors.gray[100],
        inverse: core.colors.gray[900],
      },
      foreground: {
        default: core.colors.gray[900],
        muted: core.colors.gray[600],
        subtle: core.colors.gray[400],
        inverse: '#ffffff',
      },
      primary: {
        default: core.colors.blue[600],
        hover: core.colors.blue[700],
        active: core.colors.blue[800],
        subtle: core.colors.blue[50],
        foreground: '#ffffff',
      },
      secondary: {
        default: core.colors.gray[200],
        hover: core.colors.gray[300],
        active: core.colors.gray[400],
        subtle: core.colors.gray[50],
        foreground: core.colors.gray[900],
      },
      success: {
        default: core.colors.green[600],
        hover: core.colors.green[700],
        subtle: core.colors.green[50],
        foreground: '#ffffff',
      },
      warning: {
        default: core.colors.yellow[500],
        hover: core.colors.yellow[600],
        subtle: core.colors.yellow[50],
        foreground: core.colors.gray[900],
      },
      error: {
        default: core.colors.red[600],
        hover: core.colors.red[700],
        subtle: core.colors.red[50],
        foreground: '#ffffff',
      },
      border: {
        default: core.colors.gray[200],
        subtle: core.colors.gray[100],
        strong: core.colors.gray[300],
      },
      focus: {
        ring: core.colors.blue[500],
      },
    },
    spacing: {
      component: {
        xs: core.spacing[1],
        sm: core.spacing[2],
        md: core.spacing[3],
        lg: core.spacing[4],
        xl: core.spacing[6],
      },
      layout: {
        xs: core.spacing[4],
        sm: core.spacing[6],
        md: core.spacing[8],
        lg: core.spacing[12],
        xl: core.spacing[16],
      },
    },
    typography: {
      body: {
        size: core.fontSizes.base,
        lineHeight: core.lineHeights.normal,
        weight: core.fontWeights.normal,
      },
      heading: {
        h1: {
          size: core.fontSizes['4xl'],
          lineHeight: core.lineHeights.tight,
          weight: core.fontWeights.bold,
        },
        h2: {
          size: core.fontSizes['3xl'],
          lineHeight: core.lineHeights.tight,
          weight: core.fontWeights.semibold,
        },
        h3: {
          size: core.fontSizes['2xl'],
          lineHeight: core.lineHeights.tight,
          weight: core.fontWeights.semibold,
        },
      },
      label: {
        size: core.fontSizes.sm,
        lineHeight: core.lineHeights.normal,
        weight: core.fontWeights.medium,
      },
      caption: {
        size: core.fontSizes.xs,
        lineHeight: core.lineHeights.normal,
        weight: core.fontWeights.normal,
      },
    },
    radii: {
      component: {
        sm: core.radii.sm,
        md: core.radii.md,
        lg: core.radii.lg,
      },
      button: core.radii.md,
      input: core.radii.md,
      card: core.radii.lg,
      modal: core.radii.xl,
    },
  };
}

export function createComponentTokens(
  core: CoreTokens,
  semantic: SemanticTokens,
): ComponentTokens {
  return {
    button: {
      borderRadius: semantic.radii.button,
      fontWeight: core.fontWeights.medium,
      variants: {
        primary: {
          bg: semantic.colors.primary.default,
          text: semantic.colors.primary.foreground,
          hover: semantic.colors.primary.hover,
          active: semantic.colors.primary.active,
        },
        secondary: {
          bg: semantic.colors.secondary.default,
          text: semantic.colors.secondary.foreground,
          hover: semantic.colors.secondary.hover,
          active: semantic.colors.secondary.active,
        },
        outline: {
          bg: 'transparent',
          text: semantic.colors.foreground.default,
          border: semantic.colors.border.default,
          hover: semantic.colors.background.subtle,
        },
        ghost: {
          bg: 'transparent',
          text: semantic.colors.foreground.default,
          hover: semantic.colors.background.subtle,
        },
      },
      sizes: {
        sm: {
          height: '2rem',
          paddingX: core.spacing[3],
          fontSize: core.fontSizes.sm,
        },
        md: {
          height: '2.5rem',
          paddingX: core.spacing[4],
          fontSize: core.fontSizes.base,
        },
        lg: {
          height: '3rem',
          paddingX: core.spacing[6],
          fontSize: core.fontSizes.lg,
        },
      },
    },
    dialog: {
      overlay: {
        bg: 'rgba(0, 0, 0, 0.5)',
      },
      content: {
        bg: semantic.colors.background.default,
        borderRadius: semantic.radii.modal,
        shadow: core.shadows.xl,
        padding: core.spacing[6],
      },
    },
    toast: {
      borderRadius: semantic.radii.component.md,
      padding: core.spacing[4],
      shadow: core.shadows.lg,
      variants: {
        default: {
          bg: semantic.colors.background.default,
          border: semantic.colors.border.default,
          text: semantic.colors.foreground.default,
        },
        success: {
          bg: semantic.colors.success.subtle,
          border: semantic.colors.success.default,
          text: semantic.colors.success.default,
        },
        error: {
          bg: semantic.colors.error.subtle,
          border: semantic.colors.error.default,
          text: semantic.colors.error.default,
        },
        warning: {
          bg: semantic.colors.warning.subtle,
          border: semantic.colors.warning.default,
          text: semantic.colors.warning.default,
        },
      },
    },
    input: {
      borderRadius: semantic.radii.input,
      borderColor: semantic.colors.border.default,
      focusBorderColor: semantic.colors.primary.default,
      bg: semantic.colors.background.default,
      sizes: {
        sm: {
          height: '2rem',
          paddingX: core.spacing[2],
          fontSize: core.fontSizes.sm,
        },
        md: {
          height: '2.5rem',
          paddingX: core.spacing[3],
          fontSize: core.fontSizes.base,
        },
        lg: {
          height: '3rem',
          paddingX: core.spacing[4],
          fontSize: core.fontSizes.lg,
        },
      },
    },
  };
}

export function createDesignTokens(
  customCore?: Partial<CoreTokens>,
): DesignTokens {
  const core: CoreTokens = {
    ...defaultCoreTokens,
    ...customCore,
    colors: {
      ...defaultCoreTokens.colors,
      ...customCore?.colors,
    },
  };

  const semantic = createSemanticTokens(core);
  const components = createComponentTokens(core, semantic);

  return { core, semantic, components };
}

/**
 * Default Design Tokens instance
 */
export const defaultDesignTokens = createDesignTokens();
