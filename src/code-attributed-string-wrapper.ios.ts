export class CodeAttributedStringWrapper {
    readonly _codeAttributedString: CodeAttributedString;

	constructor(highlightr: Highlightr = Highlightr.alloc().initWithHighlightPath(null)) {
		this._codeAttributedString = CodeAttributedString.alloc().initWithHighlightr(highlightr);
	}

	addLayoutManager(layoutManager: NSLayoutManager): CodeAttributedStringWrapper {
		this._codeAttributedString.addLayoutManager(layoutManager);
		return this;
    }
    
    setLanguage(language: string|null): CodeAttributedStringWrapper {
        this._codeAttributedString.language = language;
        return this;
    }

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

	setThemeTo(name: string): CodeAttributedStringWrapper {
		this._codeAttributedString.highlightr.setThemeTo(name);
		return this;
	}
}