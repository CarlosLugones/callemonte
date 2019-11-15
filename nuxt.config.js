import pkg from './package'

export default {
  // mode: 'universal',

  router: {
    linkActiveClass: 'is-active'
  },
  
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: "180x180",  href: '/apple-touch-icon.ico' },
      { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: "16x16", href: '/favicon-16x16.png' },
      { rel: 'manifest',  href: '/site.webmanifest' }
    ],

  },


  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#28a745',
    height: '3px'
  },

  /*
  ** Global CSS
  */

  css: [
    '~/assets/css/main.scss'
    // { src: '~/assets/css/main.scss', lang: 'scss' },
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '~/plugins/axios',
    { src: '~/plugins/vue-gallery.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
    // 'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'vue-sweetalert2/nuxt',
  ],

  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  proxy: {
    '/.netlify': {
      target: 'http://localhost:9000',
      pathRewrite: {'^/.netlify/functions': ''},
    },
  }, 

  boostrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    components: ['BModal'],
    directives: ['VBModal'],
    componentPlugins: [
      'FormPlugin',
      'FormCheckboxPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',
    ],
  } 
}
