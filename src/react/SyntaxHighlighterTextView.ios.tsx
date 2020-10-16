import * as React from "react";
import type { NativeScriptProps, TextViewAttributes } from "react-nativescript";
import type { SyntaxHighlighterTextView as NativeScriptSyntaxHighlighterTextView } from "../syntax-highlighter-text-view.ios";

interface SyntaxHighlighterTextViewAttributes extends TextViewAttributes {
    language?: string,
    theme?: string,
    returnDismissesKeyboard?: boolean,
    suggestedTextToFillOnTabPress?: string,
};

export function SyntaxHighlighterTextView(props: NativeScriptProps<SyntaxHighlighterTextViewAttributes, NativeScriptSyntaxHighlighterTextView>){
    // Assumes that user will register the element as "syntaxHighlighterTextView".
    return <syntaxHighlighterTextView {...props}/>;
}

declare global {
    module JSX {
        interface IntrinsicElements {
            syntaxHighlighterTextView: NativeScriptProps<SyntaxHighlighterTextViewAttributes, NativeScriptSyntaxHighlighterTextView>,
        }
    }
}