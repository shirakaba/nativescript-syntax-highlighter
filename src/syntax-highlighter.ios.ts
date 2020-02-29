import { layout } from 'tns-core-modules/ui/core/view';
import * as base from './syntax-highlighter.base';
import { TextView } from "@nativescript/core/ui/text-view";
import { textProperty } from "@nativescript/core/ui/editable-text-base";
import { ScrollEventData } from "@nativescript/core/ui/scroll-view";
import { SyntaxHighlighterTheme, SyntaxHighlighterViewBase, codeProperty, languageNameProperty, themeProperty } from './syntax-highlighter.base';

const editableTextBasePrivate: any = require("@nativescript/core/ui/editable-text-base");
const { _updateCharactersInRangeReplacementString } = editableTextBasePrivate;

global.moduleMerge(base, exports);

import { ios } from "@nativescript/core/utils/utils";

const majorVersion = ios.MajorVersion;

interface TextViewFilePrivate extends TextView {
    _isEditing: boolean;
    showText(): void;
    _refreshHintState(hint: string, text: string): void;
}

class UITextViewDelegateImpl extends NSObject implements UITextViewDelegate {
    public static ObjCProtocols = [UITextViewDelegate];

    private _owner: WeakRef<TextViewFilePrivate>;

    public static initWithOwner(owner: WeakRef<TextViewFilePrivate>): UITextViewDelegateImpl {
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

// export class SyntaxHighlighterView extends SyntaxHighlighterViewBase {
export class SyntaxHighlighterView extends TextView implements SyntaxHighlighterViewBase {
    private _delegate: UITextViewDelegateImpl;
    public _isEditing: boolean;

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
    
        const uiTextView: UITextView = UITextView.alloc().initWithFrameTextContainer(CGRectZero, this._textContainer);
        uiTextView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
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

    public onLayout(left: number, top: number, right: number, bottom: number): void {
        super.onLayout(left, top, right, bottom);
        this.nativeViewProtected.frame = this.nativeView.bounds;
        this._textContainer.size.width = this.nativeView.frame.size.width;
        this._textContainer.size.height = this.nativeView.frame.size.height;
        this.nativeViewProtected.setNeedsLayout();
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
