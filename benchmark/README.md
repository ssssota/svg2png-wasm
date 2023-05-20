
# svg2png-wasm benchmark

```yaml
  System:
    OS: Linux 5.15 Ubuntu 22.04.2 LTS 22.04.2 LTS (Jammy Jellyfish)
    CPU: (2) x64 Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz
    Memory: 5.41 GB / 6.78 GB
  Binaries:
    Node: 18.16.0 - /opt/hostedtoolcache/node/18.16.0/x64/bin/node
    npm: 9.5.1 - /opt/hostedtoolcache/node/18.16.0/x64/bin/npm
  npmPackages:
    sharp: ^0.32.1 => 0.32.1 
    svg2img: ^1.0.0-beta.2 => 1.0.0-beta.2 
    svg2png-wasm: workspace:.. => 0.0.0-development 
```


## icon

Source SVG: https://github.com/ssssota/svg2png-wasm/raw/main/logo.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|4046 ops/s, ±7.02%|![svg2png-wasm output](results/icon-svg2png-wasm.png)|
|resvg-js|**6059 ops/s, ±0.47%**|![resvg-js output](results/icon-resvg-js.png)|
|resvg|162 ops/s, ±1.25%|![resvg output](results/icon-resvg.png)|
|sharp|748 ops/s, ±1.74%|![sharp output](results/icon-sharp.png)|
|svg2img|207 ops/s, ±1.29%|![svg2img output](results/icon-svg2img.png)|

_Sat May 20 2023 04:28:18 GMT+0000 (Coordinated Universal Time)_


## tiger

Source SVG: https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/tiger.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|22 ops/s, ±0.13%|![svg2png-wasm output](results/tiger-svg2png-wasm.png)|
|resvg-js|**46 ops/s, ±0.33%**|![resvg-js output](results/tiger-resvg-js.png)|
|resvg|37 ops/s, ±1.08%|![resvg output](results/tiger-resvg.png)|
|sharp|28 ops/s, ±0.26%|![sharp output](results/tiger-sharp.png)|
|svg2img|35 ops/s, ±0.28%|![svg2img output](results/tiger-svg2img.png)|

_Sat May 20 2023 04:28:48 GMT+0000 (Coordinated Universal Time)_


## text

Source SVG: https://raw.githubusercontent.com/yisibl/resvg-js/main/example/text.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|3.9 ops/s, ±0.18%|![svg2png-wasm output](results/text-svg2png-wasm.png)|
|resvg-js|**13.8 ops/s, ±0.12%**|![resvg-js output](results/text-resvg-js.png)|
|resvg|12.2 ops/s, ±0.39%|![resvg output](results/text-resvg.png)|
|sharp|13.2 ops/s, ±0.99%|![sharp output](results/text-sharp.png)|
|svg2img|12.8 ops/s, ±0.13%|![svg2img output](results/text-svg2img.png)|

_Sat May 20 2023 04:29:19 GMT+0000 (Coordinated Universal Time)_


## animeGirl

Source SVG: https://upload.wikimedia.org/wikipedia/commons/c/c2/Anime_Girl.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|0.11 ops/s, ±0.23%|![svg2png-wasm output](results/animeGirl-svg2png-wasm.png)|
|resvg-js|0.21 ops/s, ±0.08%|![resvg-js output](results/animeGirl-resvg-js.png)|
|resvg|**0.243 ops/s, ±0.6%**|![resvg output](results/animeGirl-resvg.png)|
|sharp|0.209 ops/s, ±21.22%|![sharp output](results/animeGirl-sharp.png)|
|svg2img|0.213 ops/s, ±0.13%|![svg2img output](results/animeGirl-svg2img.png)|

_Sat May 20 2023 04:32:52 GMT+0000 (Coordinated Universal Time)_

