import {reqGetSearchInfo} from '@/api'

//home模块小仓库
const state = {
    searchList:{}
}
const mutations= {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions= {
    // 获取search模块数据
    async getSearchList({commit},params){
        // 需要至少传递一个参数（空对象）
        let result = await reqGetSearchInfo(params)
        if(result.code===200){
            commit('GETSEARCHLIST',result.data)
        }
}}
// 计算属性 ，载项目中是为了，简化数据而生
const getters= {
    //  state是当前仓库的数据，不是大仓库
    goodsList(state){
    // 加入网络太慢state返回的是一个空对象，如果就会返回一个undefined，所以 设置一个||[]
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    },
    
}

export default {
    state,
    mutations,
    actions,
    getters
}
