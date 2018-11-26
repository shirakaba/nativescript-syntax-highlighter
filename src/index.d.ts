export declare class Syntaxhighlighter {
    private _highlightr;
    constructor();
    setThemeTo(theme: string): SyntaxHighlighter;
    highlightCodeAs(code: string, lang: string): NSAttributedString;
}
