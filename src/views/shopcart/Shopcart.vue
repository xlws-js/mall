<template>
  <div id="shopcart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <scroll id="cart-scroll" ref="cart_scroll">
      <cart-list></cart-list>
    </scroll>

    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import CartList from './shopcartcomponents/CartList.vue'
import CartBottomBar from './shopcartcomponents/CartBottomBar.vue'

import {mapGetters} from "vuex"

export default {
  name: 'Shopcart',
  activated() {
    this.$refs.cart_scroll.refresh()
  },
  components: {
    CartList,
    CartBottomBar,

    NavBar,
    Scroll
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  }
}
</script>

<style scoped>
  #shopcart {
    height: 100vh;
  }

  #cart-scroll {
    height: calc(100% - 125px);
    overflow: hidden;
  }

  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
