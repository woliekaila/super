import {reqGoodsInfo} from '@/network/api.js'
import {reqShopCart} from '@/network/api.js'

import {getUUID} from '@/utils/uuid_token.js'

const state = {
  // 产品基本信息
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const actions = {
  // 获取商品详情信息
  async getGoodInfo(miniStore,skuId){
    let result = await reqGoodsInfo(skuId);
    if(result.status == 200){
      miniStore.commit('GETGoodInfo',result.data);
    }
  },
  // 将产品添加到购物车中||修改购物车中的商品数量 async函数的返回值是一个Promise,其状态由其返回值决定
  async addShopCart(miniStore,{skuId,skuNum}){
    let result = await reqShopCart(skuId,skuNum);
    let message = result.data
    // 加入服务器成功
    if(message.code == 200){
      // console.log(result);
      return 'success'
    }else{//失败
      console.log('失败')
      return Promise.reject(new Error('faile'))
    }
    
  }
}
const mutations = {
  GETGoodInfo(state,good){
    // console.log(state,good)
    state.goodInfo = good.data;
  }
}
// 简化仓库数据
const getters = {
  // 简化路径导航的数据
  categoryView(state){
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state){
    return state.goodInfo.skuInfo || {}
  },
  // 简化售卖属性的数据
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}