import { reqCartList,reqDeleteCartById,reqUpdataCheckedById } from "@/api"
export const state = {
    cartList: []
}
export const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
export const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车某个产品
    async getDeleteCartById({ commit },skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车选中状态
    async updataCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdataCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            Promise.reject(new Error('faile'))
        }
    }
}
export const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

}

export default {
    state,
    mutations,
    actions,
    getters
}