import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single', // or 'double'
  },
  typescript: true,
  vue: true,
})
