import {reqCategoryList,reqGetBannerList} from '@/api'

//home模块小仓库
const state= {
    //state中的数据默认初始值要注意，如果返回的是对象想就设置为对象
    categoryList:[]
}
const mutations= {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList

    },
    GETBANNERLIST(state,bannerList){
        console.log('修改仓库数据');
        state.bannerList = bannerList
    }
}
const actions= {
    //通过API里面接口函数调用，向服务器发送请求，获取服务器信息
    async categoryList({commit}){
        let result =await reqCategoryList()
        if (result.code === 200){
            commit('CATEGORYLIST', result.data)
        }
    
    },
    //获取首页轮播图数据
    async getBannerList({commit}){
        console.log('获取服务器数据');
       let result = await reqGetBannerList()
       if(result.code===200){
        commit('GETBANNERLIST',result.data)
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
