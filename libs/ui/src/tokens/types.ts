
export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type SpacingKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;


export type FontSizeKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export type FontWeightKey = 'normal' | 'medium' | 'semibold' | 'bold';


export type LineHeightKey = 'tight' | 'normal' | 'relaxed';

export type RadiusKey = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ShadowKey = 'sm' | 'md' | 'lg' | 'xl';

export interface CoreTokens {
  colors: {
    gray: ColorScale;
    blue: ColorScale;
    green: ColorScale;
    red: ColorScale;
    yellow: ColorScale;
  };
  spacing: Record<SpacingKey, string>;
  fontSizes: Record<FontSizeKey, string>;
  fontWeights: Record<FontWeightKey, number>;
  lineHeights: Record<LineHeightKey, number>;
  radii: Record<RadiusKey, string>;
  shadows: Record<ShadowKey, string>;
}

export interface SemanticTokens {
  colors: {
    background: {
      default: string;
      subtle: string;
      muted: string;
      inverse: string;
    };
    foreground: {
      default: string;
      muted: string;
      subtle: string;
      inverse: string;
    };
    primary: {
      default: string;
      hover: string;
      active: string;
      subtle: string;
      foreground: string;
    };
    secondary: {
      default: string;
      hover: string;
      active: string;
      subtle: string;
      foreground: string;
    };
    success: {
      default: string;
      hover: string;
      subtle: string;
      foreground: string;
    };
    warning: {
      default: string;
      hover: string;
      subtle: string;
      foreground: string;
    };
    error: {
      default: string;
      hover: string;
      subtle: string;
      foreground: string;
    };
    border: {
      default: string;
      subtle: string;
      strong: string;
    };
    focus: {
      ring: string;
    };
  };
  spacing: {
    component: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    layout: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  typography: {
    body: {
      size: string;
      lineHeight: number;
      weight: number;
    };
    heading: {
      h1: { size: string; lineHeight: number; weight: number };
      h2: { size: string; lineHeight: number; weight: number };
      h3: { size: string; lineHeight: number; weight: number };
    };
    label: {
      size: string;
      lineHeight: number;
      weight: number;
    };
    caption: {
      size: string;
      lineHeight: number;
      weight: number;
    };
  };
  radii: {
    component: {
      sm: string;
      md: string;
      lg: string;
    };
    button: string;
    input: string;
    card: string;
    modal: string;
  };
}

export interface ComponentTokens {
  button: {
    borderRadius: string;
    fontWeight: number;
    variants: {
      primary: { bg: string; text: string; hover: string; active: string };
      secondary: { bg: string; text: string; hover: string; active: string };
      outline: { bg: string; text: string; border: string; hover: string };
      ghost: { bg: string; text: string; hover: string };
    };
    sizes: {
      sm: { height: string; paddingX: string; fontSize: string };
      md: { height: string; paddingX: string; fontSize: string };
      lg: { height: string; paddingX: string; fontSize: string };
    };
  };
  dialog: {
    overlay: { bg: string };
    content: {
      bg: string;
      borderRadius: string;
      shadow: string;
      padding: string;
    };
  };
  toast: {
    borderRadius: string;
    padding: string;
    shadow: string;
    variants: {
      default: { bg: string; border: string; text: string };
      success: { bg: string; border: string; text: string };
      error: { bg: string; border: string; text: string };
      warning: { bg: string; border: string; text: string };
    };
  };
  input: {
    borderRadius: string;
    borderColor: string;
    focusBorderColor: string;
    bg: string;
    sizes: {
      sm: { height: string; paddingX: string; fontSize: string };
      md: { height: string; paddingX: string; fontSize: string };
      lg: { height: string; paddingX: string; fontSize: string };
    };
  };
}

export interface DesignTokens {
  core: CoreTokens;
  semantic: SemanticTokens;
  components: ComponentTokens;
}
