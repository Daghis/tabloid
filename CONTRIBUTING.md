# Contributing to Tabloid

Thank you for your interest in contributing to Tabloid! This document provides guidelines for contributing to this project.

## Getting Started

Tabloid is a minimal project with no build process. To get started:

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/tabloid.git`
3. Install dependencies: `npm install`
4. Make your changes
5. Test your changes: `npm test`
6. Submit a pull request

## Development Setup

### Running the Web Interface

Simply open `static/index.html` in your browser or use a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (with npx)
npx serve static
```

Then navigate to `http://localhost:8000`

### Running the REPL

```bash
# Interactive mode
node tabloid-repl.js

# Run a file
node tabloid-repl.js path/to/program.tabloid
```

## Code Quality

### Linting

We use ESLint to maintain code quality. Before submitting a PR:

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors where possible
npm run lint:fix
```

### Testing

Add tests for new features in the `test/` directory:

```bash
# Run all tests
npm test
```

Tests are written in Tabloid itself and validated by executing them through the REPL.

## Project Structure

```
static/
  ├── index.html          # Web interface entry point
  ├── js/
  │   ├── lang.js         # Complete interpreter implementation
  │   ├── main.js         # Web UI (using Torus framework)
  │   └── torus.min.js    # UI framework
  ├── css/                # Styling
  └── img/                # Assets
test/                     # Test files (*.tabloid)
tabloid-repl.js          # Node.js REPL
```

## Interpreter Architecture

The interpreter in `static/js/lang.js` has a four-layer architecture:

1. **Wordifier** (lines 48-99): First tokenization pass
2. **Tokenizer** (lines 145-300): Keyword recognition
3. **Parser** (lines 321-535): AST construction
4. **Evaluator** (lines 551-703): Runtime execution

See `CLAUDE.md` for detailed architectural documentation.

## Making Changes

### Adding Keywords

To add a new keyword:

1. Add the token type to the `T` object (lines 101-130 in `lang.js`)
2. Update the Tokenizer to recognize the keyword
3. Update the Parser to handle the new syntax
4. Update the Evaluator to implement the behavior
5. Add tests demonstrating the new feature
6. Update the README with documentation

### Bug Fixes

- Write a test that demonstrates the bug
- Fix the bug
- Ensure all tests pass
- Update CHANGELOG.md

### Documentation

- Keep README.md up to date with language features
- Update CLAUDE.md if architectural changes are made
- Add examples for new features

## Pull Request Process

1. Ensure all tests pass (`npm test`)
2. Ensure code passes linting (`npm run lint`)
3. Update documentation as needed
4. Write a clear PR description explaining:
   - What changed
   - Why it changed
   - How you tested it
5. Link any related issues

## Code Style

- Indentation: 4 spaces
- Quotes: Single quotes for strings
- No semicolons
- See `.eslintrc.json` for complete style guide

## Questions?

Feel free to open an issue for discussion before starting work on major changes.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
