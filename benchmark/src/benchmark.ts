import { add, complete, cycle, suite } from 'benny';
import type { Summary } from 'benny/lib/internal/common-types';
import Renderers from './renderer';
const rendererEntries = Object.entries(Renderers);

export type BenchmarkResult = {
  summary: Summary;
  outputs: Record<string, Uint8Array>;
};

export const benchmark = async (svg: string): Promise<BenchmarkResult> => {
  const [outputs, summary] = await Promise.all([
    Promise.all(
      rendererEntries.map(
        async ([rendererName, render]) =>
          [rendererName, await render(svg)] as const,
      ),
    ).then((outputs) => Object.fromEntries<Uint8Array>(outputs)),
    suite(
      `Convert SVG to PNG`,
      ...rendererEntries.map(([rendererName, render]) =>
        add(rendererName, () => render(svg)),
      ),
      cycle(),
      complete(),
    ),
  ]);
  return { summary, outputs };
};
