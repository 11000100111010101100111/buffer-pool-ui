<template>
  <div class="video-container" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch">
    <video
      ref="videoPlayer"
      :src="videoUrl"
      autoplay
      loop
      controls
      class="video"
      @play="onPlay"
      @pause="onPause">
    </video>
  </div>
</template>

<script>
  export default {
    props: {
      videoUrl: String
    },
    methods: {
      onPlay() {
        console.log('Video is playing');
      },
      onPause() {
        console.log('Video is paused');
      },
      startTouch(event) {
        this.startY = event.touches[0].clientY;
      },
      moveTouch(event) {
        this.endY = event.touches[0].clientY;
      },
      endTouch() {
        const distance = this.endY - this.startY;
        if (distance > 50) {
          this.$emit('swipeDown');
        } else if (distance < -50) {
          this.$emit('swipeUp');
        }
      }
    },
    data() {
      return {
        startY: 0,
        endY: 0
      };
    }
  };
</script>

<style scoped>
  .video-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
</style>
