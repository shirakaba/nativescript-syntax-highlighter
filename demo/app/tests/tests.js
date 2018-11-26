var Syntaxhighlighter = require("nativescript-syntaxhighlighter").Syntaxhighlighter;
var syntaxhighlighter = new Syntaxhighlighter();

describe("greet function", function() {
    it("exists", function() {
        expect(syntaxhighlighter.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(syntaxhighlighter.greet()).toEqual("Hello, NS");
    });
});