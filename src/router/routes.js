//引入路由
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

// 路由懒加载

export default [
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        //这里加个问号，代表params可传可不传
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: "search",
        // props传参
        // props:true,
        // 对象写法
        // props:{a:1,b:2}
        // 函数写法
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }

    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    //重定向，项目运行时访问/，立马定向到首页
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: false }
    },
    {
        path: '/addCartSuccess:skuNum?',
        name: 'addCartSuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopCart',
        name: 'shopCart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: { show: true },
        // 独享路由守卫
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopCart'||'/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'||'/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        name: 'center',
        component: Center,
        meta: { show: true },
        // 二级路由
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            // 
            {
                path: '/center',
                redirect: '/center/myorder'
            }

        ]
    },


]