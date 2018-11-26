import { Observable } from 'tns-core-modules/data/observable';
// import { Syntaxhighlighter } from 'nativescript-syntaxhighlighter';
import { TextField } from "tns-core-modules/ui/text-field";
import { TextView } from "tns-core-modules/ui/text-view";
import { Syntaxhighlighter } from 'nativescript-syntaxhighlighter';

// const Syntaxhighlighter: any = require('nativescript-syntaxhighlighter');

export class HelloWorldModel extends Observable {
  // public message: string;
  private syntaxhighlighter: Syntaxhighlighter = new Syntaxhighlighter();
  private textView: TextView;
  private textField: TextField;

  constructor() {
    super();
  }

  onComponentLoaded(args){
    const view: TextView|TextField = <TextView|TextField>args.object;
    console.log("onComponentLoaded");

    switch(view.id){
        case "tv":
            this.textView = view as TextView;
            console.log("this.textView assigned!", this.textView);
            const attributedStringJS: NSAttributedString = this.syntaxhighlighter.highlightAsFastRender("const a = 5;", "js");
            this.textView.ios.attributedString = attributedStringJS;
            // textView.on("textChange", (argstv) => {
            //     console.dir(argstv);
            // });
            break;
        case "tf":
            this.textField = view as TextField;
            console.log("this.textField assigned!", this.textField);
            const attributedStringSwift: NSAttributedString = this.syntaxhighlighter.highlightAsFastRender("let a = 5;", "swift");
            this.textField.ios.attributedString = attributedStringSwift;
            // textField.on("textChange", (argstv) => {
            //     console.dir(argstv);
            // });
            break;
    }
  }
}

/*
nm demo.app/demo
000000000000d280 T _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtF
000000000000ea50 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFTo
000000000000d270 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFfA1_
000000000000e740 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFyycfU_
000000000000e980 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFyycfU_TA
*/