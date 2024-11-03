<template>
  <div class="video-box" id="video-box-show">
    <ul style="width: 100%;height: auto;padding: 0;margin: 0;border: 0;list-style: none">
      <li>
        <div class="video-container" @mouseenter="hoverVideoMenu()" @mouseleave="leaveVideoMenu()">
          <img
            v-if="!current && !isEdit"
            v-bind:src="avatar"/>
          <canvas
            @click="!checkIsPlay() ? clickToPlayVideo() : clickToPauseVideo()"
            v-if="current"
            :ref="videoCanvasId"
            class="video-canvas"/>
          <div v-if="showPauseIcon" :class="['video-play-icon']">
            <svg t="1726998892925"
                 @click="clickToPlayVideo()"
                 :class="['icon','play-video']"
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6102"
                 width="200"
                 height="200">
              <path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#BE3E50"
                    p-id="6103"></path>
              <path
                d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z"
                fill="#e1e1e1" p-id="6104"></path>
              <path
                d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z"
                fill="#e1e1e1" p-id="6105"></path>
            </svg>
          </div>
        </div>
      </li>
    </ul>
    <div class="options-list">
      <video-operation v-if="!isEdit" ref="videoOptionRef" class="video-operation" :videoInfo="videoInfo.about"/>
    </div>
    <video-description id="descriptionInfo" ref="descriptionInfo" v-if="!isEdit" :video-info="videoInfo" class="video-info"/>
    <simple-percentage-bar class="simple-percentage-bar"
                           @changeTo="changeTo"
                           ref="simplePercentageBar"
                           width="100"
                           height="0.2rem"
                           :current-percentage="0"
                           :full-percentage="0"/>
  </div>
</template>

