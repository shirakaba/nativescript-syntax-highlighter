// https://github.com/TeamMaestro/nativescript-pspdfkit/tree/master/src
// export * from './syntaxhighlighter.ios';
// export { Syntaxhighlighter } from './syntaxhighlighter.ios';

import { Property } from 'tns-core-modules/ui/core/properties';
import { View } from 'tns-core-modules/ui/core/view';

export declare class SyntaxHighlighter {
    private readonly _highlightr;
    constructor();
    setThemeTo(name: string): SyntaxHighlighter;
    highlightAsFastRender(code: string, languageName?: string | null, fastRender?: boolean): NSAttributedString;
}

export declare class CodeAttributedStringWrapper {
    readonly _codeAttributedString: CodeAttributedString;
    constructor(highlightr?: Highlightr);
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


export declare const codeProperty: any;
export declare const languageNameProperty: Property<SyntaxHighlighterView, string>;
export declare class SyntaxHighlighterView extends View {
    private _textView;
    private _highlightr;
    private _codeAttributedString;
    code: string;
    languageName: string | null;
    private _layoutManager;
    private _textContainer;
    createNativeView(): Object;
    initNativeView(): void;
    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void;
}
