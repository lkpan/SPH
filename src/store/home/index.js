import {reqCategoryList} from '@/api'

//home模块小仓库
const state= {
    //state中的数据默认初始值要注意，如果返回的是对象想就设置为对象
    categoryList:[]
}
const mutations= {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList

    }
}
const actions= {
    //通过API里面接口函数调用，向服务器发送请求，获取服务器信息
    async categoryList({commit}){
        let result =await reqCategoryList()
        if (result.code === 200){
            commit('CATEGORYLIST', result.data)
        }
    
    }
}
const getters= {}

export default {
    state,
    mutations,
    actions,
    getters
}
