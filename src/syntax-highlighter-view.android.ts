import * as base from './syntax-highlighter-view.base';
import { View } from '@nativescript/core/ui/core/view';
import { SyntaxHighlighterTheme, SyntaxHighlighterViewBase, codeProperty, languageNameProperty, themeProperty } from './syntax-highlighter-view.base';

global.moduleMerge(base, exports);

export class SyntaxHighlighterView extends View implements SyntaxHighlighterViewBase {
    code: string;
    languageName: string | null;
    theme: SyntaxHighlighterTheme | string;
    private _webviewLoaded: boolean;

    constructor() {
        super();
    }

    createNativeView(): Object {
        const nativeView = new android.webkit.WebView(this._context);
        const settings = nativeView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowContentAccess(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setAllowFileAccess(true);
        const ref = new WeakRef<SyntaxHighlighterView>(this);
        const client = (android as any).webkit.WebViewClient.extend({
            onPageFinished(webView: android.webkit.WebView, url: string) {
                const owner = ref.get();
                owner._webviewLoaded = true;
                if (owner.code) {
                    owner.setCode(owner.code);
                }
                if (owner.languageName) {
                    owner.setLang(owner.languageName);
                }
                if (owner.theme) {
                    owner.setTheme(owner.theme);
                }
            }
        });
        nativeView.setWebViewClient(new client);
        return nativeView;
    }


    initNativeView(): void {
        this.nativeView.loadUrl('file:///android_asset/app_sources/index.html');
    }

    private setCode(code) {
        this.nativeView.evaluateJavascript("setSource" + "(" + JSON.stringify({"data": code}) + ")", null);
    }

    private setLang(lang) {
        this.nativeView.evaluateJavascript(`changeLanguage('${lang}')`, null);
    }


    private setTheme(theme) {
        this.nativeView.evaluateJavascript(`changeStyle('${theme}')`, null);
    }

    [base.codeProperty.setNative](code: string) {
        if (!this._webviewLoaded) return;
        this.setCode(code);
    }

    [base.languageNameProperty.setNative](lang: string | null) {
        if (!this._webviewLoaded) return;
        this.setLang(lang);
    }


    [base.themeProperty.setNative](theme: any) {
        if (!this._webviewLoaded) return;
        this.setTheme(theme);
    }

}

codeProperty.register(SyntaxHighlighterView);

languageNameProperty.register(SyntaxHighlighterView);

themeProperty.register(SyntaxHighlighterView);
