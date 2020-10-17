import * as base from './syntax-highlighter-view.base';
import { textProperty } from "@nativescript/core/ui/text-base";
import { Property, ScrollEventData, TextView } from '@nativescript/core';
import { SyntaxHighlighterTheme, SyntaxHighlighterViewBase, languageNameProperty, themeProperty } from './syntax-highlighter-view.base';
import { iOSNativeHelper } from "@nativescript/core/utils";

const editableTextBasePrivate: any = require("@nativescript/core/ui/editable-text-base");
const { _updateCharactersInRangeReplacementString } = editableTextBasePrivate;

global.moduleMerge(base, exports);

const majorVersion = iOSNativeHelper.MajorVersion;

interface TextViewFilePrivate extends TextView {
    _isEditing: boolean;
    showText(): void;
    _refreshHintState(hint: string, text: string): void;
}
/** @see https://github.com/NativeScript/NativeScript/blob/13decc4cfd748672b78e7234c80d6c22e4b9d57f/packages/core/ui/text-view/index.ios.ts */
@NativeClass
class UITextViewDelegateImpl extends NSObject implements UITextViewDelegate {
    public static ObjCProtocols = [UITextViewDelegate];

    private _owner: WeakRef<SyntaxHighlighterTextView>;

    public static initWithOwner(owner: WeakRef<SyntaxHighlighterTextView>): UITextViewDelegateImpl {
        const impl = <UITextViewDelegateImpl>UITextViewDelegateImpl.new();
        impl._owner = owner;

        return impl;
    }

    public textViewShouldBeginEditing(textView: UITextView): boolean {
        const owner = this._owner.get();
        if (owner) {
            return owner.textViewShouldBeginEditing(textView);
        }

        return true;
    }

    public textViewDidBeginEditing(textView: UITextView): void {
        const owner = this._owner.get();
        if (owner) {
            owner.textViewDidBeginEditing(textView);
        }
    }

    public textViewDidEndEditing(textView: UITextView): void {
        const owner = this._owner.get();
        if (owner) {
            owner.textViewDidEndEditing(textView);
        }
    }

    public textViewDidChange(textView: UITextView): void {
        const owner = this._owner.get();
        if (owner) {
            owner.textViewDidChange(textView);
        }
    }

    public textViewShouldChangeTextInRangeReplacementText(textView: UITextView, range: NSRange, replacementString: string): boolean {
        const owner = this._owner.get();
        if (owner) {
            return owner.textViewShouldChangeTextInRangeReplacementText(textView, range, replacementString);
        }

        return true;
    }

    public scrollViewDidScroll(sv: UIScrollView): void {
        const owner = this._owner.get();
        if (owner) {
            return owner.scrollViewDidScroll(sv);
        }
    }
}

export const returnDismissesKeyboardProperty = new Property<SyntaxHighlighterTextView, boolean>({
    name: 'returnDismissesKeyboard',
    defaultValue: false,
});

export const suggestedTextToFillOnTabPressProperty = new Property<SyntaxHighlighterTextView, string>({
    name: 'suggestedTextToFillOnTabPress',
    defaultValue: '',
});

class NoScrollAnimationUITextView extends UITextView {
    // see https://github.com/NativeScript/NativeScript/issues/6863
    // UITextView internally scrolls the text you are currently typing to visible when newline character
    // is typed but the scroll animation is not needed because at the same time we are expanding
    // the textview (setting its frame)
    public setContentOffsetAnimated(contentOffset: CGPoint, animated: boolean): void {
        super.setContentOffsetAnimated(contentOffset, false);
    }
}

export class SyntaxHighlighterTextView extends TextView implements SyntaxHighlighterViewBase, TextViewFilePrivate {
    nativeViewProtected: UITextView;
    nativeTextViewProtected: UITextView;
    private _delegate: UITextViewDelegateImpl;
    _isShowingHint: boolean;
    public _isEditing: boolean;

    private _hintColor = majorVersion <= 12 || !UIColor.placeholderTextColor ? UIColor.blackColor.colorWithAlphaComponent(0.22) : UIColor.placeholderTextColor;
    private _textColor = majorVersion <= 12 || !UIColor.labelColor ? null : UIColor.labelColor;

