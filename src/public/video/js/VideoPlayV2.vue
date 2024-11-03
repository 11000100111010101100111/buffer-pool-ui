<template>
  <div
    class="feed-container"
    @touchstart="startTouch"
    @touchmove="moveTouch"
    @touchend="endTouch"
    @wheel="handleWheel">
    <div class="video-wrapper">
      <div class="video-slot" :style="{ top: `${topMaster}px`, transition: isSnapping ? 'all 0.45s ease-out' : 'none' }">
        <video
          ref="videoMaster"
          :src="videos[0].url"
          :autoplay="false"
          loop
          controls
          class="video">
        </video>
      </div>
      <div class="video-slot" :style="{top: `${topSlave}px`, transition: isSnapping ? 'all 0.45s ease-out' : 'none' }">
        <video
          ref="videoSlave"
          :src="videos[1].url"
          :autoplay="false"
          loop
          controls
          class="video">
        </video>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentIndex: 0,    // 当前播放视频的索引
        translateY: 0,      // Y轴平移距离
        startY: 0,          // 触摸开始时的 Y 坐标
        isSnapping: false,  // 是否在对齐过程中
        topSlave: -9999,
        topMaster: 0,
        isUp: false,
        who: 'master',
        videos: [
          { url: 'http://8.134.183.234:8000/public/video_1.mp4' },
          { url: 'http://8.134.183.234:8000/public/video_4.mp4' },
        ],
      };
    },
    methods: {
      // 触摸开始时记录初始坐标
      startTouch(event) {
        this.startY = event.touches[0].clientY;
        this.isSnapping = false;
      },
      // 滑动时更新 translateY 让视频随手势滑动
      moveTouch(event) {
        let deltaY = event.touches[0].clientY - this.startY;

        if (deltaY > window.innerHeight) deltaY = window.innerHeight;

        if (deltaY < -window.innerHeight) deltaY = -window.innerHeight;

        this.translateY = deltaY;

        let slaveTop = 0;
        if (deltaY > 0) {
          slaveTop = -window.innerHeight + deltaY;
        } else if (deltaY < 0){
          slaveTop = window.innerHeight + deltaY;
        } else {
          slaveTop = window.innerHeight;
        }


        if (this.currentIndex >= this.videos.length - 1 && deltaY < 0) {
          if (this.who === 'master') {
            this.topMaster = deltaY;
          }
          if (this.who === 'slave') {
            this.topSlave = deltaY;
          }
        } else if (this.currentIndex <= 0 && deltaY > 0) {
          if (this.who === 'master') {
            this.topMaster = deltaY;
          }
          if (this.who === 'slave') {
            this.topSlave = deltaY;
          }
        } else {
          this.topMaster = this.who === 'master' ? deltaY : slaveTop;
          this.topSlave = this.who === 'master' ? slaveTop : deltaY;
        }
      },
      // 结束滑动，判断滑动距离并决定是否切换视频
      endTouch(event) {
        this.isSnapping = true;
        let deltaY = event.changedTouches[0].clientY - this.startY;
        this.isUp = deltaY < 0;
        const threshold = window.innerHeight * 2 / 5;  // 切换视频的滑动阈值
        if (this.translateY < -threshold && this.currentIndex < this.videos.length - 1) {
          this.func();
          this.currentIndex++;
          this.snapToVideo();
        } else if (this.translateY > threshold && this.currentIndex > 0) {
          this.func();
          this.currentIndex--;
          this.snapToVideo();
        } else {
          if (this.isUp) {
            if (this.currentIndex < this.videos.length - 1) {
              this.topMaster = this.who === 'master' ? 0 : window.innerHeight;
              this.topSlave = this.who === 'master' ? window.innerHeight : 0;
            } else {
              if (this.who === 'master') {
                this.topMaster = 0;
              }
              if (this.who === 'slave') {
                this.topSlave = 0;
              }
            }
          } else {
            if (this.currentIndex > 0) {
              this.topMaster = this.who === 'master' ? 0 : -window.innerHeight;
              this.topSlave = this.who === 'master' ? -window.innerHeight : 0;
            } else {
              if (this.who === 'master') {
                this.topMaster = 0;
              }
              if (this.who === 'slave') {
                this.topSlave = 0;
              }
            }
          }
        }
      },
      func() {
        this.who = (this.who === 'master' ? 'slave' : 'master');
        if (this.isUp) {
          this.topMaster = this.who === 'master' ? 0:-window.innerHeight;
          this.topSlave = this.who === 'master' ? -window.innerHeight:0;
        } else {
          this.topMaster = this.who === 'master' ? 0 : window.innerHeight;
          this.topSlave = this.who === 'master' ? window.innerHeight : 0;
        }
      },
      // 鼠标滚轮切换视频
      handleWheel(event) {
        if (this.isSnapping) return;
        if (event.deltaY > 0 && this.currentIndex < this.videos.length - 1) {
          this.currentIndex++;
        } else if (event.deltaY < 0 && this.currentIndex > 0) {
          this.currentIndex--;
        }
        this.snapToVideo();
      },
      // 自动对齐到视频位置
      snapToVideo() {
        // this.topMaster = 0;
        // this.topSlave = window.innerHeight;
        this.$nextTick(() => {
          if (this.who === 'master') {
            const video = this.$refs.videoMaster;
            if (video) video.play();
            const videoPause = this.$refs.videoSlave;
            if (video) videoPause.pause();
          } else {
            const video = this.$refs.videoSlave;
            if (video) video.play();
            const videoPause = this.$refs.videoMaster;
            if (video) videoPause.pause();
          }
        });
      },
    },
  };
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .feed-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .video-wrapper {
    width: 100%;
    height: 100%;
  }

  .video-slot {
    position: absolute;
    width: 100%;
    height: 100vh;
  }

  .video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    display: inline;
  }
</style>
