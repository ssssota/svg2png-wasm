import { createRenderer } from './types';
import { readFile, unlink } from 'fs/promises';
import { spawn, ChildProcess } from 'child_process';
const call = (
  cmd: string,
  args: string[],
  hook?: (p: ChildProcess) => void,
): Promise<{
  stdout: Buffer;
  stderr: Buffer;
}> =>
  new Promise((resolve, reject) => {
    const p = spawn(cmd, args);

    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    p.stdout.on('data', (data: Buffer) => {
      stdout.push(data);
    });
    p.stderr.on('data', (data: Buffer) => {
      stderr.push(data);
    });

    p.once('close', (code) => {
      const err = Buffer.concat(stderr);
      const out = Buffer.concat(stdout);
      if (code === 0) {
        resolve({
          stderr: err,
          stdout: out,
        });
        return;
      }
      reject(new Error(`Exit status not 0: ${code}\n${err}`));
    });

    if (hook) {
      hook(p);
    }
  });

export default createRenderer({
  init: async () => {
    const { stdout } = await call('resvg', ['--help']);

    if (!`${stdout}`.includes('--version')) {
      throw new Error('resvg bin not valid');
    }
  },

  render: async (svg: string) => {
    // resvg only accept file output

    const rand = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const outFile = `/tmp/resvg-${rand}.png`;

    await call(
      'resvg',
      ['--skip-system-fonts', '-', outFile],
      (p: ChildProcess) => {
        // write svg to stdin
        if (p.stdin) {
          p.stdin.end(svg);
        }
      },
    );

    const res = await readFile(outFile);

    unlink(outFile);

    return res;
  },
});