    private _highlightr: Highlightr;
    private _codeAttributedString: CodeAttributedString; // AKA textStorage
    public code: string;
    public languageName: string | null;
    private _layoutManager: NSLayoutManager;
    private _textContainer: NSTextContainer;
    public theme: SyntaxHighlighterTheme;

    public returnDismissesKeyboard: boolean = false;
    // public textViewShouldChangeTextInRangeReplacementText?: (textView: UITextView, range: NSRange, text: string) => boolean;
    public suggestedTextToFillOnTabPress: string = "";

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
        this._textContainer.heightTracksTextView = true;
        this._textContainer.widthTracksTextView = true;
        this._layoutManager.addTextContainer(this._textContainer);
    
        const uiTextView: UITextView = NoScrollAnimationUITextView.alloc().initWithFrameTextContainer(CGRectZero, this._textContainer);

        // uiTextView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
        uiTextView.autocorrectionType = UITextAutocorrectionType.No;
        uiTextView.autocapitalizationType = UITextAutocapitalizationType.None;
        uiTextView.textColor = UIColor.alloc().initWithWhiteAlpha(0.8, 1.0);

        /**
         * In the demo, Pojoaque was set as the initial theme, so I'll make that the explicit default.
         * I think I deduced 25/255 gray to be the default BG colour used for Pojoaque in the demo.
         * 
         * @see: https://github.com/raspu/Highlightr/blob/master/Example/Highlightr/SampleCode.swift#L155
         */
        this._codeAttributedString.highlightr.setThemeTo("pojoaque"); // Just making the default explicit.
        uiTextView.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(25/255, 25/255, 25/255, 1.0);

