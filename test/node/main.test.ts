import { svg2png } from '../../main/index.cjs';

it('invalid svg', async () => {
  expect(() => svg2png('')).rejects.toThrow(
    'SVG data parsing failed cause the document does not have a root node',
  );
});
