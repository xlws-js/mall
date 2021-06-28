<template>
  <div v-if="Object.keys(shops).length !== 0" class="shop-info">
    <div class="shop-top">
      <img :src="shops.logo" alt="">
      <span class="title">{{shops.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="sells-info">
          <div class="number">{{sellsHandle}}</div>
          <span class="sells-name">
            销售量
          </span>
        </div>
        <div class="goodsCount">
          <div class="number">{{shops.goodsCount}}</div>
          <span class="sells-name">
            全部宝贝
          </span>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <div v-for="(item, index) in shops.score"
          :key="index"
          class="evaluate">
          <span class="name">{{item.name}}</span>
          <span class="score" :style="isFontColorRed(item.isBetter)">{{item.score}}</span>
          <span class="isBetter" :style="isBgcRed(item.isBetter)">{{isBetter(item.isBetter)}}</span>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <a :href="shops.link">进店逛逛</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shops: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    sellsHandle() {
      return (this.shops.sells / 10000).toFixed(1) + '万'
    }
  },
  methods: {
    isBetter(isBt) {
      return isBt ? '高' : '低'
    },

    isFontColorRed(isBt) {
      return isBt ? {color: 'red'} : {}
    },

    isBgcRed(isBt) {
      return isBt ? {backgroundColor: 'red'} : {}
    }
  }
}
</script>

<style scoped>
  .shop-info {
    padding: 0 5px;
  }
  .shop-top {
    margin: 20px 0;
  }
  .shop-top img {
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #ccc;
    vertical-align: middle;
  }
  .shop-top span {
    display: inline-block;
    font-size: 16px;
    padding-left: 10px;
  }

  .shop-middle {
    display: flex;
  }
  .shop-middle-item {
    color: #000;
    font-size: 12px;
    flex: 1;
  }
  .shop-middle-left {
    display: flex;
    align-items: center;
  }
  .shop-middle-left > div {
    flex: 1;
    text-align: center;
  }
  .shop-middle-left .goodsCount {
    border-right: 2px solid #ccc;
  }
  .shop-middle-left > div .number {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .shop-middle-right {
    margin-left: 20px;
  }

  .shop-middle-right .evaluate span {
    text-align: center;
  }
  .shop-middle-right .evaluate:not(:last-child) {
    margin-bottom: 10px;
  }
  .shop-middle-right .score {
    color: green;
    margin: 0 15px;
  }
  .shop-middle-right .isBetter {
    float: right;
    margin-right: 20px;
    background-color: green;
    color: #fff;
  }

  .shop-bottom {
    text-align: center;
    margin-top: 20px;
  }
  .shop-bottom a {
    padding: 5px 40px;
    font-size: 14px;
    background-color: #eee;
    border-radius: 5px;
  }
</style>
