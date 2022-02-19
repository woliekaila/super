// 引入二次封装的axios
import request from './request.js'
// 导出函数用于发送网络请求(获取三级列表数据)
export function reqCategoryList() {
  return request({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

// 获取banner(home轮播图)
import mockRequest from './mockAjax'
export function reqGetBannerList() {
  return mockRequest({
    url: '/banner',
    method: 'get'
  })
}

// 获取floor中的数据
export function reqFloorList() {
  return mockRequest({
    url: '/floor',
    method: 'get'
  })
}

// 获取search组件中的数据 请求地址: /api/list 需要带参数
// 当前接口给服务器传递一个默认参数(至少是一个空对象)
export function reqGetSearchInfo(params) {
  return request({
    url: '/list',
    method: 'post',
    data: params
  })
}

// 获取商品详情数据 /api/item/{ skuId }
export function reqGoodsInfo(skuId) {
  return request({
    url: `/item/${skuId}`,
    method: 'get'
  })
}

// 将产品添加到购物车中 /api/cart/addToCart/{ skuId }/{ skuNum }
export function reqShopCart(skuId,skuNum){
  return request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

// 获取购物车数据 /api/cart/cartList method:GET
export function reqCartList(){
  return request({
    url: '/cart/cartList',
    method: 'get'
  })
}

// 删除购物车中的数据 /api/cart/deleteCart/{skuId} method: DELETE
export function reqDeleteCart(skuId){
  return request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}

// 修改购物车中商品的选中状态 /api/cart/checkCart/{skuID}/{isChecked} method: get
export function reqUpdateChecked(skuId,isChecked){
  return request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}