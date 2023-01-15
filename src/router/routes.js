//引入路由
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'

export default [
    {
        path: '/home',
        component: Home,
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
        path:'/detail/:skuId',
        component:Detail,
        meta: { show: false }
    }

]