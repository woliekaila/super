import {v4 as uuidv4} from 'uuid'
// 需求: 随机生成字符串,且每次执行不能发生变化,游客身份持久存储
export function getUUID(){
  // 先从本地存储获取uuid
  let uuid_token = localStorage.getItem('UUID_TOKEN')
  //若没有则生成并存储一次
  if(!uuid_token){
    uuid_token = uuidv4()
    localStorage.setItem('UUID_TOKEN',uuid_token)
  }
  //若有则直接返回
  return uuid_token
}