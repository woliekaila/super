// 引入请求模块(获取购物车数据)
import { reqCartList ,reqDeleteCart,reqUpdateChecked} from "@/network/api"

const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state,cartlist){
    state.cartList = cartlist.data;
  }
}
const actions = {
  // 获取购物车列表数据
  async getCartList(miniStore,value){
    let result = await reqCartList()
    if(result.status == 200){
      // console.log('数据:',result.data);
      miniStore.commit('GETCARTLIST',result.data)
    }
  },
  // 删除购物车中的产品
  async deleteCart(miniStore,skuId){
    let result = await reqDeleteCart(skuId)
    if(result.data.code == 200){ //判断请求是否成功
      return 'success'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改产品的选中状态
  async updateChecked(miniStore,{skuId,isChecked}){
    let result = await reqUpdateChecked(skuId,isChecked);
    if(result.data.code == 200){ //判断请求是否成功
      return 'success'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除所有选中的商品
  deleteAllChecked(miniStore){
    // console.log(miniStore.getters.cartInfo.cartInfoList)
    let isRemoveArr = []
    miniStore.getters.cartInfo.cartInfoList.forEach(item => {
      if(item.isChecked == 1){//谁选中删谁
        let isRemove = miniStore.dispatch('deleteCart',item.skuId)
        isRemoveArr.push(isRemove)
      }
    });
    return Promise.all(isRemoveArr);
  },
  // 单击全选复选框使购物车中的商品根据全选复选框的状态进行相应的更新
  updateAllCartChecked(miniStore,isChecked){
    // console.log(isChecked,miniStore.state);
    let isCheckedArr = []
    miniStore.state.cartList[0].cartInfoList.forEach((item) =>{
      let isAllChecked = miniStore.dispatch('updateChecked',{skuId:item.skuId,isChecked})
      isCheckedArr.push(isAllChecked)
    })
    return Promise.all(isCheckedArr);
  }
}
const getters = {
  // 对购物车中的数据进行简化
  cartInfo(state){
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}