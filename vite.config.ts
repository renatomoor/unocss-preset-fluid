import path from 'node:path'
import { defineConfig } from 'vite'

const resolvePath = (str: string) => path.resolve(__dirname, str)

export default defineConfig(() => {
  return ({
    build: {
      target: 'esnext',
      minify: false,
      outDir: 'dist',
      lib: {
        entry: resolvePath('./src/main.ts'),
        formats: ['es', 'cjs'],
        fileName: (type: string) => `index.${type === 'cjs' ? 'cjs' : 'mjs'}`,
      },
      rollupOptions: {
        external: ['unocss'],
      },
    },
  })
})
