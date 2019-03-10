declare module com {
	export module pddstudio {
		export module highlightjs {
			export class BuildConfig {
				public static class: java.lang.Class<com.pddstudio.highlightjs.BuildConfig>;
				public static DEBUG: boolean;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public constructor();
			}
		}
	}
}

declare module com {
	export module pddstudio {
		export module highlightjs {
			export class HighlightJsView implements com.pddstudio.highlightjs.utils.FileUtils.Callback {
				public static class: java.lang.Class<com.pddstudio.highlightjs.HighlightJsView>;
				public setOnLanguageChangedListener(param0: com.pddstudio.highlightjs.HighlightJsView.OnLanguageChangedListener): void;
				public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
				public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
				public setShowLineNumbers(param0: boolean): void;
				public setOnThemeChangedListener(param0: com.pddstudio.highlightjs.HighlightJsView.OnThemeChangedListener): void;
				public setSource(param0: java.io.File): void;
				public setSource(param0: java.net.URL): void;
				public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
				public getTheme(): com.pddstudio.highlightjs.models.Theme;
				public setHighlightLanguage(param0: com.pddstudio.highlightjs.models.Language): void;
				public constructor(param0: globalAndroid.content.Context);
				public refresh(): void;
				public onDataLoaded(param0: boolean, param1: string): void;
				public setSource(param0: string): void;
				public setTheme(param0: com.pddstudio.highlightjs.models.Theme): void;
				public setOnContentChangedListener(param0: com.pddstudio.highlightjs.HighlightJsView.OnContentChangedListener): void;
				public setZoomSupportEnabled(param0: boolean): void;
				public getHighlightLanguage(): com.pddstudio.highlightjs.models.Language;
			}
			export module HighlightJsView {
				export class OnContentChangedListener {
					public static class: java.lang.Class<com.pddstudio.highlightjs.HighlightJsView.OnContentChangedListener>;
					/**
					 * Constructs a new instance of the com.pddstudio.highlightjs.HighlightJsView$OnContentChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onContentChanged(): void;
					});
					public constructor();
					public onContentChanged(): void;
				}
				export class OnLanguageChangedListener {
					public static class: java.lang.Class<com.pddstudio.highlightjs.HighlightJsView.OnLanguageChangedListener>;
					/**
					 * Constructs a new instance of the com.pddstudio.highlightjs.HighlightJsView$OnLanguageChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onLanguageChanged(param0: com.pddstudio.highlightjs.models.Language): void;
					});
					public constructor();
					public onLanguageChanged(param0: com.pddstudio.highlightjs.models.Language): void;
				}
				export class OnThemeChangedListener {
					public static class: java.lang.Class<com.pddstudio.highlightjs.HighlightJsView.OnThemeChangedListener>;
					/**
					 * Constructs a new instance of the com.pddstudio.highlightjs.HighlightJsView$OnThemeChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onThemeChanged(param0: com.pddstudio.highlightjs.models.Theme): void;
					});
					public constructor();
					public onThemeChanged(param0: com.pddstudio.highlightjs.models.Theme): void;
				}
			}
		}
	}
}

declare module com {
	export module pddstudio {
		export module highlightjs {
			export module models {
				export class Language {
					public static class: java.lang.Class<com.pddstudio.highlightjs.models.Language>;
					public static AUTO_DETECT: com.pddstudio.highlightjs.models.Language;
					public static DISABLE_HIGHLIGHT: com.pddstudio.highlightjs.models.Language;
					public static _1C: com.pddstudio.highlightjs.models.Language;
					public static ABNF: com.pddstudio.highlightjs.models.Language;
					public static ACCESS_LOGS: com.pddstudio.highlightjs.models.Language;
					public static ADA: com.pddstudio.highlightjs.models.Language;
					public static ARM_ASSEMBLER: com.pddstudio.highlightjs.models.Language;
					public static AVR_ASSEMBLER: com.pddstudio.highlightjs.models.Language;
					public static ACTION_SCRIPT: com.pddstudio.highlightjs.models.Language;
					public static APACHE: com.pddstudio.highlightjs.models.Language;
					public static APPLE_SCRIPT: com.pddstudio.highlightjs.models.Language;
					public static ASCII_DOC: com.pddstudio.highlightjs.models.Language;
					public static ASPECT_J: com.pddstudio.highlightjs.models.Language;
					public static AUTO_HOTKEY: com.pddstudio.highlightjs.models.Language;
					public static AUTO_IT: com.pddstudio.highlightjs.models.Language;
					public static AXAPTA: com.pddstudio.highlightjs.models.Language;
					public static AWK: com.pddstudio.highlightjs.models.Language;
					public static BASH: com.pddstudio.highlightjs.models.Language;
					public static SHELL: com.pddstudio.highlightjs.models.Language;
					public static ZSH: com.pddstudio.highlightjs.models.Language;
					public static BASIC: com.pddstudio.highlightjs.models.Language;
					public static BNF: com.pddstudio.highlightjs.models.Language;
					public static BRAINFUCK: com.pddstudio.highlightjs.models.Language;
					public static C: com.pddstudio.highlightjs.models.Language;
					public static C_SHARP: com.pddstudio.highlightjs.models.Language;
					public static C_PLUS_PLUS: com.pddstudio.highlightjs.models.Language;
					public static CACHE_OBJECT_SCRIPT: com.pddstudio.highlightjs.models.Language;
					public static C_MAKE: com.pddstudio.highlightjs.models.Language;
					public static COQ: com.pddstudio.highlightjs.models.Language;
					public static CSP: com.pddstudio.highlightjs.models.Language;
					public static CSS: com.pddstudio.highlightjs.models.Language;
					public static CAPTAIN_PROTO: com.pddstudio.highlightjs.models.Language;
					public static CLEAN: com.pddstudio.highlightjs.models.Language;
					public static CLOJURE: com.pddstudio.highlightjs.models.Language;
					public static COFFEE_SCRIPT: com.pddstudio.highlightjs.models.Language;
					public static CRMSH: com.pddstudio.highlightjs.models.Language;
					public static CRYSTAL: com.pddstudio.highlightjs.models.Language;
					public static D: com.pddstudio.highlightjs.models.Language;
					public static DNS_ZONE_FILE: com.pddstudio.highlightjs.models.Language;
					public static DOS: com.pddstudio.highlightjs.models.Language;
					public static BATCH: com.pddstudio.highlightjs.models.Language;
					public static DART: com.pddstudio.highlightjs.models.Language;
					public static DELPHI: com.pddstudio.highlightjs.models.Language;
					public static DIFF: com.pddstudio.highlightjs.models.Language;
					public static DJANGO: com.pddstudio.highlightjs.models.Language;
					public static DOCKER_FILE: com.pddstudio.highlightjs.models.Language;
					public static DSCONFIG: com.pddstudio.highlightjs.models.Language;
					public static DTS: com.pddstudio.highlightjs.models.Language;
					public static DUST: com.pddstudio.highlightjs.models.Language;
					public static EBNF: com.pddstudio.highlightjs.models.Language;
					public static ELIXIR: com.pddstudio.highlightjs.models.Language;
					public static ELM: com.pddstudio.highlightjs.models.Language;
					public static ERLANG: com.pddstudio.highlightjs.models.Language;
					public static EXCEL: com.pddstudio.highlightjs.models.Language;
					public static F_SHARP: com.pddstudio.highlightjs.models.Language;
					public static FIX: com.pddstudio.highlightjs.models.Language;
					public static FLIX: com.pddstudio.highlightjs.models.Language;
					public static FORTRAN: com.pddstudio.highlightjs.models.Language;
					public static G_CODE: com.pddstudio.highlightjs.models.Language;
					public static GAMS: com.pddstudio.highlightjs.models.Language;
					public static GAUSS: com.pddstudio.highlightjs.models.Language;
					public static GHERKIN: com.pddstudio.highlightjs.models.Language;
					public static GO: com.pddstudio.highlightjs.models.Language;
					public static GOLO: com.pddstudio.highlightjs.models.Language;
					public static GRADLE: com.pddstudio.highlightjs.models.Language;
					public static GROOVY: com.pddstudio.highlightjs.models.Language;
					public static HTML: com.pddstudio.highlightjs.models.Language;
					public static XML: com.pddstudio.highlightjs.models.Language;
					public static HTTP: com.pddstudio.highlightjs.models.Language;
					public static HAML: com.pddstudio.highlightjs.models.Language;
					public static HANDLEBARS: com.pddstudio.highlightjs.models.Language;
					public static HASKELL: com.pddstudio.highlightjs.models.Language;
					public static HAXE: com.pddstudio.highlightjs.models.Language;
					public static HY: com.pddstudio.highlightjs.models.Language;
					public static INI: com.pddstudio.highlightjs.models.Language;
					public static INFORM7: com.pddstudio.highlightjs.models.Language;
					public static IRPF90: com.pddstudio.highlightjs.models.Language;
					public static JSON: com.pddstudio.highlightjs.models.Language;
					public static JAVA: com.pddstudio.highlightjs.models.Language;
					public static JAVA_SCRIPT: com.pddstudio.highlightjs.models.Language;
					public static LASSO: com.pddstudio.highlightjs.models.Language;
					public static LEAF: com.pddstudio.highlightjs.models.Language;
					public static LESS: com.pddstudio.highlightjs.models.Language;
					public static LDIF: com.pddstudio.highlightjs.models.Language;
					public static LISP: com.pddstudio.highlightjs.models.Language;
					public static LIVE_CODE_SERVER: com.pddstudio.highlightjs.models.Language;
					public static LIVE_SCRIPT: com.pddstudio.highlightjs.models.Language;
					public static LLVM: com.pddstudio.highlightjs.models.Language;
					public static LUA: com.pddstudio.highlightjs.models.Language;
					public static MAKEFILE: com.pddstudio.highlightjs.models.Language;
					public static MARKDOWN: com.pddstudio.highlightjs.models.Language;
					public static MATHEMATICA: com.pddstudio.highlightjs.models.Language;
					public static MATLAB: com.pddstudio.highlightjs.models.Language;
					public static MAXIMA: com.pddstudio.highlightjs.models.Language;
					public static MAYA_EMBEDDED_LANGUAGE: com.pddstudio.highlightjs.models.Language;
					public static MERCURY: com.pddstudio.highlightjs.models.Language;
					public static MIZAR: com.pddstudio.highlightjs.models.Language;
					public static MOJOLICIOUS: com.pddstudio.highlightjs.models.Language;
					public static MONKEY: com.pddstudio.highlightjs.models.Language;
					public static MOONSCRIPT: com.pddstudio.highlightjs.models.Language;
					public static N1QL: com.pddstudio.highlightjs.models.Language;
					public static NSIS: com.pddstudio.highlightjs.models.Language;
					public static NGINX: com.pddstudio.highlightjs.models.Language;
					public static NIMROD: com.pddstudio.highlightjs.models.Language;
					public static NIX: com.pddstudio.highlightjs.models.Language;
					public static O_CAML: com.pddstudio.highlightjs.models.Language;
					public static OBJECTIVE_C: com.pddstudio.highlightjs.models.Language;
					public static OPENGL_SHADING_LANGUAGE: com.pddstudio.highlightjs.models.Language;
					public static OPEN_SCAD: com.pddstudio.highlightjs.models.Language;
					public static ORACLE_RULES_LANGUAGE: com.pddstudio.highlightjs.models.Language;
					public static OXYGENE: com.pddstudio.highlightjs.models.Language;
					public static PF: com.pddstudio.highlightjs.models.Language;
					public static PHP: com.pddstudio.highlightjs.models.Language;
					public static PARSER3: com.pddstudio.highlightjs.models.Language;
					public static PERL: com.pddstudio.highlightjs.models.Language;
					public static PONY: com.pddstudio.highlightjs.models.Language;
					public static POWER_SHELL: com.pddstudio.highlightjs.models.Language;
					public static PROCESSING: com.pddstudio.highlightjs.models.Language;
					public static PROLOG: com.pddstudio.highlightjs.models.Language;
					public static PROTOCOL_BUFFERS: com.pddstudio.highlightjs.models.Language;
					public static PUPPET: com.pddstudio.highlightjs.models.Language;
					public static PYTHON: com.pddstudio.highlightjs.models.Language;
					public static PYTHON_PROFILER_RESULTS: com.pddstudio.highlightjs.models.Language;
					public static Q: com.pddstudio.highlightjs.models.Language;
					public static QML: com.pddstudio.highlightjs.models.Language;
					public static R: com.pddstudio.highlightjs.models.Language;
					public static RENDER_MAN_RIB: com.pddstudio.highlightjs.models.Language;
					public static RENDER_MAN_RSL: com.pddstudio.highlightjs.models.Language;
					public static ROBOCONF: com.pddstudio.highlightjs.models.Language;
					public static RUBY: com.pddstudio.highlightjs.models.Language;
					public static RUST: com.pddstudio.highlightjs.models.Language;
					public static SCSS: com.pddstudio.highlightjs.models.Language;
					public static SQL: com.pddstudio.highlightjs.models.Language;
					public static STEP_PART_21: com.pddstudio.highlightjs.models.Language;
					public static SCALA: com.pddstudio.highlightjs.models.Language;
					public static SCHEME: com.pddstudio.highlightjs.models.Language;
					public static SCILAB: com.pddstudio.highlightjs.models.Language;
					public static SMALI: com.pddstudio.highlightjs.models.Language;
					public static SMALLTALK: com.pddstudio.highlightjs.models.Language;
					public static STAN: com.pddstudio.highlightjs.models.Language;
					public static STATA: com.pddstudio.highlightjs.models.Language;
					public static STYLUS: com.pddstudio.highlightjs.models.Language;
					public static SUB_UNIT: com.pddstudio.highlightjs.models.Language;
					public static SWIFT: com.pddstudio.highlightjs.models.Language;
					public static TEST_ANYTHING_PROTOCOL: com.pddstudio.highlightjs.models.Language;
					public static TCL: com.pddstudio.highlightjs.models.Language;
					public static TEX: com.pddstudio.highlightjs.models.Language;
					public static THRIFT: com.pddstudio.highlightjs.models.Language;
					public static TP: com.pddstudio.highlightjs.models.Language;
					public static TWIG: com.pddstudio.highlightjs.models.Language;
					public static TYPE_SCRIPT: com.pddstudio.highlightjs.models.Language;
					public static VB_NET: com.pddstudio.highlightjs.models.Language;
					public static VB_SCRIPT: com.pddstudio.highlightjs.models.Language;
					public static VHDL: com.pddstudio.highlightjs.models.Language;
					public static VALA: com.pddstudio.highlightjs.models.Language;
					public static VERILOG: com.pddstudio.highlightjs.models.Language;
					public static VIM: com.pddstudio.highlightjs.models.Language;
					public static X86_ASSEMBLY: com.pddstudio.highlightjs.models.Language;
					public static XL: com.pddstudio.highlightjs.models.Language;
					public static X_QUERY: com.pddstudio.highlightjs.models.Language;
					public static ZEPHIR: com.pddstudio.highlightjs.models.Language;
					public static values(): native.Array<com.pddstudio.highlightjs.models.Language>;
					public static valueOf(param0: string): com.pddstudio.highlightjs.models.Language;
					public getName(): string;
				}
			}
		}
	}
}

declare module com {
	export module pddstudio {
		export module highlightjs {
			export module models {
				export class Theme {
					public static class: java.lang.Class<com.pddstudio.highlightjs.models.Theme>;
					public static AGATE: com.pddstudio.highlightjs.models.Theme;
					public static ANDROID_STUDIO: com.pddstudio.highlightjs.models.Theme;
					public static ARDUINO_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ARTA: com.pddstudio.highlightjs.models.Theme;
					public static ASCETIC: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_CAVE_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_CAVE_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_DUNE_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_DUNE_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_ESTUARY_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_ESTUARY_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_FOREST_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_FOREST_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_HEATH_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_HEATH_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_LAKESIDE_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_LAKESIDE_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_PLATEAU_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_PLATEAU_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_SAVANNA_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_SAVANNA_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_SEASIDE_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_SEASIDE_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_SULPHURPOOL_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATELIER_SULPHURPOOL_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static ATOM_ONE_DARK: com.pddstudio.highlightjs.models.Theme;
					public static ATOM_ONE_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static BROWN_PAPER: com.pddstudio.highlightjs.models.Theme;
					public static CODEPEN_EMBED: com.pddstudio.highlightjs.models.Theme;
					public static COLOR_BREWER: com.pddstudio.highlightjs.models.Theme;
					public static DARK: com.pddstudio.highlightjs.models.Theme;
					public static DARKULA: com.pddstudio.highlightjs.models.Theme;
					public static DEFAULT: com.pddstudio.highlightjs.models.Theme;
					public static DOCCO: com.pddstudio.highlightjs.models.Theme;
					public static DRAKULA: com.pddstudio.highlightjs.models.Theme;
					public static FAR: com.pddstudio.highlightjs.models.Theme;
					public static FOUNDATION: com.pddstudio.highlightjs.models.Theme;
					public static GITHUB: com.pddstudio.highlightjs.models.Theme;
					public static GITHUB_GIST: com.pddstudio.highlightjs.models.Theme;
					public static GOOGLECODE: com.pddstudio.highlightjs.models.Theme;
					public static GRAYSCALE: com.pddstudio.highlightjs.models.Theme;
					public static GRUVBOX_DARK: com.pddstudio.highlightjs.models.Theme;
					public static GRUVBOX_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static HOPSCOTCH: com.pddstudio.highlightjs.models.Theme;
					public static HYBRID: com.pddstudio.highlightjs.models.Theme;
					public static IDEA: com.pddstudio.highlightjs.models.Theme;
					public static IR_BLACK: com.pddstudio.highlightjs.models.Theme;
					public static KIMBIE_DARK: com.pddstudio.highlightjs.models.Theme;
					public static KIMBIE_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static MAGULA: com.pddstudio.highlightjs.models.Theme;
					public static MONO_BLUE: com.pddstudio.highlightjs.models.Theme;
					public static MONOKAI: com.pddstudio.highlightjs.models.Theme;
					public static MONOKAI_SUBLIME: com.pddstudio.highlightjs.models.Theme;
					public static OBSIDIAN: com.pddstudio.highlightjs.models.Theme;
					public static OCEAN: com.pddstudio.highlightjs.models.Theme;
					public static PARAISO_DARK: com.pddstudio.highlightjs.models.Theme;
					public static PARAISO_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static POJOAQUE: com.pddstudio.highlightjs.models.Theme;
					public static PURE_BASIC: com.pddstudio.highlightjs.models.Theme;
					public static QT_CREATOR_DARK: com.pddstudio.highlightjs.models.Theme;
					public static QT_CREATOR_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static RAILSCASTS: com.pddstudio.highlightjs.models.Theme;
					public static RAINBOX: com.pddstudio.highlightjs.models.Theme;
					public static SCHOOL_BOOK: com.pddstudio.highlightjs.models.Theme;
					public static SOLARIZED_DARK: com.pddstudio.highlightjs.models.Theme;
					public static SOLARIZED_LIGHT: com.pddstudio.highlightjs.models.Theme;
					public static SUNBURST: com.pddstudio.highlightjs.models.Theme;
					public static TOMORROW: com.pddstudio.highlightjs.models.Theme;
					public static TOMORROW_NIGHT_BLUE: com.pddstudio.highlightjs.models.Theme;
					public static TOMORROW_NIGHT_BRIGHT: com.pddstudio.highlightjs.models.Theme;
					public static TOMORROW_NIGHT: com.pddstudio.highlightjs.models.Theme;
					public static TOMORROW_NIGHT_EIGHTIES: com.pddstudio.highlightjs.models.Theme;
					public static VS: com.pddstudio.highlightjs.models.Theme;
					public static X_CODE: com.pddstudio.highlightjs.models.Theme;
					public static XT256: com.pddstudio.highlightjs.models.Theme;
					public static ZENBURN: com.pddstudio.highlightjs.models.Theme;
					public getName(): string;
					public static values(): native.Array<com.pddstudio.highlightjs.models.Theme>;
					public static valueOf(param0: string): com.pddstudio.highlightjs.models.Theme;
				}
			}
		}
	}
}

declare module com {
	export module pddstudio {
		export module highlightjs {
			export module utils {
				export class FileUtils {
					public static class: java.lang.Class<com.pddstudio.highlightjs.utils.FileUtils>;
					public static loadSourceFromUrl(param0: com.pddstudio.highlightjs.utils.FileUtils.Callback, param1: java.net.URL): void;
					public constructor();
					public static loadSourceFromFile(param0: java.io.File): string;
				}
				export module FileUtils {
					export class Callback {
						public static class: java.lang.Class<com.pddstudio.highlightjs.utils.FileUtils.Callback>;
						/**
						 * Constructs a new instance of the com.pddstudio.highlightjs.utils.FileUtils$Callback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onDataLoaded(param0: boolean, param1: string): void;
						});
						public constructor();
						public onDataLoaded(param0: boolean, param1: string): void;
					}
					export class NetworkLoader extends globalAndroid.os.AsyncTask<java.lang.Void,java.lang.Void,string> {
						public static class: java.lang.Class<com.pddstudio.highlightjs.utils.FileUtils.NetworkLoader>;
						public onPostExecute(param0: string): void;
						public onCancelled(): void;
						public doInBackground(param0: native.Array<java.lang.Void>): string;
					}
				}
			}
		}
	}
}

declare module com {
	export module pddstudio {
		export module highlightjs {
			export module utils {
				export class SourceUtils {
					public static class: java.lang.Class<com.pddstudio.highlightjs.utils.SourceUtils>;
					public constructor();
					public static generateContent(param0: string, param1: string, param2: string, param3: boolean, param4: boolean): string;
				}
			}
		}
	}
}

//Generics information:

