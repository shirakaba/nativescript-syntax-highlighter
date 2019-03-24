import { layout } from 'tns-core-modules/ui/core/view';
import * as base from './syntax-highlighter.base';
import { SyntaxHighlighterTheme, SyntaxHighlighterViewBase } from './syntax-highlighter.base';

global.moduleMerge(base, exports);

export class SyntaxHighlighterView extends SyntaxHighlighterViewBase {
    private _textView: UITextView;
    private _highlightr: Highlightr;
    private _codeAttributedString: CodeAttributedString;
    public code: string;
    public languageName: string | null;
    private _layoutManager: NSLayoutManager;
    private _textContainer: NSTextContainer;
    public theme: SyntaxHighlighterTheme;

    createNativeView(): Object {
        this._codeAttributedString = CodeAttributedString.new();
        const nativeView = UIView.new();
        this._layoutManager = NSLayoutManager.new();
        this._codeAttributedString.addLayoutManager(this._layoutManager);
        this._textContainer = NSTextContainer.new();
        this._layoutManager.addTextContainer(this._textContainer);
        this._textView = UITextView.alloc().initWithFrameTextContainer(CGRectZero, this._textContainer);
        this._textView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
        this._textView.autocorrectionType = UITextAutocorrectionType.No;
        this._textView.autocapitalizationType = UITextAutocapitalizationType.None;
        this._textView.textColor = UIColor.alloc().initWithWhiteAlpha(0.8, 1.0);
        nativeView.addSubview(this._textView);
        this._highlightr = this._codeAttributedString.highlightr;
        return nativeView;
    }

    [base.codeProperty.setNative](code: string) {
        this._textView.attributedText = this._highlightr.highlightAsFastRender(code, this.languageName, false);
    }

    [base.languageNameProperty.setNative](lang: string | null) {
        this._codeAttributedString.language = lang;
    }

    [base.themeProperty.setNative](theme: any) {
        this._highlightr.setThemeTo(theme);
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
