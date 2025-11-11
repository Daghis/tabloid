# Tabloid REPL

A command-line REPL and file executor for the Tabloid programming language.

## Installation

First, install dependencies:

```bash
npm install
```

## Usage

### Interactive REPL

Start the REPL by running:

```bash
node tabloid-repl.js
```

Then type Tabloid code at the prompt:

```
💣 > YOU WON'T WANT TO MISS 'Hello, World!'
Hello, World!
💣 > EXPERTS CLAIM x TO BE 42
💣 > YOU WON'T WANT TO MISS x PLUS 8
50
```

### Execute a File

Run a Tabloid program file:

```bash
node tabloid-repl.js program.tabloid
```

## REPL Commands

- `.exit` or `.quit` - Exit the REPL
- `PLEASE LIKE AND SUBSCRIBE` - Exit the REPL (the Tabloid way!)
- `.clear` - Clear the environment (reset all variables and functions)
- `.help` - Show help information
- `.example` - Show example Tabloid code

## Features

- **Multiline Support**: Functions and blocks automatically enter multiline mode
- **Auto-completion**: PLEASE LIKE AND SUBSCRIBE is automatically added in REPL mode
- **Persistent State**: Variables and functions persist across REPL commands
- **Error Handling**: Displays error messages without crashing

## Example Session

```
💣 > DISCOVER HOW TO factorial WITH n
... RUMOR HAS IT
...     WHAT IF n IS ACTUALLY 0
...         SHOCKING DEVELOPMENT 1
...     LIES!
...         SHOCKING DEVELOPMENT n TIMES factorial OF n MINUS 1
... END OF STORY
💣 > factorial OF 5
→ 120
```

## Notes

- In REPL mode, you don't need to end each line with `PLEASE LIKE AND SUBSCRIBE`
- When running files, the program must end with `PLEASE LIKE AND SUBSCRIBE`
- Multi-line blocks are detected automatically when using `DISCOVER HOW TO`, `RUMOR HAS IT`, or `WHAT IF`
