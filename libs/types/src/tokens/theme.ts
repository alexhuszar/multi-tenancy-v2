import { DesignTokens, PartialDesignTokens, DeepPartial } from './index';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface SemanticTokens {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  foreground: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  border: {
    default: string;
    muted: string;
    focus: string;
  };
  interactive: {
    default: string;
    hover: string;
    active: string;
    disabled: string;
  };
}

export interface Theme {
  name: string;
  mode: ThemeMode;
  tokens: DesignTokens;
  semantic: SemanticTokens;
}

export interface TenantThemeConfig {
  tenantId: string;
  tokenOverrides?: PartialDesignTokens;
  semanticOverrides?: DeepPartial<SemanticTokens>;
  customProperties?: Record<string, string>;
}
