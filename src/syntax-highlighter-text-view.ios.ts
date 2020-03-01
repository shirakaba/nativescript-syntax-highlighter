import { layout } from 'tns-core-modules/ui/core/view';
import * as base from 'nativescript-syntax-highlighter/syntax-highlighter-view.base';
import { TextView } from "@nativescript/core/ui/text-view";
import { textProperty } from "@nativescript/core/ui/editable-text-base";
import { ScrollEventData } from "@nativescript/core/ui/scroll-view";
import { Property, View } from '@nativescript/core/ui/core/view';
import { SyntaxHighlighterTheme, SyntaxHighlighterViewBase, codeProperty, languageNameProperty, themeProperty } from 'nativescript-syntax-highlighter/syntax-highlighter-view.base';
import { ios } from "@nativescript/core/utils/utils";

const editableTextBasePrivate: any = require("@nativescript/core/ui/editable-text-base");
const { _updateCharactersInRangeReplacementString } = editableTextBasePrivate;

global.moduleMerge(base, exports);

const majorVersion = ios.MajorVersion;

interface TextViewFilePrivate extends TextView {
    _isEditing: boolean;
    showText(): void;
    _refreshHintState(hint: string, text: string): void;
}

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
            owner.showText();
        }

        return true;
    }

    public textViewDidBeginEditing(textView: UITextView): void {
        const owner = this._owner.get();
        if (owner) {
            owner._isEditing = true;
            owner.notify({ eventName: TextView.focusEvent, object: owner });
        }
    }

    public textViewDidEndEditing(textView: UITextView) {
        const owner = this._owner.get();
        if (owner) {
            if (owner.updateTextTrigger === "focusLost") {
                textProperty.nativeValueChange(owner, textView.text);
            }

            owner._isEditing = false;
            owner.dismissSoftInput();
            owner._refreshHintState(owner.hint, textView.text);
        }
    }

    public textViewDidChange(textView: UITextView) {
        const owner = this._owner.get();
        if (owner) {
            if (owner.updateTextTrigger === "textChanged") {
                textProperty.nativeValueChange(owner, textView.text);
            }
            owner.requestLayout();
        }
    }

    public textViewShouldChangeTextInRangeReplacementText(textView: UITextView, range: NSRange, replacementString: string): boolean {
        const owner = this._owner.get();
        if (owner) {
            const delta = replacementString.length - range.length;
            if (delta > 0) {
                if (textView.text.length + delta > owner.maxLength) {
                    return false;
                }
            }

            if (owner.formattedText) {
                _updateCharactersInRangeReplacementString(owner.formattedText, range.location, range.length, replacementString);
            }

            if(replacementString === "\n" && owner.returnDismissesKeyboard){
                textView.resignFirstResponder();
                return false;
            }

            if(replacementString === "\t"){
                if(owner.suggestedTextToFillOnTabPress !== "" && owner.suggestedTextToFillOnTabPress !== textView.text){
                    return true;
                } else {
                    textView.text = owner.suggestedTextToFillOnTabPress;
                    return false;                    
                }
            }

            // if(owner.textViewShouldChangeTextInRangeReplacementText){
            //     return owner.textViewShouldChangeTextInRangeReplacementText(textView, range, replacementString);
            // }
        }

        return true;
    }

    public scrollViewDidScroll(sv: UIScrollView): void {
        const owner = this._owner.get();
        if (owner) {
            const contentOffset = owner.nativeViewProtected.contentOffset;
            owner.notify(<ScrollEventData>{
                object: owner,
                eventName: "scroll",
                scrollX: contentOffset.x,
                scrollY: contentOffset.y
            });
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
    public nativeView: UITextView;
    public nativeViewProtected: UITextView;
    public nativeTextViewProtected: UITextView;

    private _delegate: UITextViewDelegateImpl;
    public _isEditing: boolean;

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
        // this._textContainer.heightTracksTextView = true;
        // this._textContainer.widthTracksTextView = true;
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
        // 
        this._delegate = UITextViewDelegateImpl.initWithOwner(new WeakRef(this));
    }

    /* Fine as-is */
    // disposeNativeView() {
    //     super.disposeNativeView();
    // }

    // @profile
    public onLoaded() {
        super.onLoaded();
        this.ios.delegate = this._delegate;
    }

    public onUnloaded() {
        this.ios.delegate = null;
        super.onUnloaded();
    }

    public showText() {
        // @ts-ignore - fileprivate
        return super.showText();
    }

    public _refreshHintState(hint: string, text: string) {
        // @ts-ignore - fileprivate
        return super._refreshHintState(hint, text);
    }

    [base.codeProperty.setNative](code: string) {
        this.nativeViewProtected.attributedText = this._highlightr.highlightAsFastRender(code, this.languageName, false);
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

    /** Seems like we don't need this, because SyntaxHighlighterTextView acccepts no children..?
     * The left, top, right, bottom values are measured in pixels (not dip). Have to divide by 2 on iPhone 8 simulator to match up with the CGRect.
    */
    public onLayout(left: number, top: number, right: number, bottom: number): void {
        // console.log(`[SyntaxHighlighterTextView] 1 onLayout left ${left}, top ${top}, right ${right}, bottom ${bottom}; this.nativeView.frame ${JSON.stringify(this.nativeView.frame)}; this.nativeView.bounds ${JSON.stringify(this.nativeView.bounds)}`, );
        super.onLayout(left, top, right, bottom);

        /* As the TextView scrolls, bounds.origin represents the scroll offset, while frame.origin remains 0,0. */
        console.log(`[SyntaxHighlighterTextView] 2 onLayout\n\tleft ${left}, top ${top}, right ${right}, bottom ${bottom};\n\tthis.nativeView.frame ${JSON.stringify(this.nativeView.frame)};\n\tthis.nativeView.bounds ${JSON.stringify(this.nativeView.bounds)};\n\tthis._textContainer.size ${JSON.stringify(this._textContainer.size)}`, );

        /* I don't understand this part... */
        // this.nativeViewProtected.frame = this.nativeView.bounds;

        /* this._textContainer can be regarded as a child. Hoping that heightTracksTextView and widthTracksTextView does the job, though. */
        this._textContainer.size.width = this.nativeView.frame.size.width;
        this._textContainer.size.height = this.nativeView.frame.size.height;

        console.log(`[SyntaxHighlighterTextView] 3 onLayout\n\tleft ${left}, top ${top}, right ${right}, bottom ${bottom};\n\tthis.nativeView.frame ${JSON.stringify(this.nativeView.frame)};\n\tthis.nativeView.bounds ${JSON.stringify(this.nativeView.bounds)};\n\tthis._textContainer.size ${JSON.stringify(this._textContainer.size)}`, );

        this.nativeViewProtected.setNeedsLayout();
    }

    /** Default implementation is probably sufficient. */
    // public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number) {
    //     const nativeView = this.nativeView;
    //     if (nativeView) {
    //         const width = layout.getMeasureSpecSize(widthMeasureSpec);
    //         const height = layout.getMeasureSpecSize(heightMeasureSpec);
    //         console.log(`[SyntaxHighlighterTextView] onMeasure width ${width}, height ${height}`);
    //         this.setMeasuredDimension(width, height);
    //     }
    // }
}

codeProperty.register(SyntaxHighlighterTextView);

languageNameProperty.register(SyntaxHighlighterTextView);

themeProperty.register(SyntaxHighlighterTextView);

returnDismissesKeyboardProperty.register(SyntaxHighlighterTextView);