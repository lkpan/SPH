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

//获取搜索模块的数据  地址：/api/list 请求方式：post 需要带参数

// 当前这个函数需要接受外部传参
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})

//获取产品详情信息的接口 /api/item/{ skuId } get请求
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车中（并且可以更新一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})

// 获取购物车列表的数据接口
// /api/cart/cartList
export const reqCartList = ()=>requests({url:'cart/cartList',method:'get'})

// 删除购物车请求的接口
// /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId)=>requests({url:`cart/deleteCart/${skuId}`,method:'delete'})

// 切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdataCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})



