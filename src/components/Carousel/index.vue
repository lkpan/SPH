<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: "Carousel",
  props:['list'],
  watch:{
    list:{
      //立即执行一次
      // 监听不到list是因为数据从来不发生变化
      immediate:true,
      handler(){
        // 监听到的数据已经有了，无法确定v-for是否完成渲染，还是需要textTick
        this.$nextTick(()=>{
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable:true
            },
            
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
        })
      }
    }
  }
};
</script>

<style>
</style>