//对于axios进行二次封装
import axios  from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
//start进度条开始，done进度条结束
const requests = axios.create({
    baseURL:'/api',
    timeout:5000,

})

//请求拦截器：发生请求之前可以检测到，可以在请求之前做一些事情
requests.interceptors.request.use((config)=>{
    //config配置对象，对象里面的headers请求头很重要
    //进度条开始动
    nProgress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //进度条结束
    nProgress.done()
    //成功回调
    return res.data
},(err)=>{
    return Promise.reject(new Error('faile'))
})



//对外暴漏
export default requests