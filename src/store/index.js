import Vue from "vue";
import Vuex from 'vuex'
//使用插件vuex
Vue.use(Vuex)
//引入小仓库
import home from './home'
import search from './search'

//对外暴漏一个实例
export default new Vuex.Store({
    //实现vuex仓库模块式开发
    modules:{
        home,
        search
    }
})