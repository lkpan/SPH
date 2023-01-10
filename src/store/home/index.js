import {reqCategoryList,reqFloorList,reqGetBannerList} from '@/api'

//home模块小仓库
const state= {
    //state中的数据默认初始值要注意，如果返回的是对象想就设置为对象
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    //floor组件数据
    floorList:[]
}
const mutations= {
    //传参state就是上面的数据，第二个是请求获得的数据，写入state中
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList

    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        console.log('修改floorList');
        state.floorList = floorList
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
       let result = await reqGetBannerList()
       if(result.code===200){
        commit('GETBANNERLIST',result.data)
       }
    },
    //获取floor数据
    async getFloorList({commit}){
        console.log(reqFloorList,reqGetBannerList);
        let result = await reqFloorList()
        if(result.code===200){
         commit('GETFLOORLIST',result.data)
        }
     },
}
//计算属性
const getters= {}

export default {
    state,
    mutations,
    actions,
    getters
}