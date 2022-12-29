<template>
  <div>
    <h1>parmas参数 {{ $route.params.keyword }}</h1>
    <h1>query参数 {{ $route.query.k }}</h1>
  </div>
</template>

<script>
export default {
  name:'',
  //路由组件可以传递props
  props:['keyword']
}
</script>

<style>

</style>