// 引入mockjs模块
import Mock from 'mockjs'
// 引入json数据【json数据没有对外暴露,但是可以使用,是因为webpack默认对外暴露的资源有:图片,json格式数据】
import banner from './banner.json'
import floor from './floor.json'

//模拟数据，参数1:请求地址 参数2:请求数据
Mock.mock('/mock/banner',{code: 200,data: banner});
Mock.mock('/mock/floor',{code: 200,data: floor})