        /**
         *
         * @see: https://github.com/NativeScript/NativeScript/blob/864b51232b14a1b6add349f1a19659fa39f9a3a0/nativescript-core/ui/text-view/text-view.ios.ts#L122
         **/
        return uiTextView;
    }

    initNativeView() {
        super.initNativeView();
        this._delegate = UITextViewDelegateImpl.initWithOwner(new WeakRef(this));
    }

    /* Fine as-is */
    // disposeNativeView() {
    //     super.disposeNativeView();
    // }

    // @profile
    public onLoaded() {
        super.onLoaded();
        this.nativeTextViewProtected.delegate = this._delegate;
    }

    public onUnloaded() {
        this.nativeTextViewProtected.delegate = null;
        super.onUnloaded();
    }

    public textViewShouldBeginEditing(textView: UITextView): boolean {
        if (this._isShowingHint) {
            this.showText();
        }

        return true;
    }

    public textViewDidBeginEditing(textView: UITextView): void {
        this._isEditing = true;
        this.notify({ eventName: TextView.focusEvent, object: this });
    }

    public textViewDidEndEditing(textView: UITextView): void {
        if (this.updateTextTrigger === 'focusLost') {
            textProperty.nativeValueChange(this, textView.text);
        }

        this._isEditing = false;
        this.dismissSoftInput();
        this._refreshHintState(this.hint, textView.text);
    }

    public textViewDidChange(textView: UITextView): void {
        if (this.updateTextTrigger === 'textChanged') {
            textProperty.nativeValueChange(this, textView.text);
        }
        this.requestLayout();
    }

    public textViewShouldChangeTextInRangeReplacementText(textView: UITextView, range: NSRange, replacementString: string): boolean {
        const delta = replacementString.length - range.length;
        if (delta > 0) {
            if (textView.text.length + delta > this.maxLength) {
                return false;
            }
        }

        if (this.formattedText) {
            _updateCharactersInRangeReplacementString(this.formattedText, range.location, range.length, replacementString);
        }

        if (replacementString === "\n" && this.returnDismissesKeyboard) {
            textView.resignFirstResponder();
            return false;
        }

        if (replacementString === "\t") {
            console.log(`[UITextViewDelegateImpl] GOT TAB. this.suggestedTextToFillOnTabPress: ${this.suggestedTextToFillOnTabPress}`);
            if (this.suggestedTextToFillOnTabPress !== "" && this.suggestedTextToFillOnTabPress !== textView.text) {
                console.log(`[UITextViewDelegateImpl] GOT TAB. Setting and returning false...`);
                textView.text = this.suggestedTextToFillOnTabPress;
                return false;
            } else {
                console.log(`[UITextViewDelegateImpl] GOT TAB. Returning true...`);
                return true;
            }
        }

        return true;
    }

    public scrollViewDidScroll(sv: UIScrollView): void {
        const contentOffset = this.nativeViewProtected.contentOffset;
        this.notify(<ScrollEventData>{
            object: this,
            eventName: 'scroll',
            scrollX: contentOffset.x,
            scrollY: contentOffset.y,
        });
    }

    public showText() {
        // @ts-ignore - fileprivate
        return super.showText();
    }

    public _refreshHintState(hint: string, text: string) {
        // @ts-ignore - fileprivate
        return super._refreshHintState(hint, text);
    }

    setFormattedTextDecorationAndTransform() {
        const attrText: NSMutableAttributedString = this._highlightr.highlightAsFastRender(this.text, this.languageName, false).mutableCopy();
        // TODO: letterSpacing should be applied per Span.
        if (this.letterSpacing !== 0) {
            attrText.addAttributeValueRange(NSKernAttributeName, this.letterSpacing * this.nativeTextViewProtected.font.pointSize, { location: 0, length: attrText.length });
        }

        if (this.style.lineHeight) {
            const paragraphStyle = NSMutableParagraphStyle.alloc().init();
            paragraphStyle.lineSpacing = this.lineHeight;
            // make sure a possible previously set text alignment setting is not lost when line height is specified
            if (this.nativeTextViewProtected instanceof UIButton) {
                paragraphStyle.alignment = (<UIButton>this.nativeTextViewProtected).titleLabel.textAlignment;
            } else {
                paragraphStyle.alignment = (<UITextField | UITextView | UILabel>this.nativeTextViewProtected).textAlignment;
            }

            if (this.nativeTextViewProtected instanceof UILabel) {
                // make sure a possible previously set line break mode is not lost when line height is specified
                paragraphStyle.lineBreakMode = this.nativeTextViewProtected.lineBreakMode;
            }
            attrText.addAttributeValueRange(NSParagraphStyleAttributeName, paragraphStyle, { location: 0, length: attrText.length });
        } else if (this.nativeTextViewProtected instanceof UITextView) {
            const paragraphStyle = NSMutableParagraphStyle.alloc().init();
            paragraphStyle.alignment = (<UITextView>this.nativeTextViewProtected).textAlignment;
            attrText.addAttributeValueRange(NSParagraphStyleAttributeName, paragraphStyle, { location: 0, length: attrText.length });
        }

        if (this.nativeTextViewProtected instanceof UIButton) {
            this.nativeTextViewProtected.setAttributedTitleForState(attrText, UIControlState.Normal);
        }
        else {
            if (majorVersion >= 13 && (UIColor as any).labelColor) {
                this.nativeTextViewProtected.textColor = (UIColor as any).labelColor;
            }

            this.nativeTextViewProtected.attributedText = attrText;
        }

        // this.nativeTextViewProtected.attributedText = this._highlightr.highlightAsFastRender(this.text, this.languageName, false);
        this.nativeTextViewProtected.attributedText = attrText;
    }

    /**
     * SyntaxHighlighterView achieves rich text by using attributedText, so we'll defer to the equivalent formattedText method here.
     */
    setTextDecorationAndTransform() {
        return this.setFormattedTextDecorationAndTransform();
    }

    [base.languageNameProperty.setNative](lang: string | null) {
        this._codeAttributedString.language = lang;
    }

    [base.themeProperty.setNative](themeName: string) {
        this._highlightr.setThemeTo(themeName);
        const nativeTheme = (this._highlightr as any).theme;
        if (nativeTheme && nativeTheme.themeBackgroundColor) {
            this.nativeViewProtected.backgroundColor = nativeTheme.themeBackgroundColor;
        }
    }

    [returnDismissesKeyboardProperty.setNative](value: boolean) {
        this.returnDismissesKeyboard = value;
    }

    [suggestedTextToFillOnTabPressProperty.setNative](value: string = "") {
        this.suggestedTextToFillOnTabPress = value;
    }
}

languageNameProperty.register(SyntaxHighlighterTextView);

themeProperty.register(SyntaxHighlighterTextView);

returnDismissesKeyboardProperty.register(SyntaxHighlighterTextView);