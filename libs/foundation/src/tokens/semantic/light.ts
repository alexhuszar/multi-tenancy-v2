import type { SemanticTokens } from '@multi-tenancy/types';
import { baseColors } from '../base/colors';

export const lightSemanticTokens: SemanticTokens = {
  background: {
    primary: baseColors.neutral[50],
    secondary: baseColors.neutral[100],
    tertiary: baseColors.neutral[200],
    inverse: baseColors.neutral[900],
  },
  foreground: {
    primary: baseColors.neutral[900],
    secondary: baseColors.neutral[700],
    muted: baseColors.neutral[500],
    inverse: baseColors.neutral[50],
  },
  border: {
    default: baseColors.neutral[200],
    muted: baseColors.neutral[100],
    focus: baseColors.primary[500],
  },
  interactive: {
    default: baseColors.primary[500],
    hover: baseColors.primary[600],
    active: baseColors.primary[700],
    disabled: baseColors.neutral[300],
  },
};
