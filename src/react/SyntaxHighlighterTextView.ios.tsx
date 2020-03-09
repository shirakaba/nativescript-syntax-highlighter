import * as console from "react-nativescript/dist/shared/Logger";
import * as React from "react";
import { PropsWithoutForwardedRef } from "react-nativescript/dist/shared/NativeScriptComponentTypings";
import { SyntaxHighlighterTextView as NativeScriptSyntaxHighlighterTextView } from "../syntax-highlighter-text-view.ios";
import { TextViewComponentProps, TextView, _TextView } from "react-nativescript/dist/components/TextView";
import { register } from "react-nativescript/dist/client/ElementRegistry";
import { Container, HostContext } from "react-nativescript/dist/shared/HostConfigTypes";
// import { RNSFriendly } from "react-nativescript/dist/components/TextBase";
// import { TextView as NativeScriptTextView } from "@nativescript/core/ui/text-view";

interface SyntaxHighlighterTextViewProps {
    language?: string,
    theme?: string,
    returnDismissesKeyboard?: boolean,
    suggestedTextToFillOnTabPress?: string,
};

const elementKey: string = "syntaxHighlighterTextView";
register(
    elementKey,
    (
        props: Props,
        rootContainerInstance: Container,
        hostContext: HostContext,
    ) => {
        return new NativeScriptSyntaxHighlighterTextView();
    }
);

interface Props {
    // onPress
}

export type SyntaxHighlighterTextViewComponentProps<
    E extends NativeScriptSyntaxHighlighterTextView = NativeScriptSyntaxHighlighterTextView
> = Props /* & typeof _SyntaxHighlighterTextView.defaultProps */ & Partial<SyntaxHighlighterTextViewProps> & TextViewComponentProps<E>;

/**
 * A React wrapper around the NativeScript SyntaxHighlighter component.
 * https://facebook.github.io/react-native/docs/SyntaxHighlighter#color
 */
export class _SyntaxHighlighterTextView<
    P extends SyntaxHighlighterTextViewComponentProps<E>,
    S extends {},
    E extends NativeScriptSyntaxHighlighterTextView = NativeScriptSyntaxHighlighterTextView
> extends _TextView<P, S, E> {
    render() {
        const {
            forwardedRef,

            language,
            theme,

            onBlur,
            onFocus,
            onTextChange,

            onLoaded,
            onUnloaded,
            onAndroidBackPressed,
            onShowingModally,
            onShownModally,

            onTap,
            onDoubleTap,
            onPinch,
            onPan,
            onSwipe,
            onRotation,
            onLongPress,
            onTouch,

            onPropertyChange,

            text,
            formattedText,
            children,
            ...rest
        } = this.props;

        if(formattedText){
            console.warn(`[SyntaxHighlighterTextView] formattedText will be ignored in SyntaxHighlighterTextView.`);
        }

        if (text && code) {
            console.warn(`[SyntaxHighlighterTextView] Both text and code provided; shall use text.`);
        }

        const textContent = {
            [code ? "code" : "text"]: code || text,
        };

        return React.createElement(
            elementKey,
            {
                ...rest,
                language,
                theme,
                ...textContent,
                ref: forwardedRef || this.myRef,
            } as any,
            children
        );
    }
}

type OwnPropsWithoutForwardedRef = PropsWithoutForwardedRef<SyntaxHighlighterTextViewComponentProps<NativeScriptSyntaxHighlighterTextView>>;

export const $SyntaxHighlighterTextView: React.ComponentType<
    OwnPropsWithoutForwardedRef & React.ClassAttributes<NativeScriptSyntaxHighlighterTextView>
> = React.forwardRef<NativeScriptSyntaxHighlighterTextView, OwnPropsWithoutForwardedRef>(
    (props: React.PropsWithChildren<OwnPropsWithoutForwardedRef>, ref: React.RefObject<NativeScriptSyntaxHighlighterTextView>) => {
        const { children, ...rest } = props;

        return React.createElement(
            _SyntaxHighlighterTextView,
            {
                ...rest,
                forwardedRef: ref,
            },
            children
        );
    }
);