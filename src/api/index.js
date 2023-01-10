//进行API统一管理
import requests from "./request";
import mockRequests from './mockAjax'
//三级联动接口
// get

//发请求:axios发请求返回结果是Promise对象
export const reqCategoryList = ()=>requests.get('/product/getBaseCategoryList')
export const reqGetBannerList = ()=>mockRequests.get('/banner')


//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')  