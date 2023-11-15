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
