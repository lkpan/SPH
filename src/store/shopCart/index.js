import { reqCartList } from "@/api"
export const state = {}
export const mutations = {}
export const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        console.log(result);
    }
}
export const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}