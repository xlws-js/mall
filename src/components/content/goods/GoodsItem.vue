<template>
  <div class="goods-item">
    <a :href="goodsItem.link">
      <img :src="goodsItem.show.img" alt="">
    </a>
    <div>
      <p class="title">{{goodsItem.title}}</p>
      <div class="sales-info">
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .goods-item {
    width: 46%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
  }

  .goods-item .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 14px;
    margin-top: 3px;
  }

  .sales-info {
    text-align: center;
    font-size: 14px;
    margin: 5px;
  }

  .goods-item .price {
    color: var(--color-tint);
    margin-right: 8px;
  }

  .goods-item .collect::before {
    content: "⭐";
    font-size: 14px;
  }
</style>
