<template>
  <div id="hy-swiper" @touchstart="touchStart"
    @touchmove="touchMove" @touchend="touchEnd">
    <div class="swiper" >
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div v-for="(item, index) in slideCount"
        class="dot" :key="index" :class="{active: index === currentIndex - 1}"></div>
      </slot>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Swiper',
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slideCount: 0,
      totalWidth: 0,
      swiperStyle: {},
      currentIndex: 1,
      scrolling: false,
      timer: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.handleDom()

      this.startTimer()
    }, 150)
  },
  methods: {
    //定时器
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++

        this.pictureCarousel(-this.currentIndex * this.totalWidth)

      }, this.interval)
    },

    stopTimer() {
      window.clearInterval(this.playTimer)
    },

    checkPosition() {
      window.setTimeout(() => {
        this.swiperStyle.transition = '0ms';
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
      }, this.animDuration)
    },

    pictureCarousel(currentPosition) {
      this.scrolling = true

      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms'
      this.setTransform(currentPosition)
      this.checkPosition()

      this.scrolling = false
    },

    setTransform(position) {
      this.swiperStyle.transform = `translateX(${position}px)`
      this.swiperStyle['-webkit-transform'] = `translateX(${position}px)`;
      this.swiperStyle['-ms-transform'] = `translateX(${position}px)`;
    },

    // 处理Dom
    handleDom() {
      let swiperEle = document.querySelector(".swiper")
      let slideEles = document.querySelectorAll(".slide")

      this.slideCount = slideEles.length

      if (this.slideCount > 1) {
        let cloneFirst = slideEles[0].cloneNode(true)
        let cloneLast = slideEles[this.slideCount - 1].cloneNode(true)

        swiperEle.insertBefore(cloneLast, slideEles[0])
        swiperEle.appendChild(cloneFirst)

        swiperEle.style.transform = `translateX(${-swiperEle.offsetWidth}px)`
        this.totalWidth = swiperEle.offsetWidth
        this.swiperStyle = swiperEle.style
      }
    },

    touchStart(e) {
      if (this.scrolling) return
      this.stopTimer()
      this.satrtX = e.touches[0].pageX
    },

    touchMove(e) {
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.satrtX
      let currentPosition = -this.currentIndex * this.totalWidth
      let moveDistance = this.distance + currentPosition

      this.setTransform(moveDistance)
    },

    touchEnd() {
      let currentMove = Math.abs(this.distance)

      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex++
      }

      this.pictureCarousel(-this.currentIndex * this.totalWidth)

      this.startTimer()
    }
  }
}
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .dot {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    line-height: 5px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .dot.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>
