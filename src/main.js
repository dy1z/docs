import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { head }) {
  Vue.component('Layout', DefaultLayout)

  head.htmlAttrs = { lang: 'en', class: 'h-full' }
  head.bodyAttrs = { class: 'antialiased font-sans' }

  head.link.push({
    rel: 'stylesheet',
    href: 'https://rsms.me/inter/inter.css'
  })
}
