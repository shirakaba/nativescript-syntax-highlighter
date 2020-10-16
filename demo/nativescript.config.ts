import { NativeScriptConfig } from '@nativescript/core';

export default {
    id: 'uk.co.bottledlogic.nativescript.syntaxhighlighter.demo',
    appResourcesPath: 'App_Resources',
    useLegacyWorkflow: false,
    ios: {
        discardUncaughtJsExceptions: false,
    },
    android: {
        discardUncaughtJsExceptions: false,
        v8Flags: '--nolazy --expose_gc',
        markingMode: "none",
        suppressCallJSMethodExceptions: false,
    }
} as NativeScriptConfig;