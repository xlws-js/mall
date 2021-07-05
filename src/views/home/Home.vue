<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
        :title="['流行', '新歌', '精选']"
        @tabclick="change"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"></tab-control>

    <scroll id="warpper"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="onscroll"
      @pullingUp="pullUpLoad">

      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>

      <tab-control
        :title="['流行', '新歌', '精选']"
        @tabclick="change"
        ref="tabControl2"
        class="tab-control"
        :class="{fixed: isTabFixed}" />
      <goods-list
        :goods="goods[currentTitle].list"
        class="goods"></goods-list>

    </scroll>
    <back-top  @click.native="backTop" v-show="isShow"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import HomeSwiper from './homecomponents/HomeSwiper.vue'
import HomeRecommendView from './homecomponents/HomeRecommendView.vue'
import HomeFeatureView from './homecomponents/HomeFeatureView.vue'

import {getHomeMultidata, getHomeGoodsData} from "network/home.js"
import {backTopMixin} from 'common/mixin.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,

    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: null,
      recommends: null,
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      currentTitle: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
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

      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    onscroll(position) {
      this.isShow = position.y < -500 ? true : false
      this.isTabFixed = -position.y >= this.tabOffsetTop - 44
    },

    pullUpLoad() {
      this.getHomeGoodsData(this.currentTitle)

      this.$refs.scroll.finishPullUp()
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }

  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 10)
  },

  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  #warpper {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
  .tab-control {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 66;
  }
  .goods {
    margin-top: 44px;
  }
  .fixed {
    position: fixed;
    top: 44px;
  }
</style>
