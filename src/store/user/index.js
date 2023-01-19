// 注册与登录的模块
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo,reqLogout } from '@/api'
// 引入处理token函数
import {setToken, getToken,removeToken} from '@/utils/token'
const state = {
    code: '',
    pushCode: '',
    token: getToken('TOKEN'),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, data) {
        state.token = data.token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state){
        // 把用户相关信息情况
        state.token = ''
        state.userInfo = {}
        // 本地存储清空
        removeToken()
        
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 这里没钱只能服务器获取验证码
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        state.pushCode = result.code
        if (result.code == '200') {
            return 'ok'
        } else {
            return Promise(new Error('faile'))
        }
    },
    // 用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器下发token，匹配token给服务器下发信息
        if (result.code == 200) {
            commit('USERLOGIN', result.data)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            // 提交用户信息
            commit('GETUSERINFO', result.data)
            return 'ok'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户退出
    async userLogout({commit}){
        // 知识向服务器发一次请求，通知服务器清除token
        let result = await reqLogout()
        // action里面不能操作state
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
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