import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './home/home.js'
import search from './search/search.js'
import detail from './detail/detail.js'
import shopcart from './shopcart/shopcart.js'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    search,
    detail,
    shopcart
  }
})
