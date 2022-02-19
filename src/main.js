import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入mockServejs模拟数据
import  '@/mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'

import '../public/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    // 安装全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
