export class CodeAttributedStringWrapper {
    readonly _codeAttributedString: CodeAttributedString;

	constructor(
        public readonly _highlightr: Highlightr = Highlightr.alloc().initWithHighlightPath(null)
    ) {
		this._codeAttributedString = CodeAttributedString.alloc().initWithHighlightr(this._highlightr);
		console.log('CodeAttributedString', this._codeAttributedString);
	}

	/** Not chainable in native, but I'll arrange it so in NativeScript for convenience. */
	addLayoutManager(layoutManager: NSLayoutManager): CodeAttributedStringWrapper {
		this._codeAttributedString.addLayoutManager(layoutManager);
		return this;
    }
    
    /** Not chainable in native, but I'll arrange it so in NativeScript for convenience. */
    setLanguage(language: string|null): CodeAttributedStringWrapper {
        this._codeAttributedString.language = language;
        return this;
    }

    /** Not chainable in native, but I'll arrange it so in NativeScript for convenience. */
    setHighlightDelegate(highlightDelegate: HighlightDelegate|null): CodeAttributedStringWrapper {
        this._codeAttributedString.highlightDelegate = highlightDelegate!;
        return this;
    }

    getString(): string {
        return this._codeAttributedString.string;
    }

    highlightRange(range: NSRange): void {
        this._codeAttributedString.highlightRange(range);
    }
    
    setupListeners(): void {
        this._codeAttributedString.setupListeners();
    }
}