<template>
  <div class="goods">
    <goods-item v-for="(item, index) in goods"
      :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem.vue'

export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsItem
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>
