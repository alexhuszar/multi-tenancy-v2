import type { CoreTokens, SemanticTokens, ComponentTokens, DesignTokens } from './types';
export declare const defaultCoreTokens: CoreTokens;
export declare function createSemanticTokens(core: CoreTokens): SemanticTokens;
export declare function createComponentTokens(core: CoreTokens, semantic: SemanticTokens): ComponentTokens;
export declare function createDesignTokens(customCore?: Partial<CoreTokens>): DesignTokens;
/**
 * Default Design Tokens instance
 */
export declare const defaultDesignTokens: DesignTokens;
//# sourceMappingURL=defaults.d.ts.map