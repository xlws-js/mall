<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './homecomponents/HomeSwiper.vue'
import HomeRecommendView from './homecomponents/HomeRecommendView.vue'

import {getHomeMultidata} from "network/home.js"

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      banners: null,
      recommends: null
    }
  },
  created() {
    getHomeMultidata().then(value => {
      this.banners = value.data.data.banner.list
      this.recommends = value.data.data.recommend.list
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
