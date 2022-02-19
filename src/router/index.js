import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeCpn from '../views/Home/HomeCpn.vue'
import LoginCpn from '../views/Login/Login.vue'
import RegisterCpn from '../views/Register/Register.vue'
import SearchCpn from '../views/Search/Search.vue'
import detail from '@/views/Detail'
import addcartsuccess from '@/views/AddCartSuccess'
import shopcart from '@/views/ShopCart'


Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  // 首页
  {
    path: '/home',
    component: HomeCpn,
    // 设置路由元信息
    meta: {
      showFooter: true
    }
  },
  // 搜索页
  {
    name: 'search',
    path: '/search/:keyword?',
    component: SearchCpn,
    meta: {
      showFooter: true
    }
  },
  // 登录
  {
    path: '/login',
    component: LoginCpn,
    meta: {
      showFooter: false
    }
  },
  // 注册
  {
    path: '/register',
    component: RegisterCpn,
    meta: {
      showFooter: false
    }
  },
  // 商品详情
  {
    path: '/detail/:skuid?',
    component: detail,
    meta: {
      showFooter: false
    }
  },
  // 添加购物车成功
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: addcartsuccess,
    meta: {
      showFooter: false
    }
  },
  //购物车
  {
    name: 'shopcart',
    path: '/shopcart',
    component: shopcart,
    meta: {
      showFooter: false
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // 程序滚动位置
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {y:0}
  }
})

export default router
