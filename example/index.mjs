import { svg2png } from 'svg2png';
import { writeFileSync } from 'fs';

svg2png(`
  <svg id="source" width="100px" height="100px" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100"/>
  </svg>
`)
  .then((res) => {
    writeFileSync('./output.mjs.png', res);
  })
  .catch(console.error);
