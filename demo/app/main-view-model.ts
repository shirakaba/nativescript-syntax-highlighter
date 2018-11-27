import { Observable } from 'tns-core-modules/data/observable';
import { Page, View } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import { TextView } from "tns-core-modules/ui/text-view";
import { SyntaxHighlighter, CodeAttributedStringWrapper } from 'nativescript-syntax-highlighter';

import { FlexboxLayout } from 'tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout';

export class HelloWorldModel extends Observable {
  private syntaxHighlighter: SyntaxHighlighter = new SyntaxHighlighter();
  private codeAttributedStringWrapper: CodeAttributedStringWrapper = new CodeAttributedStringWrapper();
  private textField: TextField;
  private textView1: TextView;
  private textView2: TextView;

  constructor() {
    super();

    console.log(this.codeAttributedStringWrapper);
  }

  navigatingTo(args) {
    console.log("navigatingTo();");
    const page: Page = <Page> args.object;
    page.bindingContext = this;
    console.log(`page.content:`, page.content);
    const content: FlexboxLayout = page.content as FlexboxLayout;
    content.eachLayoutChild((child: View, isLast: boolean) => {
      console.log(`layoutChild:`, child);
      switch(child.id){
        case "tf":
            this.textField = child as TextField;
            console.log("this.textField assigned!", this.textField);
            const attributedStringSwift: NSAttributedString = this.syntaxHighlighter.highlightAsFastRender("let a = 5;", "swift");
            console.log("this.textField.ios:", this.textField.ios);
            (this.textField.ios as UITextField).attributedText = attributedStringSwift;
            // textField.on("textChange", (argstv) => {
            //     console.dir(argstv);
            // });
            break;
        case "tv1":
            this.textView1 = child as TextView;
            console.log("this.textView1 assigned!", this.textView1);
            const attributedStringJS: NSAttributedString = this.syntaxHighlighter.highlightAsFastRender("const a = 5;", "js");
            console.log("this.textView1.ios:", this.textView1.ios);
            (this.textView1.ios as UITextView).attributedText = attributedStringJS;
            // textView.on("textChange", (argstv) => {
            //     console.dir(argstv);
            // });
            break;
        case "tv2":
            this.textView2 = child as TextView;
            console.log("this.textView2 assigned!", this.textView2);
            // const attributedStringJS: NSAttributedString = this.syntaxHighlighter.highlightAsFastRender("const a = 5;", "js");
            // console.log("this.textView2.ios:", this.textView2.ios);
            // (this.textView.ios as UITextView).attributedText = attributedStringJS;
            // textView.on("textChange", (argstv) => {
            //     console.dir(argstv);
            // });
            break;
      }
      return true;
    })
  }

  // onComponentLoaded(args){
  //   const view: TextView|TextField = <TextView|TextField>args.object;
  //   console.log("onComponentLoaded");

  //   switch(view.id){
  //       case "tv":
  //           this.textView = view as TextView;
  //           console.log("this.textView assigned!", this.textView);
  //           const attributedStringJS: NSAttributedString = this.syntaxhighlighter.highlightAsFastRender("const a = 5;", "js");
  //           this.textView.ios.attributedString = attributedStringJS;
  //           // textView.on("textChange", (argstv) => {
  //           //     console.dir(argstv);
  //           // });
  //           break;
  //       case "tf":
  //           this.textField = view as TextField;
  //           console.log("this.textField assigned!", this.textField);
  //           const attributedStringSwift: NSAttributedString = this.syntaxhighlighter.highlightAsFastRender("let a = 5;", "swift");
  //           this.textField.ios.attributedString = attributedStringSwift;
  //           // textField.on("textChange", (argstv) => {
  //           //     console.dir(argstv);
  //           // });
  //           break;
  //   }
  // }
}

/*
nm demo.app/demo
000000000000d280 T _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtF
000000000000ea50 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFTo
000000000000d270 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFfA1_
000000000000e740 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFyycfU_
000000000000e980 t _$S10HighlightrAAC9highlight_2as10fastRenderSo18NSAttributedStringCSgSS_SSSgSbtFyycfU_TA
*/