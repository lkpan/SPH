import Vue from 'vue'
import App from './App.vue'
//三级联动组件，---全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字，  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
// Vue.config.productionTip = false
//引入mock数据
import '@/mock/mockServe'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入swiper样式
import 'swiper/css/swiper.css'
//发请求还没做完，这里代理一直没有发挥作用，localhost
// import {reqCategoryList} from '@/api'
// reqCategoryList();
new Vue({
  render: h => h(App),
  //注册路由信息：组件身上都会多出$route以及$router属性
  router,
  //注册仓库：组件实例身上会多一个$store属性
  store
}).$mount('#app')
