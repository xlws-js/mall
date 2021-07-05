<template>
  <div class="bottom-bar">
    <div class="select" @click="cancel">
      <check-button :checked="isSelect"></check-button>
      <span class="selectAll">全选</span>
    </div>
    <div class="total">
      <span>合计: ￥{{totalPrice}}</span>
    </div>
    <div class="buy" @click="BuyGoods">
      <span>
        付款({{buyLength}})
      </span>
    </div>
  </div>

</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton.vue'

import {mapGetters} from "vuex"

export default {
  data() {
    return {
      select: false
    }
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters([
      'cartLength',
      'cartList'
    ]),
    totalPrice() {
      return this.cartList.reduce((prev, cur) => {
        return prev += cur.isChecked ? cur.price * cur.count : 0
      }, 0).toFixed(2)
    },

    buyLength() {
      return this.cartList.filter(item => item.isChecked).length
    },

    isSelect() {
      // this.select = !(this.$store.state.cartList.filter(item => !item.isChecked).length)
      this.select = this.cartLength !== 0
                    ? !this.cartList.find(item => !item.isChecked)
                    : false
      return this.select
    }
  },
  methods: {
    cancel() {
      if (this.cartLength !== 0) {
        this.cartList.forEach(item => item.isChecked = !this.select)
      }
    },
    BuyGoods() {
      if (this.cartList.filter(item => item.isChecked).length == 0) {
        this.$toast.show('请选择购买的商品', 1500)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 30px;
    width: 100%;
    background-color: #eee;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, .2);
    box-sizing: border-box;
    padding-left: 10px;
    font-size: 14px;
    position: relative;

    display: flex;
    align-items: center;
  }

  .select {
    display: flex;
  }

  .selectAll {
    font-weight: 700;
    padding-left: 5px;
    color: #333;
  }

  .total {
    padding-left: 10px;
  }

  .buy {
    width: 100px;
    height: 100%;
    line-height: 30px;
    position: absolute;
    right: 0;
    text-align: center;
    background-color: var(--color-high-text);
    color: #fff;
  }
</style>
