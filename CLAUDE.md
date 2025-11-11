# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tabloid is a minimal but Turing complete programming language inspired by clickbait headlines. It's a joke language implemented entirely in JavaScript as a web-based interpreter. The project has no build process, tests, or package management - it's a static website with three main JavaScript files.

## Architecture

The entire interpreter is contained in `static/js/lang.js` (~700 lines) with a four-layer architecture:

1. **Wordifier** (lines 48-99): First tokenization pass that splits source into word tokens. String literals are treated as single words, punctuation is separated.

2. **Tokenizer** (lines 145-300): Second tokenization pass that recognizes multi-word keywords like `DISCOVER HOW TO` (3 words → single token).

3. **Parser** (lines 321-535): Recursive descent parser that builds an AST. Expression-based grammar with no statement/expression distinction.

4. **Evaluator** (lines 551-703): Tree-walk interpreter using `Environment` class with lexical scoping via a stack of scope objects.

### Key Components

- **Reader class** (lines 8-42): Generic stream reader used by both Wordifier and Parser
- **Environment class** (lines 551+): Runtime evaluation with scope management, uses `ReturnError` exception for early returns from functions
- **Frontend** (`static/js/main.js`): Uses Torus UI framework to render the web interface

## Language Semantics

- Expression-based: Everything is an expression; implicit return of last expression value
- No operator precedence: Use parentheses for chaining operators like `3 PLUS (2 TIMES 10)`
- No loops: Turing completeness achieved via recursion only
- Types: numbers, strings, booleans (values match JavaScript semantics)
- Scoping: Lexical scoping with function-level scopes

## File Structure

```
static/
  index.html       - Single-page app entry point
  js/
    lang.js        - Complete interpreter (tokenizer → evaluator)
    main.js        - Torus-based UI with sample programs
    torus.min.js   - UI framework dependency
  css/             - Styling
  img/             - Assets
```

## Development

This project has no build, test, or dependency management systems. To work with it:

- Open `static/index.html` in a browser (or use a local web server)
- Edit `static/js/lang.js` for interpreter changes
- Edit `static/js/main.js` for UI changes
- No transpilation, bundling, or compilation required

### Command-Line REPL

A Node.js-based REPL is available:
- First run `npm install` to install dependencies (readline-sync)
- `node tabloid-repl.js` - Start interactive REPL
- `node tabloid-repl.js program.tabloid` - Execute a file
- `echo "input" | node tabloid-repl.js program.tabloid` - Pipe input to program
- See README-REPL.md for usage details

## Language Keywords Reference

Core syntax keywords are defined in the `T` object (lines 101-130):
- Functions: `DISCOVER HOW TO`, `WITH`, `OF`, `SHOCKING DEVELOPMENT` (return)
- Control flow: `WHAT IF`, `LIES!` (else)
- Blocks: `RUMOR HAS IT`, `END OF STORY`
- Variables: `EXPERTS CLAIM`, `TO BE`
- I/O: `YOU WON'T WANT TO MISS` (print), `LATEST NEWS ON` (input)
- Booleans: `TOTALLY RIGHT` (true), `COMPLETELY WRONG` (false)
- Operators: `IS ACTUALLY` (==), `PLUS`, `MINUS`, `TIMES`, `DIVIDED BY`, `MODULO`, `BEATS` (>), `SMALLER THAN` (<), `AND`, `OR`
- Program end: `PLEASE LIKE AND SUBSCRIBE`
- Comments: `SOURCES SAY` ... `THAT'S THE RUMOR` (block)

## Comments

Tabloid supports block comments - everything between `SOURCES SAY` and `THAT'S THE RUMOR` is ignored:

```tabloid
SOURCES SAY
    This entire section is ignored
    Can span multiple lines
    Indent for readability
THAT'S THE RUMOR
```

Comment keywords in string literals are treated as normal text and don't trigger comment behavior.

## Notes

- No error locations reported on parse/runtime errors
- Newlines are not significant - entire programs can be single-line
- Unclosed block comments will throw a syntax error
