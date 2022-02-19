<template>
  <div>
    <type-nav/>
    <list-container/>
    <recommend-cpn/>
    <rank-cpn/>
    <like-cpn/>
    <floor-cpn v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
    <!-- <floor-cpn/> -->
    <brand-cpn/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ListContainer from './child/ListContainer.vue'
import RecommendCpn from '@/views/Home/child/RecommendCpn.vue'
import RankCpn from '@/views/Home/child/RankCpn.vue'
import LikeCpn from '@/views/Home/child/LikeCpn.vue'
import FloorCpn from '@/views/Home/child/FloorCpn.vue'
import BrandCpn from '@/views/Home/child/brandCpn.vue'
export default {
  name: '',
  components: {
    ListContainer,
    RecommendCpn,
    RankCpn,
    LikeCpn,
    FloorCpn,
    BrandCpn
  },
  mounted(){
    // 派发action 获取floor数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: (state) =>{return state.home.floorList}
    })
  }
}
</script>

<style>

</style>