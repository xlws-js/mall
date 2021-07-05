<template>
  <div class="bottom-bar">
    <div class="bar-left bar-item">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="selectClick">
        <i class="icon select" :class="{checked: isSelect}"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-right bar-item">
      <div class="join-cart" @click="addClick">
        <span>加入购物车</span>
      </div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      isSelect: false
    }
  },
  methods: {
    selectClick() {
      this.isSelect = !this.isSelect
    },

    addClick() {
      this.$emit("addToCart")
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    bottom: 100;
    z-index: 6666;

    height: 49px;
    width: 100%;

    background-color: #fff;
    color: #000;
    font-size: 14px;
    display: flex;
  }

  .bottom-bar .bar-item {
    flex: 1;
    height: 100%;
    display: flex;
  }

  .bottom-bar .bar-item > div {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .bar-item > div .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url('~assets/img/detail/detail_bottom.png');
    background-size: 20px;
  }

  .bar-item > div .service {
    background-position: 0 -185px;
  }

  .bar-item > div .select {
    background-position: 0 -135px;
  }

  .bar-item > div .shop {
    background-position: 0 -89px;
  }

  .bar-right .join-cart {
    background-color: rgb(243, 239, 0);
  }

  .bar-right .buy {
    background-color: var(--color-tint);
  }

  .bar-item > div .checked {
    background-position: 0 -160px;
  }
</style>
