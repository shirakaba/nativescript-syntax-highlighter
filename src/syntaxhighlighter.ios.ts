export class Syntaxhighlighter {
	private _highlightr: Highlightr;

	constructor() {
		this._highlightr = Highlightr.alloc().init();
		console.log('syntaxHighlighter', this._highlightr);
	}

	/** Not chainable in native, but I'll arrange it so in NativeScript for convenience. */
	setThemeTo(theme: string): Syntaxhighlighter {
		this._highlightr.setThemeTo(theme);
		return this;
	}

	highlightCodeAs(code: string, lang: string): NSAttributedString {
		return this._highlightr.highlightCodeAs(code, lang);
	}
}