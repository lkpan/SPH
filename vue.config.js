// const { defineConfig } = require('@vue/cli-service')
// module.exports = {
  // transpileDependencies: true,
  //代理跨域
  module.exports = {
    lintOnSave : false,
    //...
    devServer: {
      proxy: {
        '/api': {
          target: 'http://gmall-h5-api.atguigu.cn',
          // changOrigin:true
        },
      },
    },
  };
// }
