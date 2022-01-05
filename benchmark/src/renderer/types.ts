export type Render = (svg: string) => Promise<Uint8Array>;

export type Renderer = {
  init?: () => Promise<void>;
  render: Render;
};

export const createRenderer = (r: Renderer) => r;
