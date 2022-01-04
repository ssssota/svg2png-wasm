import { createRenderer } from './types';
import { readFile, unlink } from 'fs/promises'
import { spawn } from 'child_process'
const call = (cmd: string, args: string[], hook?: (p: any) => void) => new Promise((resolve, reject) => {
  const p = spawn(cmd, args)

  const stdout: Buffer[] = []
  const stderr: Buffer[] = []
  p.stdout.on('data', (data: Buffer) => {
    stdout.push(data)
  })
  p.stderr.on('data', (data: Buffer) => {
    stderr.push(data)
  })

  p.once('close', (code) => {
    if (code === 0) {
      resolve(code)
      return
    }
    reject(new Error(`Exit status not 0: ${code}\n${Buffer.concat(stderr)}`))
  })

  if (hook) {
    hook(p)
  }
})

export default createRenderer({
  render: async (svg: string) => {
    // resvg only accept file output

    const rand = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    const outFile = `/tmp/resvg-${rand}.png`

    await call('resvg', ['--skip-system-fonts', '-', outFile], (p: any) => {
      // write svg to stdin
      p.stdin.end(svg)
    })

    const res = await readFile(outFile)

    unlink(outFile)

    return res
  },
})
