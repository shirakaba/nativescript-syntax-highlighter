export declare class Syntaxhighlighter {
    private _highlightr;
    constructor();
    setThemeTo(theme: string): Syntaxhighlighter;
    highlightCodeAs(code: string, lang: string): NSAttributedString;
}
