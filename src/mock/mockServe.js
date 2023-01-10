//引入mockjs模块
import Mock from "mockjs";
//把json数据引入进来
//图片，json格式默认对外暴漏
import banner from './banner'
import floor from './floor'
//mock数据：第一个参数请求地址，第二个参数请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})

