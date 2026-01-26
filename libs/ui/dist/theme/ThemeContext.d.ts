import type { StyleAdapter } from '../adapters/types';
import type { DesignTokens } from '../tokens/types';
export interface ThemeContextValue {
    adapter: StyleAdapter;
    tokens: DesignTokens;
}
export declare const ThemeContext: import("react").Context<ThemeContextValue | null>;
//# sourceMappingURL=ThemeContext.d.ts.map