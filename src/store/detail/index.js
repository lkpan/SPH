import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api/index'
// 封装临时游客唯一字符串uuid
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodsInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    // 获取产品信息
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if (result.code==200){
            commit('GETGOODSINFO',result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
    //    这里只需要判断是否成功，没有返回数据
    // 返回的数据是Promise
    let result = await reqAddOrUpdateShopCart(skuId,skuNum)
    // 代表服务器加入购物车成功
    if(result.code==200){
        return 'ok'
    }else{
        // 代表加入购物车失败
        return Promise.reject(new Error('Faile'))
    }
    }
}
const getters = {
    // 路径导航简化的数据
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
