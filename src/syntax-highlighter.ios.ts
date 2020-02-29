import { layout } from 'tns-core-modules/ui/core/view';
import * as base from './syntax-highlighter.base';
import { TextViewBase as TextViewBaseCommon, maxLinesProperty } from "@nativescript/core/ui/text-view/text-view-common";
import { SyntaxHighlighterTheme, SyntaxHighlighterViewBase, codeProperty, languageNameProperty, themeProperty } from './syntax-highlighter.base';

global.moduleMerge(base, exports);

// export class SyntaxHighlighterView extends SyntaxHighlighterViewBase {
export class SyntaxHighlighterView extends TextViewBaseCommon implements SyntaxHighlighterViewBase {
    private _textView: UITextView;
    private _highlightr: Highlightr;
    private _codeAttributedString: CodeAttributedString; // AKA textStorage
    public code: string;
    public languageName: string | null;
    private _layoutManager: NSLayoutManager;
    private _textContainer: NSTextContainer;
    public theme: SyntaxHighlighterTheme;

    createNativeView(): Object {
        /* 
         * You can initialise a CodeAttributedString and take its internal Highlightr instance, or pass
         * one in explicitly. We'll do the latter, so that it becomes easier to support highlightPath.
         *
         * For now, we use the default highlightPath: bundle.path(forResource: "highlight.min", ofType: "js")
         * */
        this._highlightr = Highlightr.alloc().initWithHighlightPath(null);
        this._codeAttributedString = CodeAttributedString.alloc().initWithHighlightr(this._highlightr);

        /**
         * Apart from defaulting to javascript, the same configuration applied in the example app for Highlightr:
         * 
         * @see: https://github.com/raspu/Highlightr/blob/master/Example/Highlightr/SampleCode.swift#L53
         **/
        this._codeAttributedString.language = "javascript".toLowerCase();
        this._layoutManager = NSLayoutManager.alloc().init();
        this._codeAttributedString.addLayoutManager(this._layoutManager);

        this._textContainer = NSTextContainer.alloc().initWithSize(CGRectZero.size);
        this._layoutManager.addTextContainer(this._textContainer);
    
        this._textView = UITextView.alloc().initWithFrameTextContainer(CGRectZero, this._textContainer);
        this._textView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
        this._textView.autocorrectionType = UITextAutocorrectionType.No;
        this._textView.autocapitalizationType = UITextAutocapitalizationType.None;
        this._textView.textColor = UIColor.alloc().initWithWhiteAlpha(0.8, 1.0);

        /**
         * In the demo, Pojoaque was set as the initial theme, so I'll make that the explicit default.
         * I think I deduced 25/255 gray to be the default BG colour used for Pojoaque in the demo.
         * 
         * @see: https://github.com/raspu/Highlightr/blob/master/Example/Highlightr/SampleCode.swift#L155
         */
        this._codeAttributedString.highlightr.setThemeTo("pojoaque"); // Just making the default explicit.
        this._textView.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(25/255, 25/255, 25/255, 1.0);

        /**
         *
         * @see: https://github.com/NativeScript/NativeScript/blob/864b51232b14a1b6add349f1a19659fa39f9a3a0/nativescript-core/ui/text-view/text-view.ios.ts#L122
         **/
        return this._textView;
    }

    [base.codeProperty.setNative](code: string) {
        this._textView.attributedText = this._highlightr.highlightAsFastRender(code, this.languageName, false);
    }

    [base.languageNameProperty.setNative](lang: string | null) {
        this._codeAttributedString.language = lang;
    }

    [base.themeProperty.setNative](themeName: string) {
        this._highlightr.setThemeTo(themeName);
        const nativeTheme = (this._highlightr as any).theme;
        if (nativeTheme && nativeTheme.themeBackgroundColor) {
            this._textView.backgroundColor = nativeTheme.themeBackgroundColor;
        }
    }

    public onLayout(left: number, top: number, right: number, bottom: number): void {
        super.onLayout(left, top, right, bottom);
        this._textView.frame = this.nativeView.bounds;
        this._textContainer.size.width = this.nativeView.frame.size.width;
        this._textContainer.size.height = this.nativeView.frame.size.height;
        this._textView.setNeedsLayout();
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number) {
        const nativeView = this.nativeView;
        if (nativeView) {
            const width = layout.getMeasureSpecSize(widthMeasureSpec);
            const height = layout.getMeasureSpecSize(heightMeasureSpec);
            this.setMeasuredDimension(width, height);
        }
    }
}

codeProperty.register(SyntaxHighlighterView);

languageNameProperty.register(SyntaxHighlighterView);

themeProperty.register(SyntaxHighlighterView);
