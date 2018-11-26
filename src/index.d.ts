// https://github.com/TeamMaestro/nativescript-pspdfkit/tree/master/src
// export * from './syntaxhighlighter.ios';
// export { Syntaxhighlighter } from './syntaxhighlighter.ios';

export declare class Syntaxhighlighter {
    private _highlightr;
    constructor();
    setThemeTo(name: string): Syntaxhighlighter;
    highlightAsFastRender(code: string, languageName?: string|null, fastRender?: boolean): NSAttributedString;
}
