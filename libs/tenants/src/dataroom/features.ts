import type { FeatureFlag } from '@multi-tenancy/types';
import { FEATURE_FLAGS } from '@multi-tenancy/types';

export const dataroomFeatures: FeatureFlag[] = [
  FEATURE_FLAGS.DARK_MODE,
  FEATURE_FLAGS.CUSTOM_BRANDING,
  FEATURE_FLAGS.ADVANCED_SEARCH,
  FEATURE_FLAGS.BULK_OPERATIONS,
  FEATURE_FLAGS.AUDIT_LOGS,
];
