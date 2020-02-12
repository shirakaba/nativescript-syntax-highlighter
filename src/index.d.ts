// https://github.com/TeamMaestro/nativescript-pspdfkit/tree/master/src
// export * from './syntaxhighlighter.ios';
import { SyntaxHighlighterViewBase, SyntaxHighlighterTheme } from './syntax-highlighter.base';

import { Property } from 'tns-core-modules/ui/core/properties';
import { View } from 'tns-core-modules/ui/core/view';

// export interface HighlightDelegate extends NSObjectProtocol {
//     shouldHighlightRange?(range: NSRange): boolean;
//     didHighlightRange?(range: NSRange): void;
// }

// export declare var HighlightDelegate: {
// 	prototype: HighlightDelegate;
// };


export declare const codeProperty: Property<SyntaxHighlighterViewBase, string>;
export declare const themeProperty: Property<SyntaxHighlighterViewBase, SyntaxHighlighterTheme>;
export declare const languageNameProperty: Property<SyntaxHighlighterView, string|null>;
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
