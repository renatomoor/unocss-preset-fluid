## Ranges
Using predefined fluid ranges for padding:

```js{8}
export default defineConfig({
  presets: [
    /...
    presetFluid({
      ranges: {
        'sm': [10, 30],
        'md': [15, 40],
        'lg': [20, 50],
      },
    }),
  ],
})
```

```html
<!-- Fluid padding range from 20px to 50px -->
<div class="f-p-lg">
    Padding example with a small range.
</div>
```

### Example:
<Ranges />
