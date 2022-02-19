import {reqGetSearchInfo} from '@/network/api'
const state = {
  searchList: {}
}
const actions = {
  async getSearchList(miniStore,params){
    let result = await reqGetSearchInfo(params)
    // console.log(result)
    if(result.status === 200){
      miniStore.commit('GETSearchList',result.data)
    }
  }
}
const mutations = {
  GETSearchList(state,searchList){
    // console.log('searchList')
    state.searchList = searchList.data
  }
}
// 计算属性 getters
// 在项目中的主要作用是简化仓库中的数据
const getters = {
  // state形参: 是指当前小仓库中的state
  goodsList(state){
    return state.searchList.goodsList || [];
  },
  trademarkList(state){
    return state.searchList.trademarkList;
  },
  attrList(state){
    return state.searchList.attrsList;
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}