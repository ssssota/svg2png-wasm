import { add, complete, cycle, suite } from 'benny';
import type { Summary } from 'benny/lib/internal/common-types';
import Renderers from './renderer';
const rendererEntries = Object.entries(Renderers);

export type BenchmarkResult = {
  summary: Summary;
  outputs: Record<string, Uint8Array>;
};

export const benchmark = async (
  title: string,
  svg: string,
): Promise<BenchmarkResult> => {
  const outputs = await Promise.all(
    rendererEntries.map(async ([rendererName, renderer]) => {
      if (renderer.init) {
        await renderer.init();
      }

      return [rendererName, await renderer.render(svg)] as const;
    }),
  ).then((outputs) => Object.fromEntries<Uint8Array>(outputs));

  const summary = await suite(
    `Convert SVG to PNG: ${title}`,
    ...rendererEntries.map(([rendererName, renderer]) =>
      add(rendererName, () => renderer.render(svg)),
    ),
    cycle(),
    complete(),
  );

  return { summary, outputs };
};
