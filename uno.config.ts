import { defineConfig, presetUno } from 'unocss'
import { presetFluid } from './src/main'

export default defineConfig({
  presets: [
    presetUno(),
    presetFluid({}),
  ],
})
