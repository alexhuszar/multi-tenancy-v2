import type { FeatureFlag } from '@multi-tenancy/types';
import { FEATURE_FLAGS } from '@multi-tenancy/types';

export const defaultFeatures: FeatureFlag[] = [
  FEATURE_FLAGS.DARK_MODE,
  FEATURE_FLAGS.CUSTOM_BRANDING,
];
