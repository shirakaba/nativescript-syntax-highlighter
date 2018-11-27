declare class CodeAttributedString extends NSTextStorage {

	static alloc(): CodeAttributedString; // inherited from NSObject

    static new(): CodeAttributedString; // inherited from NSObject
    
    highlightDelegate: HighlightDelegate;

    /* Should exist, but doesn't seem to work. */
	// constructor(o: { highlightr?: Highlightr|null });
    // initWithHighlightr(highlightr?: Highlightr|null): this;
    
    constructor();
    init(): this;
    
    language: string|null;

    highlightRange(range: NSRange): void;

    setupListeners(): void;
}

interface HighlightDelegate extends NSObjectProtocol {
    shouldHighlightRange?(range: NSRange): boolean;
    didHighlightRange?(range: NSRange): void;
}
declare var HighlightDelegate: {
	prototype: HighlightDelegate;
};