import {reqGoodsInfo} from '@/api/index'
const state = {
    goodsInfo:{}
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
