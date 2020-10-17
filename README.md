# NativeScript Syntax Highlighter (AKA SyntaxHighlighterTextView)

A Text View (SyntaxHighlighterTextView, for iOS only) or View (SyntaxHighlighterView for Android) that can highlight syntax!

* SyntaxHighlighterTextView, for iOS only (a TextView)
* SyntaxHighlighterView, for iOS (a View that acts a lot like a TextView) and Android (a WebView)

## State of project

I'm not actively maintaining this. I use the SyntaxHighlighterTextView in [NSIDE](https://github.com/shirakaba/nside), for iOS, via React NativeScript, and that's it. It's likely broken in various areas.

## Installation

This is unfortunately still a very manual affair, because plugins are really hard to make.

Anyway, for all NativeScript platforms, you'll first need to begin with these steps.

This project assumes the following folder hierarchy:

```
.
├── your-app
└── nativescript-syntax-highlighter
```

Where `your-app` is the name of your app, and `nativescript-syntax-highlighter` is this git repository. That is to say, they are expected to be siblings. You can clone this repository using:

```sh
git clone git@github.com:shirakaba/nativescript-syntax-highlighter.git
```

In `your-app`, you would then run:

```sh
tns plugin add "file:../nativescript-syntax-highlighter/src"
```

Finally, since moving to NativeScript 7, for some reason, the Podfile is no longer being copied across. Make sure that your Podfile looks like this. It should include the line `post_installnativescript_syntax_highlighter_0 installer` and the contents of the Podfile mentioned after in the block `# Begin Podfile - /Users/jamie/Documents/git/NSIDE/node_modules/nativescript-syntax-highlighter/platforms/ios/Podfile`:

```ruby
use_frameworks!

target "NSIDE" do
# NativeScriptPlatformSection /Users/jamie/Documents/git/NSIDE/node_modules/@nativescript/core/platforms/ios/Podfile with 9.0
platform :ios, '9.0'
# End NativeScriptPlatformSection

# Begin Podfile - /Users/jamie/Documents/git/NSIDE/node_modules/@nativescript/core/platforms/ios/Podfile
# platform :ios, '9.0'
use_frameworks!

pod 'MaterialComponents/Tabs', '~> 94.5'
# End Podfile

post_install do |installer|
  post_installnativescript_syntax_highlighter_0 installer
  post_installNativeScript_CLI_Architecture_Exclusions_0 installer
end

# Begin Podfile - /Users/jamie/Documents/git/NSIDE/node_modules/nativescript-syntax-highlighter/platforms/ios/Podfile
pod 'Highlightr', :git => 'https://github.com/shirakaba/Highlightr.git', :branch => 'master'

def post_installnativescript_syntax_highlighter_0 (installer)
  installer.pods_project.targets.each do |target|
    if target.name == 'Highlightr'
      target.build_configurations.each do |config|
        config.build_settings['SWIFT_VERSION'] = '4.2'
      end
    end
  end
end
# End Podfile

# Begin Podfile - /Users/jamie/Documents/git/NSIDE/platforms/ios/Podfile-exclusions
def post_installNativeScript_CLI_Architecture_Exclusions_0 (installer)
  installer.pods_project.build_configurations.each do |config|
    config.build_settings.delete "VALID_ARCHS"
    config.build_settings["EXCLUDED_ARCHS_x86_64"] = "arm64 arm64e"
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "i386 armv6 armv7 armv7s armv8 $(EXCLUDED_ARCHS_$(NATIVE_ARCH_64_BIT))"
    config.build_settings["EXCLUDED_ARCHS[sdk=iphoneos*]"] = "i386 armv6 armv7 armv7s armv8 x86_64"
  end
end
# End Podfile
end
```

### With React

For React, you'll additionally need to do this:

```ts
import { registerElement } from "react-nativescript";

registerElement(
	'syntaxHighlighterTextView',
	() => require('nativescript-syntax-highlighter/syntax-highlighter-text-view').SyntaxHighlighterTextView,
);
```

### With Vue

```ts
Vue.registerElement(
	'syntaxHighlighterTextView',
	() => require('nativescript-syntax-highlighter/syntax-highlighter-text-view').SyntaxHighlighterTextView,
	{
		model: {
			prop: 'text',
			event: 'textChange',
		},
	}
);
```

## Usage

### With NativeScript Core

See `demo` in the repo root.

### With React

```tsx
import * as React from "react";
import { useState } from "react";
import { SyntaxHighlighterTextView } from "nativescript-syntax-highlighter";
import { EventData, TextView, ContentView } from "@nativescript/core";

function Example({}){
    const [textContent, setTextContent] = useState(0);

    return (
        <SyntaxHighlighterTextView
            height="100%"
            width="100%"
            autocorrect={false}
            autocapitalizationType={"none"}
            returnDismissesKeyboard={false}
            suggestedTextToFillOnTabPress={() => ""}
            onTextChange={(args: EventData) => {
                const { text } = args.object as TextView;
                console.log(`[onSyntaxViewTextChange] ${text}`);

                setTextContent(text);
            }}
            text={textContent}
            style={{
                backgroundColor: "rgb(25,25,25)",
                color: "rgba(255,204,204,0.8)",
                padding: 8,
                margin: 8,
                fontSize: 22,
            }}
        />
    );
}
```