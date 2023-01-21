import Vue from 'vue'
import App from './App.vue'
//三级联动组件，---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
// 分页器
import Pagination from '@/components/Pagination'
// elementui引入部分组件
import { Button, MessageBox } from 'element-ui';
//第一个参数：全局组件的名字，  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
//轮播图全局组件
Vue.component(Carousel.name, Carousel)
// 分页器的
Vue.component(Pagination.name,Pagination)
// elementui注册全局组件
Vue.component(Button.name,Button)
// elementui还有一种方法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

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
// 统一接口api文件里面的请求函数
import * as API from '@/api'
new Vue({
  render: h => h(App),
  //注册路由信息：组件身上都会多出$route以及$router属性
  router,
  //注册仓库：组件实例身上会多一个$store属性
  store,
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  }
}).$mount('#app')
