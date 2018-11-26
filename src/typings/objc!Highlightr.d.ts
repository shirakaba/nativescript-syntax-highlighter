declare class Highlightr extends NSObject {

	static alloc(): Highlightr; // inherited from NSObject

	static new(): Highlightr; // inherited from NSObject

	// constructor(o: { });
	// init(): this;

	setThemeTo(name: string): void;

	highlightAsFastRender(code: string, lang: string|null, fastRender: boolean): NSAttributedString;
}
