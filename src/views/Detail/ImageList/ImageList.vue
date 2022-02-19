<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slider, index) in skuImageList"
        :key="slider.id"
      >
        <img :src="slider.imgUrl" @click="changeIndex(index)" :class="{active: index == currentIndex}"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: ["skuImageList"],
  watch: {
    skuImageList: {
      handler(oldValue,newValue){
        this.$nextTick(() =>{
          new Swiper ('.swiper-container', {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // 显示几个图片
            slidesPerView: 3,
            // 每次切换图片的张数
            slidesPerGroup: 1
          }) 
        })
      }
    }
  },
  methods: {
    changeIndex(index){
      // 实现点击哪张图片,哪张图片有高亮效果
      this.currentIndex = index;
      // 点击小图列表中的图片,zoom组件展示点击的图片
      this.$bus.$emit('getIndex',this.currentIndex); 
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>