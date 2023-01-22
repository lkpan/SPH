// vee-validata插件表单验证区域
import Vue from 'vue'
import veeValidate  from 'vee-validate'
// 中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate from 'vee-validate'
Vue.use(veeValidate)

// 表单验证
veeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is:(field) => `${field}必须与密码相同` // 修改内置规则的message，让确认密码和密码相同
    },
    attributes:{ // 给校验的field属性映射中文名称
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        isCheck:'协议'
    }
})

// 自定义校验
VeeValidate.Validator.extend('agree', {
    validate: (value) => {
        return value
    },
    getMessage: (field) => field + '必须同意'
})