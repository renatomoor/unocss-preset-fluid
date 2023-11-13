# Unocss Preset Fluid
Elegantly scale type and space without breakpoints.  
A fluid fonts and spaces utilites for unocss inspired by [Utopia](https://utopia.fyi/).

## Installation
```bash
npm i unocss-preset-fluid unocss --save-dev # with npm
yarn add unocss-preset-fluid unocss -D # with yarn
pnpm add unocss-preset-fluid unocss -D # with pnpm
```

## Usage

```js
import { defineConfig } from 'unocss'
import { presetFluid } from 'unocss-preset-fluid'

export default defineConfig({
  presets: [
    presetFluid({
      // options
    }),
  ],
})
```

### Options

Example:
```js
{
    maxWidth: 1440,
    minWidth: 375,
    extendMaxWidth: null,
    extendMinWidth: null,
    remBase: 16,
    useRemByDefault: false,
}
```

#### MaxWidth `1440`
This is the width in pixel where the fluid will stop growing.

#### MinWidth `375`
This is the width in pixel where the fluid will stop shrinking.

#### ExtendMaxWidth `null`
This is the width in pixel where the fluid will stop growing but keeping the proportions set by `maxWidth` and `minWidth`.  
This is useful if you want the fluid to grow further than the `maxWidth` but keeping the same size at `maxWidth`.

#### ExtendMinWidth `null`
This is the width in pixel where the fluid will stop shrinking but keeping the proportions set by `maxWidth` and `minWidth`.  
This is useful if you want the fluid to shrink further than the `minWidth` but keeping the same size at `minWidth`.

#### RemBase `16`
This is the base value for the rem unit.

#### UseRemByDefault `false`
If you are working with rem units, you can set this to true.
This will make the fluid use rem by default.  
For example
```html
<div class="f-w-16-32">...</div> <!-- Default from 16px to 32px -->
<div class="f-w-1-2">...</div> <!-- RemByDefault from 1rem to 2rem -->
```

## Utilities

| Prefix        | Example             | Definition                                   |
|---------------|---------------------|----------------------------------------------|
| `f-text`      | `f-text-32-64`      | font size                                    |
| `f-m`         | `f-m-32-64`         | margin                                       |
| `f-mt`        | `f-mt-32-64`        | margin top                                   |
| `f-mr`        | `f-mr-32-64`        | margin right                                 |
| `f-mb`        | `f-mb-32-64`        | margin bottom                                |
| `f-ml`        | `f-mb-32-64`        | margin left                                  |
| `f-mx`        | `f-mb-32-64`        | margin left and margin right                 |
| `f-my`        | `f-mb-32-64`        | margin top and margin bottom                 |
| `f-p`         | `f-p-32-64`         | padding                                      |
| `f-pt`        | `f-pt-32-64`        | padding top                                  |
| `f-pr`        | `f-pr-32-64`        | padding right                                |
| `f-pb`        | `f-pb-32-64`        | padding bottom                               |
| `f-pl`        | `f-pb-32-64`        | padding left                                 |
| `f-px`        | `f-pb-32-64`        | padding left and padding right               |
| `f-py`        | `f-pb-32-64`        | padding top and padding bottom               |
| `f-w`         | `f-w-32-64`         | width                                        |
| `f-min-w`     | `f-min-w-32-64`     | min-width                                    |
| `f-max-w`     | `f-max-w-32-64`     | max-width                                    |
| `f-h`         | `f-h-32-64`         | height                                       |
| `f-min-h`     | `f-min-h-32-64`     | min-height                                   |
| `f-max-h`     | `f-max-h-32-64`     | max-height                                   |
| `f-gap`       | `f-gap-32-64`       | gap                                          |
| `f-gap-x`     | `f-gap-x-32-64`     | gap left and gap right                       |
| `f-gap-y`     | `f-gap-y-32-64`     | gap top and gap bottom                       |
| `f-intent`    | `f-intent-32-64`    | text intent                                  |
| `f-leading`   | `f-leading-32-64`   | line height                                  |
| `f-scroll-m`  | `f-scroll-m-32-64`  | scroll margin                                |
| `f-scroll-mt` | `f-scroll-mt-32-64` | scroll margin top                            |
| `f-scroll-mr` | `f-scroll-mr-32-64` | scroll margin right                          |
| `f-scroll-mb` | `f-scroll-mb-32-64` | scroll margin bottom                         |
| `f-scroll-ml` | `f-scroll-ml-32-64` | scroll margin left                           |
| `f-scroll-mx` | `f-scroll-mx-32-64` | scroll margin left and scroll margin right   |
| `f-scroll-my` | `f-scroll-my-32-64` | scroll margin top and scroll margin bottom   |
| `f-scroll-p`  | `f-scroll-p-32-64`  | scroll padding                               |
| `f-scroll-pt` | `f-scroll-pt-32-64` | scroll padding top                           |
| `f-scroll-pr` | `f-scroll-pr-32-64` | scroll padding right                         |
| `f-scroll-pb` | `f-scroll-pb-32-64` | scroll padding bottom                        |
| `f-scroll-pl` | `f-scroll-pl-32-64` | scroll padding left                          |
| `f-scroll-px` | `f-scroll-px-32-64` | scroll padding left and scroll padding right |
| `f-scroll-py` | `f-scroll-py-32-64` | scroll padding top and scroll padding bottom |
