import type { SemanticTokens } from '@multi-tenancy/types';
import { baseColors } from '../base/colors';

export const darkSemanticTokens: SemanticTokens = {
  background: {
    primary: baseColors.neutral[900],
    secondary: baseColors.neutral[800],
    tertiary: baseColors.neutral[700],
    inverse: baseColors.neutral[50],
  },
  foreground: {
    primary: baseColors.neutral[50],
    secondary: baseColors.neutral[200],
    muted: baseColors.neutral[400],
    inverse: baseColors.neutral[900],
  },
  border: {
    default: baseColors.neutral[700],
    muted: baseColors.neutral[800],
    focus: baseColors.primary[400],
  },
  interactive: {
    default: baseColors.primary[400],
    hover: baseColors.primary[300],
    active: baseColors.primary[200],
    disabled: baseColors.neutral[600],
  },
};
