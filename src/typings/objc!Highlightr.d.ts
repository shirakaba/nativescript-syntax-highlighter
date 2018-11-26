declare class Highlightr extends NSObject {

	static alloc(): Highlightr; // inherited from NSObject

	static new(): Highlightr; // inherited from NSObject

	// constructor(o: { });
	// init(): this;

	setThemeTo(theme: string): void;

	highlightCodeAs(code: string, lang: string): NSAttributedString;
}
