#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const TEST_DIR = __dirname
const REPL = path.join(__dirname, '..', 'tabloid-repl.js')

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
}

function log(color, ...args) {
    console.log(color + args.join(' ') + colors.reset)
}

function runTest(testFile) {
    const testName = path.basename(testFile, '.tabloid')

    try {
        const output = execSync(`node "${REPL}" "${testFile}"`, {
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe']
        })

        log(colors.green, `✓ ${testName}`)
        return { name: testName, passed: true, output }
    } catch (error) {
        log(colors.red, `✗ ${testName}`)
        console.error(colors.red + error.message + colors.reset)
        if (error.stdout) {
            console.log('Output:', error.stdout)
        }
        if (error.stderr) {
            console.error('Error:', error.stderr)
        }
        return { name: testName, passed: false, error: error.message }
    }
}

function main() {
    log(colors.blue, '\n Running Tabloid Tests\n' + '='.repeat(40))

    // Find all .tabloid files in test directory
    const testFiles = fs.readdirSync(TEST_DIR)
        .filter(f => f.endsWith('.tabloid'))
        .map(f => path.join(TEST_DIR, f))

    if (testFiles.length === 0) {
        log(colors.yellow, 'No test files found in test directory')
        process.exit(0)
    }

    log(colors.blue, `Found ${testFiles.length} test file(s)\n`)

    const results = testFiles.map(runTest)

    const passed = results.filter(r => r.passed).length
    const failed = results.filter(r => !r.passed).length

    log(colors.blue, '\n' + '='.repeat(40))
    log(colors.blue, `Test Summary: ${passed} passed, ${failed} failed`)

    if (failed > 0) {
        process.exit(1)
    }
}

main()
