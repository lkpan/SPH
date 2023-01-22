<template>
  <div id="app">
    <h1 v-upper="msg">abc</h1>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- Home,Search中显示，Login，Register隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index'
import Footer from './components/Footer/index'
export default {
  name: 'App',
  data() {
    return {
      msg:'abc'
    }
  },
  components: {
    Header,
    Footer

  },
  mounted(){
        //通知vuex发送请求获取数据，存储于仓库当中
        //派发一个action
        this.$store.dispatch('categoryList')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
