<template>
  <div v-if="Object.keys(commentInfo).length !== 0"
    class="comment-info">
    <div class="header-info">
      <div class="user-evaluation">
        用户评价
      </div>
      <div class="more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="user-info">
      <img :src="commentInfo.user.avatar" alt="">
      <span class="user-name">
        {{commentInfo.user.uname}}
      </span>
    </div>
    <div class="content">
      <div class="content-text">
        {{commentInfo.content}}
      </div>
      <div class="content-info">
        <span class="created-date">
          {{handleDate}}
        </span>
        <span class="color-info">
          {{commentInfo.style}}
        </span>
      </div>
    </div>
    <div v-if="commentInfo.images" class="comment-img">
      <img v-for="(item, index) in commentInfo.images"
        :key="index"
        :src="item" alt="">
    </div>
  </div>
</template>

<script>
import {formatDate} from 'network/format.js'

export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    handleDate() {
      let date = new Date(this.commentInfo.created * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .comment-info {
    box-sizing: border-box;
    padding: 0 5px 10px;
    border-bottom: 5px solid #eee;
    margin-bottom: 10px;
  }
  .header-info {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  .header-info .user-evaluation {
    float: left;
  }
  .header-info .more {
    float: right;
  }
  .more .arrow-right {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-top: 2px solid #ccc;
    border-right: 2px solid #ccc;
    transform: rotate(45deg);
    margin-right: 10px;
  }

  .user-info {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .user-info img {
    width: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 5px;
  }
  .user-info .user-name {
    font-size: 14px;
    margin-left: 10px;
  }

  .content {
    margin-top: 10px;
    font-size: 12px;
  }
  .content .content-text {
    padding: 3px 5px;
  }
  .content .content-info {
    padding: 2px 5px 10px;
    color: #ccc;
  }
  .content-info .created-date {
    padding-right: 8px;
  }

  .comment-img img {
    width: 70px;
    height: 70px;
    margin-right: 10px;
  }
</style>
