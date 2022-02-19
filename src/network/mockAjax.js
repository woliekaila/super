import axios from 'axios'

const instance = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

instance.interceptors.request.use((config) =>{
  return config;
},(err) =>{
  return Promise.reject(err)
})

instance.interceptors.response.use((data) =>{
  return data;
},(err) =>{
  return Promise.reject(err)
})

export default instance