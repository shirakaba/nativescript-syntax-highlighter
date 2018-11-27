// https://github.com/TeamMaestro/nativescript-pspdfkit/tree/master/src
// export * from './syntaxhighlighter.ios';
// export { Syntaxhighlighter } from './syntaxhighlighter.ios';

export declare class SyntaxHighlighter {
    private readonly _highlightr;
    constructor();
    setThemeTo(name: string): SyntaxHighlighter;
    highlightAsFastRender(code: string, languageName?: string|null, fastRender?: boolean): NSAttributedString;
}

export declare class CodeAttributedStringWrapper {
    private readonly _highlightr: Highlightr;
    readonly _codeAttributedString: CodeAttributedString;
    constructor(_highlightr?: Highlightr);
    addLayoutManager(layoutManager: NSLayoutManager): CodeAttributedStringWrapper;
    setLanguage(language: string | null): CodeAttributedStringWrapper;
    setHighlightDelegate(highlightDelegate: HighlightDelegate | null): CodeAttributedStringWrapper;
    getString(): string;
    highlightRange(range: NSRange): void;
    setupListeners(): void;
}