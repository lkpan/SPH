//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//使用vue插件
Vue.use(VueRouter)

//保存一份push|replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace:因为条件不发生改变重复点击两次会报错
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 滚动条在最上方
        return { x: 0, y: 0 }
    }
})
// 全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to:要跳转的那个路由信息
    // from：获取到从那个路由跳转的信息
    // next：放行函数
    // next('/login')放行到指定路由
    // next(false)
    // 登录了才会有token
    let token = store.state.user.token
    //  用户信息
    let name = store.state.user.userInfo.name
    if (token) {
        // 用户已经登陆了，不能去login了
        if (to.path == '/login') {
            next('/home')
        } else {
            // 已经登录了但是，不是去login
            // 如果用户名已有
            if (name) {
                next()
            } else {
                // 如果没有用户信息，派发action让仓库存储用户信息再跳转
                // 获取用户信息在首页展示
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了获取不到用户信息，重新登录
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录::暂未处理
        next()
    }
})

export default router