
# svg2png-wasm benchmark

```yaml
  System:
    OS: Windows 10 10.0.19042
    CPU: (12) x64 AMD Ryzen 5 2600 Six-Core Processor            
    Memory: 4.91 GB / 15.93 GB
  Binaries:
    Node: 14.17.0 - C:\Program Files\nodejs\node.EXE
    npm: 7.20.2 - C:\Program Files\nodejs\npm.CMD
  npmPackages:
    sharp: ^0.29.2 => 0.29.2 
    svg2img: ^0.9.4 => 0.9.4 
    svg2png-wasm: link:.. => 1.3.0 
```


## icon

Source SVG: https://github.com/ssssota/svg2png-wasm/raw/main/logo.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|sharp|307 ops/s, ±39.94%|![sharp output](results/icon-sharp.png)|
|svg2img|421 ops/s, ±5.3%|![svg2img output](results/icon-svg2img.png)|
|svg2png-wasm|**1490 ops/s, ±1.25%**|![svg2png-wasm output](results/icon-svg2png-wasm.png)|

_Thu Nov 04 2021 23:53:25 GMT+0900 (Japan Standard Time)_


## tiger

Source SVG: https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/tiger.svg

|Renderer|Speed|Output|
|:-------|----:|:----:|
|sharp|**27 ops/s, ±1.43%**|![sharp output](results/tiger-sharp.png)|
|svg2img|9 ops/s, ±3.83%|![svg2img output](results/tiger-svg2img.png)|
|svg2png-wasm|13 ops/s, ±0.91%|![svg2png-wasm output](results/tiger-svg2png-wasm.png)|

_Thu Nov 04 2021 23:53:25 GMT+0900 (Japan Standard Time)_

