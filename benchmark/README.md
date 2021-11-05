
# svg2png-wasm benchmark

```yaml
  System:
    OS: Linux 5.11 Ubuntu 20.04.3 LTS (Focal Fossa)
    CPU: (2) x64 Intel(R) Xeon(R) Platinum 8272CL CPU @ 2.60GHz
    Memory: 3.12 GB / 6.79 GB
  Binaries:
    Node: 14.18.1 - /opt/hostedtoolcache/node/14.18.1/x64/bin/node
    npm: 6.14.15 - /opt/hostedtoolcache/node/14.18.1/x64/bin/npm
  npmPackages:
    sharp: ^0.29.2 => 0.29.2 
    svg2img: ^0.9.4 => 0.9.4 
    svg2png-wasm: link:.. => 1.3.0 
```


## icon

Source SVG: https://github.com/ssssota/svg2png-wasm/raw/main/logo.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|**1923 ops/s, ±15.91%**|![svg2png-wasm output](results/icon-svg2png-wasm.png)|
|sharp|351 ops/s, ±13.21%|![sharp output](results/icon-sharp.png)|
|svg2img|445 ops/s, ±2.99%|![svg2img output](results/icon-svg2img.png)|

_Thu Nov 04 2021 16:18:08 GMT+0000 (Coordinated Universal Time)_


## tiger

Source SVG: https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/tiger.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|svg2png-wasm|19 ops/s, ±0.24%|![svg2png-wasm output](results/tiger-svg2png-wasm.png)|
|sharp|**21 ops/s, ±1.6%**|![sharp output](results/tiger-sharp.png)|
|svg2img|10 ops/s, ±4.46%|![svg2img output](results/tiger-svg2img.png)|

_Thu Nov 04 2021 16:18:06 GMT+0000 (Coordinated Universal Time)_

