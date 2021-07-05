<template>
  <div class="toast" v-show="toastIsShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      toastIsShow: false
    }
  },

  methods: {
    show(value = '请添加提示文字', delay = 1500) {
      this.message = value
      this.toastIsShow = true
      setTimeout( () => {
        this.toastIsShow = false
        this.message = ''
      }, delay )
    }
  }
}
</script>

<style scoped>
  .toast {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .8);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    padding: 8px 10px;
    color: #fff;
    font-size: 16px;
    z-index: 99999;
  }
</style>
