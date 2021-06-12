<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index"
      class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    margin-top: 10px;
    padding-bottom: 20px;

    box-shadow: 0 5px 0 4px #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .recommend-item a img {
    width: 80%;
    margin-bottom: 10px;
  }

  .recommend-item a .title {
    font-size: 12px;
    font-weight: bold;
  }
</style>
