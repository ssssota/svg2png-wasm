
# svg2png-wasm benchmark

```yaml
  System:
    OS: Linux 5.11 Ubuntu 20.04.3 LTS (Focal Fossa)
    CPU: (2) x64 Intel(R) Xeon(R) CPU E5-2673 v4 @ 2.30GHz
    Memory: 3.11 GB / 6.79 GB
  Binaries:
    Node: 16.13.1 - /opt/hostedtoolcache/node/16.13.1/x64/bin/node
    npm: 8.1.2 - /opt/hostedtoolcache/node/16.13.1/x64/bin/npm
  npmPackages:
    sharp: ^0.29.3 => 0.29.3 
    svg2png-wasm: link:.. => 1.3.2 
```


## icon

Source SVG: https://github.com/ssssota/svg2png-wasm/raw/main/logo.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|2136 ops/s, ±1.3%|![svg2png-wasm output](results/icon-svg2png-wasm.png)|
|resvg-js|**3875 ops/s, ±1.45%**|![resvg-js output](results/icon-resvg-js.png)|
|resvg|158 ops/s, ±1.71%|![resvg output](results/icon-resvg.png)|
|sharp|378 ops/s, ±1.2%|![sharp output](results/icon-sharp.png)|

_Tue Jan 04 2022 12:34:33 GMT+0000 (Coordinated Universal Time)_


## tiger

Source SVG: https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/tiger.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|19 ops/s, ±1.49%|![svg2png-wasm output](results/tiger-svg2png-wasm.png)|
|resvg-js|**44 ops/s, ±1.05%**|![resvg-js output](results/tiger-resvg-js.png)|
|resvg|31 ops/s, ±1.62%|![resvg output](results/tiger-resvg.png)|
|sharp|22 ops/s, ±1.31%|![sharp output](results/tiger-sharp.png)|

_Tue Jan 04 2022 12:34:57 GMT+0000 (Coordinated Universal Time)_


## text

Source SVG: https://raw.githubusercontent.com/yisibl/resvg-js/main/example/text.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|2 ops/s, ±2.39%|![svg2png-wasm output](results/text-svg2png-wasm.png)|
|resvg-js|**13 ops/s, ±1.12%**|![resvg-js output](results/text-resvg-js.png)|
|resvg|9 ops/s, ±1.37%|![resvg output](results/text-resvg.png)|
|sharp|11 ops/s, ±1.24%|![sharp output](results/text-sharp.png)|

_Tue Jan 04 2022 12:35:23 GMT+0000 (Coordinated Universal Time)_


## animeGirl

Source SVG: https://upload.wikimedia.org/wikipedia/commons/c/c2/Anime_Girl.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|0.02 ops/s, ±1.17%|![svg2png-wasm output](results/animeGirl-svg2png-wasm.png)|
|resvg-js|**0.2 ops/s, ±3.76%**|![resvg-js output](results/animeGirl-resvg-js.png)|
|resvg|0.18 ops/s, ±3.4%|![resvg output](results/animeGirl-resvg.png)|
|sharp|0.19 ops/s, ±7.35%|![sharp output](results/animeGirl-sharp.png)|

_Tue Jan 04 2022 12:44:57 GMT+0000 (Coordinated Universal Time)_

