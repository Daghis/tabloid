#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readlineSync = require('readline-sync')

// Load the Tabloid interpreter
const { Reader, Wordifier, tokenize, Parser, Environment, ReturnError, T, N } = require('./lib/tabloid-node')

// Runtime interface for Node.js
class NodeRuntime {
    constructor() {
        this.output = []
    }

    print(val) {
        console.log(val)
        this.output.push(val)
    }

    input(prompt) {
        return readlineSync.question(prompt + ' ')
    }
}

function runProgram(source, runtime = new NodeRuntime()) {
    try {
        const tokens = tokenize(source)
        const ast = new Parser(tokens).parse()
        const env = new Environment(runtime)
        env.run(ast)
        return runtime.output
    } catch (error) {
        console.error('Error:', error.message)
        process.exit(1)
    }
}

function repl() {
    console.log('Tabloid REPL - Press Ctrl+C to exit')
    console.log('Type Tabloid code or load a file with: .load <filename>')
    console.log('')

    const runtime = new NodeRuntime()

    while (true) {
        try {
            const line = readlineSync.question('tabloid> ')

            if (!line.trim()) continue

            if (line.startsWith('.load ')) {
                const filename = line.substring(6).trim()
                const source = fs.readFileSync(filename, 'utf-8')
                runProgram(source, runtime)
            } else if (line === '.exit') {
                break
            } else {
                runProgram(line, runtime)
            }
        } catch (error) {
            if (error.message === 'canceled') {
                console.log('\nGoodbye!')
                break
            }
            console.error('Error:', error.message)
        }
    }
}

// Main entry point
if (require.main === module) {
    const args = process.argv.slice(2)

    if (args.length === 0) {
        repl()
    } else {
        const filename = args[0]
        const source = fs.readFileSync(filename, 'utf-8')
        runProgram(source)
    }
}

module.exports = { runProgram, NodeRuntime }
