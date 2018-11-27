export class SyntaxHighlighter {
	private readonly _highlightr: Highlightr;

	constructor() {
		this._highlightr = Highlightr.alloc().initWithHighlightPath(null);
		console.log('syntaxHighlighter', this._highlightr);
	}

	/** Not chainable in native, but I'll arrange it so in NativeScript for convenience. */
	setThemeTo(name: string): SyntaxHighlighter {
		this._highlightr.setThemeTo(name);
		return this;
	}

	highlightAsFastRender(code: string, languageName: string|null = null, fastRender: boolean = true): NSAttributedString {
		return this._highlightr.highlightAsFastRender(code, languageName, fastRender);
	}
}