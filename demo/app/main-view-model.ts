import { Observable } from 'tns-core-modules/data/observable';
// import { Syntaxhighlighter } from 'nativescript-syntaxhighlighter';
import { Syntaxhighlighter } from 'nativescript-syntaxhighlighter';

// const Syntaxhighlighter: any = require('nativescript-syntaxhighlighter');

export class HelloWorldModel extends Observable {
  public message: string;
  private syntaxhighlighter: Syntaxhighlighter;

  constructor() {
    super();

    this.syntaxhighlighter = new Syntaxhighlighter();

/*
000000000000d280 T _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtF
000000000000ea50 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFTo
000000000000d270 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFfA1_
000000000000e740 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFyycfU_
000000000000e980 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFyycfU_TA
*/

    // TODO: use renamed function
    // highlightCodeAs x
    // highlightCodeAsFastRender x
    // highlight x
    // highlightAs x
    this.syntaxhighlighter.highlightAsFastRender("const a;", "js");
    // TODO: try exposing SyntaxHighligher class/methods to @objc and as public/open
    // e.g. https://github.com/sberrevoets/SDCAlertView/blob/master/Source/AlertController.swift
    // @objc(Highlightr)

    // this.message = this.syntaxhighlighter.message;
  }
}
