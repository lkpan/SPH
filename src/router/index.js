//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
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
export default new VueRouter({
    //配置路由
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // 滚动条在最上方
        return { x: 0, y: 0 }
      }
})