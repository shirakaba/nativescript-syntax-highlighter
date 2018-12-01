/* Can't find a way to access this as a property on Highlightr without a crash, so won't declare it. */
// declare class Theme extends NSObject {
//     themeBackgroundColor: UIColor|null;
// }

declare class Highlightr extends NSObject {

	static alloc(): Highlightr; // inherited from NSObject

	static new(): Highlightr; // inherited from NSObject

    constructor(o: { highlightPath: string; });
    
    /* All of these crash NativeScript without any error explained, so best not to declare them at all. */
    // getThemeBackgroundColour(): UIColor|null;
    // associatedTextView: UITextView|null;
    // theme: Theme|null;

	availableThemes(): NSArray<string>;

	// constructor(o: { });
	// init(): this;
    initWithHighlightPath(path?: string|null): this;

	setThemeTo(name: string): boolean;

	highlightAsFastRender(code: string, lang: string|null, fastRender: boolean): NSAttributedString;
}

declare var HighlightrVersionNumber: number;

declare var HighlightrVersionString: interop.Reference<number>;

declare class CodeAttributedString extends NSTextStorage {

	static alloc(): CodeAttributedString; // inherited from NSObject

    static new(): CodeAttributedString; // inherited from NSObject
    
    highlightDelegate: HighlightDelegate;
    
    readonly highlightr: Highlightr;

    /* Should exist, but doesn't seem to work. */
	// constructor(o: { highlightr?: Highlightr|null });
    // initWithHighlightr(highlightr?: Highlightr|null): this;

    initWithHighlightr(highlightr): this;
    
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