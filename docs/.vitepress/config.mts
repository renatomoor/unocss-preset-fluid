import { defineConfig } from 'vitepress'
import unocss from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Unocss preset fluid',
  description: 'Elegantly scale type and space without breakpoints',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Install', link: '/install' },
          { text: 'Utilities', link: '/utilities' },
          { text: 'Examples', link: '/examples' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Gap', link: '/examples/gap' },
          { text: 'Margin', link: '/examples/margin' },
          { text: 'Negative and positive', link: '/examples/negative-positive-values' },
          { text: 'Negative Values', link: '/examples/negative-values' },
          { text: 'Padding', link: '/examples/padding' },
          { text: 'Ranges', link: '/examples/ranges' },
          { text: 'Typography', link: '/examples/typography' },
          { text: 'Width and height', link: '/examples/width-height' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/renatomoor/unocss-preset-fluid' },
    ],
  },
  base: '/unocss-preset-fluid/',
  vite: {
    plugins: [
      unocss(),
    ],
  },
})
