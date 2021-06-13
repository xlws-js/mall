<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <home-feature-view></home-feature-view>

    <tab-control :title="['流行', '新歌', '精选']"
      @tabclick="change"></tab-control>
    <goods-list :goods="goods[currentTitle].list"></goods-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import HomeSwiper from './homecomponents/HomeSwiper.vue'
import HomeRecommendView from './homecomponents/HomeRecommendView.vue'
import HomeFeatureView from './homecomponents/HomeFeatureView.vue'

import {getHomeMultidata, getHomeGoodsData} from "network/home.js"

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,

    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView
  },
  data() {
    return {
      banners: null,
      recommends: null,
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      currentTitle: 'pop'
    }
  },
  created() {
    this.getHomeMultidata()
    // 商品数据
    this.getHomeGoodsData('pop')
    this.getHomeGoodsData('new')
    this.getHomeGoodsData('sell')
  },
  methods: {
    /*
      网络请求
    */
    getHomeMultidata() {
      getHomeMultidata().then(value => {
        this.banners = value.data.data.banner.list
        this.recommends = value.data.data.recommend.list
      })
    },
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1
      getHomeGoodsData(type, page).then(value => {
        this.goods[type].list.push(...value.data.data.list)
        this.goods[type].page++
      })
    },

    /*
      事件监听
    */
    change(index) {
      this.currentTitle = index == 0
        ? 'pop'
        : index == 1
        ? 'new'
        : 'sell'
    },

  }
}
</script>

<style scoped>
  #home {
    margin-top: 44px;
    height: 5000px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 66;
  }
</style>
