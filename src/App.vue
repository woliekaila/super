<template>
  <div id="app">
    <header-cpn />
    <router-view></router-view>
    <footer-cpn v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Vue from "vue";
// 引入进度条样式
import 'nprogress/nprogress.css'
import HeaderCpn from "./components/header/HeaderCpn.vue";
import FooterCpn from "./components/footer/FooterCpn.vue";
// 注册全局组件
import TypeNav from "./views/Home/TypeNav/TypeNav.vue";
import PaginationCpn from '@/components/pagination/PaginationCpn.vue'
// 注册全局组件type-nav
Vue.component(TypeNav.name, TypeNav);
Vue.component(PaginationCpn.name,PaginationCpn)
export default {
  name: "",
  components: {
    HeaderCpn,
    FooterCpn,
  },
  mounted() {
    // 为了只发送一次请求
    this.$store.dispatch("categoryList");
  },
};
</script>

<style lang="scss">
</style>
