const { execFileSync } = require('node:child_process')
const { appendFileSync } = require('node:fs')
const { join } = require('node:path')

// Run-owned synthetic Preview evidence only. The project is removed after review.
const cli = 'C:\\Users\\alnaseem\\AppData\\Local\\npm-cache\\_npx\\83bd54333fc77407\\node_modules\\vercel\\dist\\vc.js'
const origin = 'https://labos-s001-probe-20261002-1526-a84e-lwis5avjm.vercel.app'
const out = join(__dirname, 'preview-matrix-raw.jsonl')
const fixtures = ['baseline', 'progressive', 'grayscale', 'truncated', 'short_entropy_eoi', 'corrupt_entropy', 'trailing_bytes']

for (let round = 1; round <= 2; round++) {
  for (const backend of ['julusian', 'sharp']) {
    for (const fixture of fixtures) {
      let row
      try {
        const url = `${origin}/api/probe?backend=${backend}&fixture=${fixture}`
        const stdout = execFileSync(process.execPath, [cli, 'curl', url, '--scope', 'ali-leftas-projects', '--', '--silent', '--show-error'], {
          encoding: 'utf8', timeout: 25000, maxBuffer: 16384, windowsHide: true,
          stdio: ['ignore', 'pipe', 'ignore'],
        })
        const response = JSON.parse(stdout.trim())
        row = { round, backend, fixture, status: 'response', response }
      } catch {
        row = { round, backend, fixture, status: 'request_failed' }
      }
      appendFileSync(out, `${JSON.stringify(row)}\n`)
      process.stdout.write(`${round} ${backend} ${fixture} ${row.status}${row.response ? ` ${row.response.outcome}` : ''}\n`)
    }
  }
}
