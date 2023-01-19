import { reqCartList, reqDeleteCartById, reqUpdataCheckedById } from "@/api"
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
    async getDeleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    async deleteAllCheckedCart({ dispatch, getters }) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == '1' ? dispatch('getDeleteCartById', item.skuId) : ''
            // 将每次返回的promise插入到数组中
            promiseAll.push(promise)
        });
        // 只要p1,p2...有一个失败，返回的都是失败
        return Promise.all(promiseAll)
    },
    // 修改全部产品选中状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        // 数组
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updataCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        
        // 最终返回结果
        return Promise.all(promiseAll)
    }
    ,
    // 修改购物车选中状态
    async updataCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdataCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            Promise.reject(new Error('faile'))
        }
    },
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