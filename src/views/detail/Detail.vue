<template>
  <div id="detail">
    <!-- 导航 -->
    <detail-nav-bar @titleClick="titleClick" ref="navBar"/>
    <scroll id="warpper"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="scroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shops="shops" />
      <detail-info :detailInfo="detailInfo" @imgLoad="imgLoad"/>
      <detail-goods-param ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list :goods="recommendInfo" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top  @click.native="backTop" v-show="isShow"/>
  </div>
</template>

<script>
import DetailNavBar from './detailcomponent/DetailNavBar.vue'
import DetailSwiper from './detailcomponent/DetailSwiper.vue'
import DetailBaseInfo from './detailcomponent/DetailBaseInfo.vue'
import DetailShopInfo from './detailcomponent/DetailShopInfo.vue'
import DetailInfo from './detailcomponent/DetailInfo.vue'
import DetailGoodsParam from './detailcomponent/DetailGoodsParam.vue'
import DetailCommentInfo from './detailcomponent/DetailCommentInfo.vue'
import DetailBottomBar from "./detailcomponent/DetailBottomBar.vue"


import {backTopMixin} from 'common/mixin.js'
import {mapActions} from 'vuex'

import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import {
        getDetail,
        getRecommed,
        goodsInfo,
        shopInfo,
        GoodsParam
      } from "network/detail.js";

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      titleCurrentYs: [],
      currentIndex: 0,
      isShow: false,
    }
  },
  created() {
    this.iid = this.$route.params.id

    // 详情数据
    getDetail(this.iid).then(value => {
      let data = value.data.result
      this.topImages = data.itemInfo.topImages
      // 商品信息
      this.goods = new goodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 店铺信息
      this.shops = new shopInfo(data.shopInfo)
      // 商品详情数据
      this.detailInfo = data.detailInfo
      // 商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

    })

    // 推荐数据
    getRecommed().then(value => {
      this.recommendInfo = value.data.data.list
    })

  },
  methods: {
    ...mapActions([
      'addCart'
    ]),
    imgLoad() {
      this.$refs.scroll.refresh()
      this.titleCurrentYs.length = 0

      this.titleCurrentYs.push(0)
      this.titleCurrentYs.push(this.$refs.params.$el.offsetTop - 44)
      this.titleCurrentYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.titleCurrentYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.titleCurrentYs.push(Number.MAX_VALUE)

    },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.titleCurrentYs[index])
    },

    scroll(position) {
      let positionY = -position.y
      if (this.titleCurrentYs.length > 0) {
        let length = this.titleCurrentYs.length
        for (let i = 0; i < length - 1; i++) {
          let y = this.titleCurrentYs[i]
          if (positionY >= y && positionY <= this.titleCurrentYs[i + 1] && this.currentIndex != i) {
            this.$refs.navBar.currentIndex = i
            this.currentIndex = i
          }
        }
      }

      this.isShow = position.y < -500 ? true : false
    },

    addToCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.price
      product.iid = this.iid

      // 添加进购物车
      this.addCart(product).then(value => {
        this.$toast.show(value, 1000)
      })

      // this.$store.dispatch('addCart', product).then(value => {
      //   console.log(value);
      // })
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 6666;
    background-color: #fff;
  }
  #warpper {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>
