import Vue from 'vue'
import VuePreload from 'vue-preload'
Vue.use(VuePreload)
// with options
Vue.use(VuePreload, {
	showProgress: false,
})