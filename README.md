# NativeScript Syntax Highlighter (AKA SyntaxHighlighterTextView)

A Text View (SyntaxHighlighterTextView, for iOS only) or View (SyntaxHighlighterView for Android) that can highlight syntax!

* SyntaxHighlighterTextView, for iOS only (a TextView)
* SyntaxHighlighterView, for iOS (a View that acts a lot like a TextView) and Android (a WebView)

## State of project

I'm not actively maintaining this. I use the SyntaxHighlighterTextView in [NSIDE](https://github.com/shirakaba/nside), for iOS, via React NativeScript, and that's it. It's likely broken in various areas.

## Installation

For all NativeScript platforms, you'll first need to begin with:

```sh
tns plugin add nativescript-syntax-highlighter
```

### With React

For React, you'll additionally need to do this:

```ts
import { registerElement } from "react-nativescript";

registerElement('syntaxHighlighterTextView', () => require('nativescript-syntax-highlighter').Gradient);
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