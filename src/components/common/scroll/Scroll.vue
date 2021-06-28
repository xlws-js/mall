<template>
  <div class="warpper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      bscroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.warpper, {
      probeType: this.probeType,
      observeDOM: true,
      observeImage: true,
      click: true,
      mouseWheel: true,
      pullUpLoad: this.pullUpLoad
    })

    if (this.probeType == 2 || this.probeType == 3) {
      this.bscroll.on("scroll", position => {
        this.$emit('scroll', position)
      })
    }

    if (this.pullUpLoad) {
      this.bscroll.on("pullingUp", () => {
        this.$emit("pullingUp")
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.bscroll.scrollTo(x, y, time)
    },

    finishPullUp() {
      this.bscroll.finishPullUp()
    },

    getScrollY() {
      return this.bscroll ? this.bscroll.y : 0
    },

    refresh() {
      this.bscroll && this.bscroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
