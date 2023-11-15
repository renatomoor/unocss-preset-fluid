import { defineConfig, presetUno } from 'unocss'
import { presetFluid } from './src/main'

export default defineConfig({
  presets: [
    presetUno(),
    presetFluid({
      addCommentHelpers: true,
      ranges: {
        'xs': [5, 15],
        'sm': [10, 30],
        'md': [15, 40],
        'lg': [20, 50],
        'xl': [25, 60],
        '2xl': [30, 70],
        '3xl': [35, 80],
        '4xl': [40, 90],
      },
    }),
  ],
})
