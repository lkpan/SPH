// 注册与登录的模块
import {reqGetCode,reqUserRegister} from '@/api'
const state = {
    code:'',
    pushCode:''
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    }
}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        // 这里没钱只能服务器获取验证码
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        state.pushCode = result.code
        if(result.code=='200'){
            return 'ok'
        }else{
            return Promise(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}