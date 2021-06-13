<template>
  <div class="tab-control" >
    <div class="control" v-for="(item, index) in title"
      :key="index" :class="{active: currentIndex == index}"
      @click="btnClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    btnClick(index) {
      this.currentIndex = index

      this.$emit('tablick', index)
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
    position: sticky;
    top: 44px;

    background-color: #fff;
  }

  .tab-control .control {
    flex: 1;
  }

  .control span {
    padding: 4px;
  }

  .control.active span {
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
