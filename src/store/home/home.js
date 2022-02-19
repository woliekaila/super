import {reqCategoryList} from '@/network/api.js'

import {reqGetBannerList,reqFloorList} from '@/network/api'
const state = {
  // 三级菜单数据
  categoryList: [],
  // 首页轮播图数据
  banner: [],
  floorList: []
}
const actions = {
  // 获取三级菜单数据
  async categoryList(miniStore,value){
    // console.log(miniStore,value);
    let result = await reqCategoryList()
    // console.log(result) 只有当请求成功时才改变state
    if(result.status == 200){
      miniStore.commit('categoryLIST',result.data)
    }
  },

  // 获取首页轮播图数据
  async getbannerList(miniStore,value){
    // console.log(miniStore,value);
    let result = await reqGetBannerList();
    // console.log(result) 
    if(result.status == 200){
      miniStore.commit('BannerList',result.data);
    }
  },
  async getFloorList(miniStore,value){
    let result = await reqFloorList();
    if(result.status === 200){
      miniStore.commit('FloorList',result.data);
    }
  }
}
const mutations = {
  // 修改state三级菜单数据
  categoryLIST(state,value){
    // console.log(state, value instanceof Array)
    state.categoryList = value.data;
  },
  // 修改state首页轮播图数据数据
  BannerList(state,value){
    // console.log(state, value instanceof Array)
    state.banner = value.data;
  },
  FloorList(state,floorList){
    // console.log(state, floorList)
    state.floorList = floorList.data;
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}