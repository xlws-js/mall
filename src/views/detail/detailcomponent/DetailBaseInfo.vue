<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="title-info">{{goods.title}}</div>
    <div class="price-info">
      <span class="price">{{goods.price}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span class="discount"
        :style="{'background': goods.discountBgColor}">{{goods.discountDesc}}</span>
    </div>
    <div class="other-info">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="service-info">
      <span class="service-item-info"
        v-for="index in goods.services.length - 1"
        :key="index">
        <img :src="goods.services[index - 1].icon" alt="">
        <span>{{goods.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info {
    box-sizing: border-box;
    margin-top: 5px;
    padding: 5px;
    border-bottom: 3px solid #eee
  }
  .title-info {
    font-size: 16px;
    color: #000;
  }
  .price-info {
    margin: 10px 0;
    position: relative;
  }
  .price-info .price {
    color: var(--color-high-text);
    padding-right: 3px;
  }
  .price-info .oldPrice {
    color: #ccc;
    text-decoration-line: line-through;
    font-size: 14px;
    margin-right: 5px;
  }
  .price-info .discount {
    color: #fff;
    font-size: 12px;
    padding: 0 3px;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .other-info {
    display: flex;
    margin: 10px 0;
  }
  .other-info span {
    color: #ccc;
    flex: 1;
    font-size: 12px;
  }
  .other-info span:nth-child(2) {
    text-align: center;
  }
  .other-info span:nth-child(3) {
    text-align: right;
  }
  .service-info {
    color: #ccc;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    border-top: 2px solid #eee;
  }
  .service-item-info:not(:last-child) {
    flex: 1;
  }
  .service-info span {
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #000;
  }
  .service-info img {
    width: 12px;
  }
</style>
