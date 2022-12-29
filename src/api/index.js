//进行API统一管理
import requests from "./request";
//三级联动接口
// get

//发请求:axios发请求返回结果是Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})

