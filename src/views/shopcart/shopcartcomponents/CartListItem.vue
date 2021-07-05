<template>
  <div class="cart-item" v-if="Object.keys(product).length !== 0">
    <div class="item-selector" @click="btnClick">
      <check-button :checked="product.isChecked"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">{{handlePrice}}</div>
        <div class="item-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton.vue'

export default {
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    handlePrice() {
      return '￥' + this.product.price
    }
  },
  methods: {
    btnClick() {
      this.product.isChecked = !this.product.isChecked
      this.$bus.$emit('btnClick')
    }
  }
}
</script>

<style scoped>
  .cart-item {
    width: 100%;
    height: 100px;
    background-color: #fff;
    font-size: 16px;
    box-sizing: border-box;
    padding: 10px;
    color: #000;

    display: flex;
    align-items: center;

    border-bottom: 3px solid #ccc;
  }

  .item-img {
    width: 80px;
    height: 80px;
    background-color: blue;
    flex-shrink: 0;
    margin: 0 10px;
    overflow: hidden;
    border-radius: 5px;
  }

  .item-img img {
    width: 100%;
  }

  .item-info {
    width: 200px;
    height: 80px;
    overflow: hidden;
  }

  .item-title,
  .item-desc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    margin-bottom: 15px;
  }

  .item-desc {
    font-size: 12px;
  }

  .item-price {
    float: left;
    color: var(--color-high-text)
  }

  .item-count {
    float: right;
  }
</style>
