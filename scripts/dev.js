import { spawn } from 'node:child_process'
import readline from 'node:readline'

const isWindows = process.platform === 'win32'
const npmCommand = isWindows ? 'npm.cmd' : 'npm'

const services = [
  { name: 'backend', args: ['--prefix', 'backend', 'run', 'dev'] },
  { name: 'frontend', args: ['--prefix', 'frontend', 'run', 'dev'] },
]

let stopping = false
const children = []

for (const { name, args } of services) {
  const child = isWindows
    ? spawn('cmd.exe', ['/d', '/s', '/c', [npmCommand, ...args].join(' ')], {
        stdio: ['inherit', 'pipe', 'pipe'],
      })
    : spawn(npmCommand, args, { stdio: ['inherit', 'pipe', 'pipe'] })
  children.push(child)

  for (const stream of [child.stdout, child.stderr]) {
    readline.createInterface({ input: stream }).on('line', (line) => {
      console.log(`[${name}] ${line}`)
    })
  }

  child.on('exit', (code, signal) => {
    if (stopping) return
    console.log(`[${name}] berhenti (${signal || `kode ${code}`})`)
    stop(code || 1)
  })
}

function stop(code = 0) {
  if (stopping) return
  stopping = true

  for (const child of children) {
    if (child.exitCode !== null || child.signalCode !== null) continue
    if (isWindows) {
      spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' })
    } else {
      child.kill('SIGTERM')
    }
  }

  process.exitCode = code
}

process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
