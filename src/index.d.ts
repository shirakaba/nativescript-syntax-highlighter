// https://github.com/TeamMaestro/nativescript-pspdfkit/tree/master/src
// export * from './syntaxhighlighter.ios';
// export { Syntaxhighlighter } from './syntaxhighlighter.ios';

export declare class SyntaxHighlighter {
    private readonly _highlightr;
    constructor();
    setThemeTo(name: string): SyntaxHighlighter;
    highlightAsFastRender(code: string, languageName?: string | null, fastRender?: boolean): NSAttributedString;
}

export declare class CodeAttributedStringWrapper {
    readonly _codeAttributedString: CodeAttributedString;
    constructor();
    addLayoutManager(layoutManager: NSLayoutManager): CodeAttributedStringWrapper;
    setLanguage(language: string | null): CodeAttributedStringWrapper;
    setHighlightDelegate(highlightDelegate: HighlightDelegate | null): CodeAttributedStringWrapper;
    getString(): string;
    highlightRange(range: NSRange): void;
    setupListeners(): void;
    setThemeTo(name: string): CodeAttributedStringWrapper;
}

// export interface HighlightDelegate extends NSObjectProtocol {
//     shouldHighlightRange?(range: NSRange): boolean;
//     didHighlightRange?(range: NSRange): void;
// }

// export declare var HighlightDelegate: {
// 	prototype: HighlightDelegate;
// };