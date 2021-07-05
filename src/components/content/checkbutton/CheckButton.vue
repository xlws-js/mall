<template>
  <div class="check-btn" :class="{active: !checked}">
    <img src="~assets/img/cart/tick.svg" alt="" v-show="checked">
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default() {
        return true
      }
    }
  }
}
</script>

<style scoped>
  .check-btn {
    width: 15px;
    height: 15px;
    background-color: var(--color-high-text);
    overflow: hidden;
    border-radius: 50%;
    line-height: 15px;
  }

  .active {
    background-color: #fff;
    border: 1px solid #bbb;
  }

  .check-btn img {
    width: 100%;
  }
</style>
