declare class Highlightr extends NSObject {

	static alloc(): Highlightr; // inherited from NSObject

	static new(): Highlightr; // inherited from NSObject

	// constructor(o: { });
	// init(): this;
	initWithHighlightPath(path?: string|null): this;

	setThemeTo(name: string): boolean;

	highlightAsFastRender(code: string, lang: string|null, fastRender: boolean): NSAttributedString;
}