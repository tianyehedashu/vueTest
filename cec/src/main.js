// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import VueFormGenerator from "vue-form-generator"
import {Menu, Submenu, MenuItem} from 'element-ui'
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(VueFormGenerator)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app')
