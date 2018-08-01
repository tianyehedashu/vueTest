import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import plugins from './plugins'
import login from '../components/login/store.js'

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    login: login
  },
  state: {
    homePath: '/hello'
  },
  getters: {

  },
  actions,
  mutations: {

  },
  plugins
})
export default store
