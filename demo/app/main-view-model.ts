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
    // TODO: try exposing SyntaxHighligher class/methods to @objc and as public/open
    // this.message = this.syntaxhighlighter.message;
  }
}
