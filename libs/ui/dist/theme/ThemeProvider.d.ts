import { ReactNode } from 'react';
import type { StyleAdapter } from '../adapters/types';
import type { DesignTokens } from '../tokens/types';
export interface ThemeProviderProps {
    adapter: StyleAdapter;
    tokens?: DesignTokens;
    children: ReactNode;
}
export declare const ThemeProvider: {
    ({ adapter, tokens, children, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=ThemeProvider.d.ts.map