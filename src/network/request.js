import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入vuex仓库 从仓库中获取游客身份
import store from '@/store'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

instance.interceptors.request.use((config) =>{
  // 进度条开始
  nprogress.start()
  if(store.state.detail.uuid_token){
    // 添加自定义请求头(不能乱加,要与后端配合添加) 以游客身份访问网页
    config.headers.userTempId = store.state.detail.uuid_token
  }
  return config;
},(err) =>{
  return Promise.reject(err)
})

instance.interceptors.response.use((data) =>{
  // 进度条结束
  nprogress.done();
  return data;
},(err) =>{
  return Promise.reject(err)
})

export default instance