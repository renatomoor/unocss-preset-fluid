# Unocss Preset Fluid
UnoCSS Preset Fluid offers an elegant solution to scale typography and spacing fluidly across different screen sizes without the need for breakpoints. Inspired by [Utopia](https://utopia.fyi/), this preset simplifies the creation of responsive designs in UnoCSS.


## Installation
Install the preset alongside UnoCSS using your preferred package manager:
```bash
npm i unocss-preset-fluid unocss --save-dev # with npm
yarn add unocss-preset-fluid unocss -D # with yarn
pnpm add unocss-preset-fluid unocss -D # with pnpm
```

## Usage
To use the preset in your UnoCSS configuration:
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

### Examples and Documentation
[Homepage](https://renatomoor.github.io/unocss-preset-fluid)  
[Examples](https://renatomoor.github.io/unocss-preset-fluid/examples.html)

### Options
Define your fluid design parameters with these options:
```js
{
    maxWidth: 1440,
    minWidth: 375,
    extendMaxWidth: null,
    extendMinWidth: null,
    remBase: 16,
    useRemByDefault: false,
    ranges: null,
    commentHelpers: false,
}
```
### Options Explained

 - **MaxWidth**: The maximum width in pixels where the fluid scaling stops growing.
 - **MinWidth**: The minimum width in pixels where the fluid scaling stops shrinking.
 - **ExtendMaxWidth**: Allows fluid scaling beyond MaxWidth while maintaining the proportion set by MaxWidth and MinWidth.
 - **ExtendMinWidth**: Allows fluid scaling below MinWidth while maintaining the proportion set by MaxWidth and MinWidth.
 - **RemBase**: The base value for REM unit calculations.
 - **UseRemByDefault**: When set to true, enables REM units as the default unit of measurement.
 - **Ranges**: Define named ranges for recurring spacings, creating handy aliases.
 - **CommentHelpers**: Enable to add helpful comments in the generated CSS, visible in the browser's inspector tool.

#### UseRemByDefault
If you are working with rem units, you can set this to true.
This will make the fluid use rem by default.  
For example
```html
<div class="f-w-16-32">...</div> <!-- Default from 16px to 32px -->
<div class="f-w-1-2">...</div> <!-- RemByDefault from 1rem to 2rem -->
```

#### Ranges
This option allows you to define recurring spacings using predefined names.
For example. With this fluid ranges:
```js
{
  xs: [12, 16],
  sm: [14, 18],
  md: [18, 24],
  lg: [22, 30],
}
```
You will be able to use it as aliases. Therefore, `f-w-xs` will become `f-w-12-16`.

#### CommentHelpers
This option allows you to add comments to the generated css.
After setting this to true, you will be able to see the generated css in the browser inspector.
```css
.f-p-lg {
  padding: clamp(1.25rem, 0.5898rem + 2.8169vw, 3.125rem); /* 20px -> 50px */
}

.f-p-32-64 {
  padding: clamp(2rem, 1.2958rem + 3.0047vw, 4rem); /* 32px -> 64px */
}
```
