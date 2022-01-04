import envinfo from 'envinfo';
import fetch from 'node-fetch';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { exit } from 'process';
import { benchmark } from './benchmark';
import Renderer from './renderer';

const svgUrlMap = {
  icon: 'https://github.com/ssssota/svg2png-wasm/raw/main/logo.svg',
  tiger: 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/tiger.svg',
  text: 'https://raw.githubusercontent.com/yisibl/resvg-js/main/example/text.svg',
  animeGirl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Anime_Girl.svg',
};

const createMarkdown = (reports: string[], env: string) => `
# svg2png-wasm benchmark

\`\`\`yaml
${env.replace(/^[\r\n]+/, '').replace(/[\r\n]+$/, '')}
\`\`\`

${reports.join('\n')}
`;

const createReport = async (
  title: string,
  svgUrl: string,
  imageDir = 'results',
): Promise<string> => {
  if (!existsSync(imageDir)) mkdirSync(imageDir);
  const svg = await fetch(svgUrl).then((res) => res.text());
  const { summary, outputs } = await benchmark(title, svg);
  Object.entries(outputs).map(([rendererName, output]) => {
    writeFileSync(`${imageDir}/${title}-${rendererName}.png`, output);
  });
  return `
## ${title}

Source SVG: ${svgUrl}

|Renderer|Speed|Output|
|:-------|----:|:----:|
${summary.results
      .map(({ name, ops, margin }) => {
        const emphasis = name === summary.fastest.name ? '**' : '';
        const entries = [
          name,
          `${emphasis}${ops} ops/s, ±${margin}%${emphasis}`,
          `![${name} output](${imageDir}/${title}-${name}.png)`,
        ];
        return `|${entries.join('|')}|`;
      })
      .join('\n')}

_${summary.date.toString()}_
`;
};

const main = async () => {
  const reports: string[] = []
  const entries = Object.entries(svgUrlMap)
  // Benchmarks should not parallelize.
  for (const [title, svgUrl] of entries) {
    const r = await createReport(title, svgUrl)
    reports.push(r)
  }
  const env = await envinfo.run({
    System: ['OS', 'CPU', 'Memory'],
    Binaries: ['Node', 'npm'],
    npmPackages: Object.keys(Renderer),
  });
  const markdown = createMarkdown(reports, env);
  writeFileSync('README.md', markdown);
};

main()
  .then(() => exit(0))
  .catch((e) => {
    console.error(e);
    exit(1);
  });
