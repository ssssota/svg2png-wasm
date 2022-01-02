
# svg2png-wasm benchmark

```yaml
  System:
    OS: Linux 5.11 Ubuntu 20.04.3 LTS (Focal Fossa)
    CPU: (2) x64 Intel(R) Xeon(R) Platinum 8272CL CPU @ 2.60GHz
    Memory: 3.35 GB / 6.79 GB
  Binaries:
    Node: 16.13.1 - /opt/hostedtoolcache/node/16.13.1/x64/bin/node
    npm: 8.1.2 - /opt/hostedtoolcache/node/16.13.1/x64/bin/npm
  npmPackages:
    sharp: ^0.29.2 => 0.29.2 
    svg2img: ^0.9.4 => 0.9.4 
    svg2png-wasm: link:.. => 1.3.2 
```


## icon

Source SVG: https://github.com/ssssota/svg2png-wasm/raw/main/logo.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|**1988 ops/s, ±16.22%**|![svg2png-wasm output](results/icon-svg2png-wasm.png)|
|sharp|335 ops/s, ±21.86%|![sharp output](results/icon-sharp.png)|
|svg2img|468 ops/s, ±4.37%|![svg2img output](results/icon-svg2img.png)|

_Sun Jan 02 2022 15:24:03 GMT+0000 (Coordinated Universal Time)_


## tiger

Source SVG: https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/tiger.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|20 ops/s, ±0.07%|![svg2png-wasm output](results/tiger-svg2png-wasm.png)|
|sharp|**21 ops/s, ±2.52%**|![sharp output](results/tiger-sharp.png)|
|svg2img|11 ops/s, ±4.37%|![svg2img output](results/tiger-svg2img.png)|

_Sun Jan 02 2022 15:24:00 GMT+0000 (Coordinated Universal Time)_

