#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')

// Load the Tabloid interpreter
const { tokenize, Parser, Environment } = require('./lib/tabloid-node')

// Synchronous input helper
function readlineSync(prompt) {
    const fs = require('fs')

    // For piped input (non-TTY), read synchronously from stdin one byte at a time until newline
    if (!process.stdin.isTTY) {
        process.stderr.write(prompt + ' ')
        const bytes = []
        const buffer = Buffer.alloc(1)
        try {
            while (true) {
                const bytesRead = fs.readSync(process.stdin.fd, buffer, 0, 1, null)
                if (bytesRead === 0) break  // EOF
                const byte = buffer[0]
                if (byte === 0x0A) break  // newline (\n)
                bytes.push(byte)
            }
            return Buffer.from(bytes).toString('utf8').trim()
        } catch (e) {
            return ''
        }
    }

    // For interactive TTY, use readline-sync
    try {
        const readlineSyncModule = require('readline-sync')
        return readlineSyncModule.question(prompt + ' ')
    } catch (e) {
        console.error('Error: readline-sync not installed. Run: npm install')
        process.exit(1)
    }
}

// Create runtime for Node.js
const runtime = {
    print: (val) => {
        console.log(val)
    },
    input: (prompt) => {
        return readlineSync(prompt)
    }
}

// REPL state
let globalEnv = new Environment(runtime)

function runProgram(code, isREPL = false) {
    try {
        // In REPL mode, auto-append PLEASE LIKE AND SUBSCRIBE if not present
        let processedCode = code.trim()
        if (isREPL && !processedCode.includes('PLEASE LIKE AND SUBSCRIBE')) {
            processedCode += '\nPLEASE LIKE AND SUBSCRIBE'
        }

        const tokens = tokenize(processedCode)
        const ast = new Parser(tokens).parse()
        const result = globalEnv.run(ast)
        return result
    } catch (e) {
        console.error('Error:', e.message)
        return undefined
    }
}

function startREPL() {
    console.log('╔═══════════════════════════════════════════════════════╗')
    console.log('║  Tabloid REPL - The Clickbait Programming Language!  ║')
    console.log('╚═══════════════════════════════════════════════════════╝')
    console.log('')
    console.log('Type Tabloid code and press Enter to execute.')
    console.log('Type PLEASE LIKE AND SUBSCRIBE or .exit to quit, .help for commands')
    console.log('')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '💣 > '
    })

    let multilineBuffer = ''
    let inMultiline = false

    rl.prompt()

    rl.on('line', (line) => {
        const trimmed = line.trim()

        // Handle commands
        if (trimmed.startsWith('.')) {
            const cmd = trimmed.substring(1)
            switch (cmd) {
            case 'exit':
            case 'quit':
                console.log('You won\'t want to miss... goodbye!')
                process.exit(0)
                break
            case 'help':
                console.log('Commands:')
                console.log('  .exit, .quit                  - Exit the REPL')
                console.log('  PLEASE LIKE AND SUBSCRIBE     - Exit the REPL (Tabloid style!)')
                console.log('  .clear                        - Clear the environment')
                console.log('  .help                         - Show this help')
                console.log('  .example                      - Show example code')
                console.log('')
                break
            case 'clear':
                globalEnv = new Environment(runtime)
                console.log('Environment cleared!')
                break
            case 'example':
                console.log('Example Tabloid code:')
                console.log('')
                console.log('  YOU WON\'T WANT TO MISS \'Hello, World!\'')
                console.log('  EXPERTS CLAIM x TO BE 42')
                console.log('  YOU WON\'T WANT TO MISS x PLUS 8')
                console.log('')
                console.log('  DISCOVER HOW TO greet WITH name')
                console.log('  RUMOR HAS IT')
                console.log('    YOU WON\'T WANT TO MISS \'Hello, \'')
                console.log('    YOU WON\'T WANT TO MISS name')
                console.log('  END OF STORY')
                console.log('')
                console.log('  greet OF \'World\'')
                console.log('')
                break
            default:
                console.log('Unknown command:', cmd)
            }
            rl.prompt()
            return
        }

        // Check if user wants to exit by typing the end-of-program keyword
        if (trimmed === 'PLEASE LIKE AND SUBSCRIBE') {
            console.log('You won\'t want to miss... goodbye!')
            process.exit(0)
        }

        // Check for multiline blocks
        if (trimmed.includes('RUMOR HAS IT') ||
            trimmed.includes('WHAT IF') ||
            trimmed.includes('DISCOVER HOW TO')) {
            inMultiline = true
        }

        if (inMultiline) {
            multilineBuffer += line + '\n'
            if (trimmed.includes('END OF STORY') || trimmed.includes('PLEASE LIKE AND SUBSCRIBE')) {
                inMultiline = false
                const result = runProgram(multilineBuffer, true)
                if (result !== undefined) {
                    console.log('→', result)
                }
                multilineBuffer = ''
            }
            rl.setPrompt(inMultiline ? '... ' : '💣 > ')
        } else if (trimmed) {
            const result = runProgram(line, true)
            if (result !== undefined) {
                console.log('→', result)
            }
        }

        rl.prompt()
    })

    rl.on('close', () => {
        console.log('\nYou won\'t want to miss... goodbye!')
        process.exit(0)
    })
}

// Check if file argument provided
if (process.argv.length > 2) {
    const filename = process.argv[2]
    try {
        const code = fs.readFileSync(filename, 'utf8')
        runProgram(code)
    } catch (e) {
        console.error('Error reading file:', e.message)
        process.exit(1)
    }
} else {
    startREPL()
}