<script>
  import VideoOperation from "./VideoOperation";
  import {VideoPipeline} from "../js/VideoPipeline";
  import VideoDescription from "./VideoDescription";
  import SimplePercentageBar from "./SimplePercentageBar";

  export default {
    name: "SimpleVideo",
    components: {SimplePercentageBar, VideoDescription, VideoOperation},
    props: {
      current: {
        type: Boolean,
        default: false
      },
      page: {
        type: String,
        default: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      },
      videoInfo: {
        type: Object,
        required: true
      },
      videoCanvasId: {
        type: String,
        required: true
      },
      videoSoundSwitch: {
        type: Boolean,
        default: false
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      footHeight: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        videoElement: null,
        isPlay: true,
        percentage:0,
        showPauseIcon: true,
        avatar: ''
      }
    },
    computed: {

    },
    methods: {
      initVideoList() {
        this.videoInfo = {
          userAvatar: "",
          needShowVideoMenu: true,
          srcMatch: 'http://8.134.183.234:8000/public/video',
          currentVideoIndex: 0,
          transitionDuration: 3000,  // 过渡时长
          fadeOpacity: 1,  // 视频透明度
          video: null, // 用于存储视频元素
          videoSrc: [
            {src: 'http://8.134.183.234:8000/public/video_1.mp4'},
            {src: 'http://8.134.183.234:8000/video/video_2.mp4'},
            // {src: 'http://8.134.183.234:8000/video/video_2.mp4'},
            // {src: 'http://8.134.183.234:8000/video/video_3.mp4'},
            // {src: 'http://8.134.183.234:8000/video/video_4.mp4'},
            // {src: 'http://8.134.183.234:8000/video/video_5.mp4'},
            // {src: 'http://8.134.183.234:8000/video/video_6.mp4'},
          ],
        };
      },
      hoverVideoMenu(){
        if (!this.videoPipeline) return false;
        this.videoPipeline.hoverVideoMenu();
      },
      leaveVideoMenu() {
        if (!this.videoPipeline) return false;
        this.videoPipeline.leaveVideoMenu();
      },
      clickToPlayVideo() {
        if (!this.videoPipeline) return false;
        this.videoPipeline.clickToPlayVideo();
        this.isPlay = true;
        this.showPauseIcon = false;
      },
      clickToPauseVideo() {
        if (!this.videoPipeline) return false;
        this.videoPipeline.clickToPauseVideo();
        this.showPauseIcon = true;
      },
      needShowVideoMenu() {
        if (!this.videoPipeline) return false;
        return this.videoPipeline.checkVideoIsShowMenu();
      },
      checkIsPlay() {
        if (!this.videoPipeline) return false;
        return this.videoPipeline.checkVideoIsPlay();
      },
      doInit() {
        this.doClose();
        if (this.current) {
          this.videoInfo.needShowVideoMenu = true;
          const element = document.getElementById('video-box-show');
          const maxWidth = element.clientWidth;
          const maxHeight = element.clientHeight;
          // 如果不存在，则创建新的 video 元素
          this.videoElement = document.createElement('video');
          this.videoElement.style.objectFit = 'cover';
          this.videoElement.style.width = maxWidth + 'px';
          this.videoElement.style.height = maxHeight + 'px';

          this.videoPipeline = new VideoPipeline(
                  this.videoInfo,
                  this.videoSoundSwitch,
                  this.$refs[this.videoCanvasId],
                  this.isPlay,
                  this.videoElement,
                  maxWidth, maxHeight,
                  this.videoProcessAccept).begin();
          this.isPlay = this.videoPipeline.checkVideoIsPlay();
          if (this.videoSoundSwitch) {
            this.videoPipeline.switchSound(true);
          }
        }
        this.showPauseIcon = this.current && !this.isPlay && !this.checkIsPlay();
        if (this.$refs.descriptionInfo) {
          this.$refs.descriptionInfo.update(this.videoInfo);
        }
      },
      doUpdate(newVideoInfo) {
        this.videoInfo = newVideoInfo;
        this.$refs.videoOptionRef.doUpdate( this.videoInfo.about);
        this.doInit();
      },
      changeTo(percentage) {
        if (!this.videoPipeline) {
          return
        }
        this.videoPipeline.changeTo(percentage);
      },
      doClose() {
        if (this.videoElement) {
          this.videoElement.pause();
          this.videoElement.src="";
          this.videoElement.load();
        }
        if (this.videoPipeline) {
          this.videoPipeline.destroy();
        }
      },
      openSound() {
        if (!this.videoPipeline) return;
        this.videoSoundSwitch = true;
        this.videoPipeline.switchSound(true);
      },
      resizeVideo() {
        if (this.videoPipeline) {
          this.videoPipeline.resize();
        }
      },
      videoProcessAccept(played, process) {
        this.$refs.simplePercentageBar.onChange(played, process);
      }
    },
    mounted() {
      this.doInit();
    },
    beforeDestroy() {
     this.doClose();
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    --mainColor: #e1e1e1;
  }

  body {
    background-color: #e1e1e1;
  }

  .video-box {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-items: center;
    justify-content: center;
    background-color: #1e1e1e;
  }

  .video-box > ul {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 0;
    transform: translate(-50%, -50%);
  }

  ul > li {
    list-style: none;
  }

  .options-list {
    position: absolute;
    top: 100%;
    right: 0;
    transform: translate(-1%, -110%);
  }

  .video-container {
    width: 100%;
    height: auto;
    margin: 0;
    max-width: 100%;
    max-height: 100%;
    transition: all 1s ease-out;
    animation: initVideo 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    position: relative;
    cursor: pointer;
  }

  @keyframes initVideo {
    0% {
      opacity: 0;
      width: 100vw;
    }
    70% {
      width: 100vw;
    }
    100% {
      opacity: 1;
      width: 100vw;
    }
  }

  .video-canvas {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;

    cursor: pointer;
  }

  .video-play-icon > svg {
    margin: 1rem;
  }

  .video-play-icon > svg:hover {
    transform: scale(1.1);
  }

  .videoContainer-li > canvas {
    width: 100%;
    height: 100%;
  }

  .video-play-icon {
    width: 60%;
    display: flex;
    justify-items: center;
    justify-content: center;
    position: absolute;
    cursor: pointer;
  }

  .video-play-icon > svg {
    margin: 1rem;
  }

  .video-play-icon > svg:hover {
    transform: scale(1.1);
  }

  .video-operation {
    position: absolute;
    /*position: fixed;*/
    top: 50%;
    right: 0;
    transform: translateY(-130%);
  }

  .video-info {
    position: absolute;
    /*width: 60%;*/
    /*bottom: 8vh;*/
    /*position: absolute;*/
    cursor: pointer;
    /*bottom: .1rem;*/
    top: 100%;
    transform: translateY(-100%);
    /*this.$refs.transformElement.style.transform = 'translate(100px, 0)';*/
    /*top: 90vh;*/
}

.video-image {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.el-image >* {
  background-color: rgba(0,0,0,0);
}

.hidden-pause-button {
  animation: hiddenPauseButton 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.show-pause-button {
  animation: showPauseButton 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes showPauseButton {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes hiddenPauseButton {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

  .simple-percentage-bar {
    position: absolute;
    top: 100%;
    width: 100vh;
    height: .2rem;
    margin: 0;
    padding: 0;
    transform: translateY(-100%);
  }
  .play-video {
    width: 6rem;
    height: 6rem;
    transition: all .5s linear;
  }
</style>
