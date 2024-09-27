<template>
    <div class="video-box">
      <ul>
        <li>
          <div class="video-container" @mouseenter="hoverVideoMenu" @mouseleave="leaveVideoMenu">
            <canvas ref="videoCanvas" class="video-canvas"/>
            <div :class="['video-play-icon', videoInfo.needShowVideoMenu ? 'show-menu' : 'un-show-menu']">
              <svg v-if="videoInfo.needShowVideoMenu" @click="playLastVideo" t="1727021769483"
                   :class="['icon','last-video', videoInfo.needShowVideoMenu ? 'show-menu' : 'un-show-menu']"
                   viewBox="0 0 1171 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9175" width="200"
                   height="200">
                <path
                  d="M49.486529 0.618582a49.486529 49.486529 0 0 0-49.486529 49.486529v923.789778a49.486529 49.486529 0 0 0 98.973058 0V50.105111a49.486529 49.486529 0 0 0-49.486529-49.486529zM872.818654 27.58874l-533.217349 313.744593a197.946116 197.946116 0 0 0 0 341.333334l533.217349 313.744593a197.946116 197.946116 0 0 0 298.40377-170.728525V197.946116A197.946116 197.946116 0 0 0 872.818654 27.58874z m199.430712 798.093995v8.783859a98.973058 98.973058 0 0 1-148.459587 76.580404L389.706415 597.302404l-8.165277-5.319802a98.973058 98.973058 0 0 1 8.165277-165.285006L923.047481 112.953002l7.670412-4.082638A98.973058 98.973058 0 0 1 1072.249366 197.946116z"
                  p-id="9176" fill="#BE3E50"></path>
              </svg>
              <svg v-if="videoInfo.needShowVideoMenu && !videoPlay" @click="clickToPlayVideo" t="1726998892925"
                   :class="['icon','play-video', videoInfo.needShowVideoMenu ? 'show-menu' : 'un-show-menu']"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6102" width="200"
                   height="200">
                <path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#BE3E50"
                      p-id="6103"></path>
                <path
                  d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z"
                  fill="#BE3E50" p-id="6104"></path>
                <path
                  d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z"
                  fill="#BE3E50" p-id="6105"></path>
              </svg>
              <svg v-if="videoInfo.needShowVideoMenu && videoPlay" @click="clickToPauseVideo" t="1727022666759"
                   :class="['icon','pause-video', videoInfo.needShowVideoMenu ? 'show-menu' : 'un-show-menu']"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1815" width="200"
                   height="200">
                <path
                  d="M247.731946 0a49.546389 49.546389 0 0 0-49.546389 49.546389v924.907222a49.546389 49.546389 0 0 0 99.092779 0V49.546389a49.546389 49.546389 0 0 0-49.54639-49.546389zM776.268054 0a49.546389 49.546389 0 0 0-49.54639 49.546389v924.907222a49.546389 49.546389 0 0 0 99.092779 0V49.546389a49.546389 49.546389 0 0 0-49.546389-49.546389z"
                  p-id="1816" fill="#BE3E50"></path>
              </svg>
              <svg v-if="videoInfo.needShowVideoMenu" @click="playNextVideo" t="1727021849924"
                   :class="['icon','next-video', videoInfo.needShowVideoMenu ? 'show-menu' : 'un-show-menu']"
                   viewBox="0 0 1171 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1599" width="200"
                   height="200">
                <path
                  d="M1121.735895 0.618582a49.486529 49.486529 0 0 0-49.486529 49.486529v923.789778a49.486529 49.486529 0 0 0 98.973058 0V50.105111a49.486529 49.486529 0 0 0-49.486529-49.486529zM831.621119 341.333333L298.280053 27.58874l-9.649873-5.319802A197.946116 197.946116 0 0 0 0 197.946116v638.871088a197.946116 197.946116 0 0 0 298.280053 159.47034l533.341066-313.744594 11.134469-7.05183a197.946116 197.946116 0 0 0-11.134469-334.157787z m-49.486529 255.969071L248.051226 911.046998a98.973058 98.973058 0 0 1-148.459587-85.364263V197.946116a98.973058 98.973058 0 0 1 148.459587-84.993114l533.464782 313.744594a98.973058 98.973058 0 0 1 0 170.604808z"
                  p-id="1600" fill="#BE3E50"></path>
              </svg>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "SpecialVideo",
        data() {
          return {
            soundOpen: true,
            videoPlay: true,
            rootFontSize: 0,
            videoInfo: {
              srcMatch: 'http://8.134.183.234:8000/public/video',
              currentVideoIndex: 0,
              transitionDuration: 1000,  // 过渡时长
              fadeOpacity: 1,  // 视频透明度
              video: null, // 用于存储视频元素
              videoSrc: [],
              needShowVideoMenu: true
            },
          }
        },
        methods: {
          initVideoList() {
            this.videoInfo = {
              needShowVideoMenu: true,
              srcMatch: 'http://8.134.183.234:8000/public/video',
              currentVideoIndex: 0,
              transitionDuration: 3000,  // 过渡时长
              fadeOpacity: 1,  // 视频透明度
              video: null, // 用于存储视频元素
              videoSrc: [
                {src: '/video/ikun.mp4'},
                {src: '/video/ikun_01.mp4'},
                {src: '/video/video_02.mp4'},
                {src: '/video/video_03.mp4'},
                {src: '/video/video_04.mp4'},
                {src: '/video/video_05.mp4'},
                {src: '/video/video_06.mp4'},
              ],
            };
          },
          initVideo() {
            this.videoInfo.video = document.createElement('video');
            this.videoInfo.video.src = this.videoInfo.srcMatch + '_' + this.videoInfo.currentVideoIndex + '.mp4';//this.videoInfo.videoSrc[0].src;
            this.videoInfo.video.autoplay = true;
            this.videoInfo.video.loop = false;
            this.videoInfo.video.muted = !this.soundOpen;

            this.videoInfo.video.addEventListener('loadedmetadata', this.loadMetadata);

            this.videoInfo.video.addEventListener('ended', this.fadeOutAndNextVideo);
            this.videoInfo.video.addEventListener('error', this.playError);

            this.videoInfo.video.addEventListener('play', () => {
              const canvas = this.$refs.videoCanvas;
              const context = canvas.getContext('2d');
              this.drawFrame(context);
            });
          },
          loadMetadata() {
            const canvas = this.$refs.videoCanvas;
            canvas.width = this.videoInfo.video.videoWidth;
            canvas.height = this.videoInfo.video.videoHeight;
          },
          playError() {
            this.videoInfo.currentVideoIndex = -1;
            this.fadeOutAndNextVideo();
          },
          fadeOutAndNextVideo() {
            this.play(true);
          },
          play(isNext) {
            this.videoInfo.fadeOpacity = 1;
            const fadeOutInterval = setInterval(() => {
              this.videoInfo.fadeOpacity -= 0.05;
              if (this.videoInfo.fadeOpacity <= 0) {
                clearInterval(fadeOutInterval);
                if (isNext) {
                  this.playNextVideo();
                } else {

                }
              }
            }, this.videoInfo.transitionDuration / 50);
          },
          playVideoAfterHandleCurrentVideoIndex() {
            let src = this.videoInfo.srcMatch + '_' + this.videoInfo.currentVideoIndex + '.mp4';
            this.videoInfo.video.src = src;//this.videoInfo.videoSrc[this.videoInfo.currentVideoIndex].src;

            // 开始淡入
            this.videoInfo.fadeOpacity = 0;
            const fadeInInterval = setInterval(() => {
              this.videoInfo.fadeOpacity += 0.05;  // 每次增加透明度
              if (this.videoInfo.fadeOpacity >= 1) {
                clearInterval(fadeInInterval);  // 完成淡入
              }
            }, this.videoInfo.transitionDuration / 50);

            this.videoInfo.video.play();
            this.videoPlay = true;
          },
          playNextVideo() {
            this.videoPlay = true;
            this.videoInfo.currentVideoIndex++;
            this.playVideoAfterHandleCurrentVideoIndex();
          },
          playLastVideo() {
            if (this.videoInfo.currentVideoIndex <= 0) {
              this.$message.warning("已经是最开始的视频了，不能再退了喔");
              return;
            }
            this.videoPlay = true;
            this.videoInfo.currentVideoIndex--;
            this.playVideoAfterHandleCurrentVideoIndex();
          },
          drawFrame(context) {
            if (!this.videoInfo.video.paused && !this.videoInfo.video.ended) {
              context.drawImage(this.videoInfo.video, 0, 0, context.canvas.width, context.canvas.height);
              context.globalAlpha = this.videoInfo.fadeOpacity;  // 应用透明度
              context.drawImage(this.videoInfo.video, 0, 0, context.canvas.width, context.canvas.height);
              requestAnimationFrame(() => this.drawFrame(context));
            }
          },
          clickToPlayVideo() {
            this.playVideo();
          },
          clickToPauseVideo() {
            this.videoInfo.video.pause();
            this.videoPlay = false;
          },
          playVideo() {
            this.videoInfo.video.play();
            this.videoPlay = true;
            this.videoInfo.needShowVideoMenu = !this.videoPlay;
          },
          hoverVideoMenu(e) {
            this.videoInfo.needShowVideoMenu = true;
          },
          leaveVideoMenu(e) {
            this.videoInfo.needShowVideoMenu = false;
          },
        },
        mounted() {
          this.videoInfo.needShowVideoMenu = true;
          this.initVideoList();
          this.rootFontSize = parseFloat(getComputedStyle(this.$root.$el).fontSize);
          this.initVideo();
          this.videoInfo.video.play();
        },
        beforeDestroy() {
          this.videoInfo.video.removeEventListener('play', this.drawFrame);
          this.videoInfo.video.removeEventListener('error', this.playError);
          this.videoInfo.video.removeEventListener('ended', this.playNextVideo);
          this.videoInfo.video.removeEventListener('loadedmetadata', this.loadMetadata);
          this.videoInfo.video.pause();
          this.videoInfo.video.src = '';
          this.videoInfo.video.load();
        }
    }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    --mainColor: #BE3E50;
  }
  body {
    background-color: var(--mainColor);
  }
  .video-box {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-items: center;
    justify-content: center;
  }
  .video-box>ul{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  ul>li{
    list-style: none;
  }

  .video-container {
    width: 48rem;
    height: auto;
    margin: 0;
    max-width: 80vw;
    transition: all 1s ease-out;
    aspect-ratio: 5 / 3;
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
      width: 44rem;
    }
    70% {
      width: 48rem;
    }
    100% {
      opacity: 1;
      width: 48rem;
    }
  }

  .video-canvas {
    width: 100%;
    height: 100%;

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
</style>
