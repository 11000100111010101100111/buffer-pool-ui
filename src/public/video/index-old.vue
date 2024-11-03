<template>
    <div class="short-video-home">
      <div class="video-head-contain">
        <video-head/>
      </div>
      <div class="video-contain">
        <simple-video id="prev-video" class="video-item" :video-info="videoInfo[0]"/>
        <simple-video id="current-video" class="video-item" :current="true" :video-info="videoInfo[1]"/>
        <simple-video class="video-item" id="next-video" :video-info="videoInfo[2]"/>
      </div>
      <div class="video-foot-contain">
        <video-foot />
      </div>
    </div>
</template>

<script>
    import VideoHead from "./assembly/VideoHead";
    import VideoFoot from "./assembly/VideoFoot";
    import SimpleVideo from "./assembly/SimpleVideo";
    import VideoDescription from "./assembly/VideoDescription";
    import {VideoSlider} from "./js/VideoSlider";

    export default {
        name: "index",
        components: {VideoDescription, SimpleVideo, VideoFoot, VideoHead},
        data() {
          return {
            count: 0,
            slider: null,
            videoInfo: [
              {
                pageSrc: "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
                needShowVideoMenu: true,
                srcMatch: 'http://8.134.183.234:8000/public/video',
                currentVideoIndex: 0,
                transitionDuration: 3000,  // 过渡时长
                fadeOpacity: 1,  // 视频透明度
                video: null, // 用于存储视频元素
                videoSrc: [
                  {src: 'http://8.134.183.234:8000/public/video_1.mp4'},
                  {src: 'http://8.134.183.234:8000/video/video_2.mp4'}
                ],
              },
              {
                pageSrc: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
                needShowVideoMenu: true,
                srcMatch: 'http://8.134.183.234:8000/public/video',
                currentVideoIndex: 0,
                transitionDuration: 3000,  // 过渡时长
                fadeOpacity: 1,  // 视频透明度
                video: null, // 用于存储视频元素
                videoSrc: [
                  {src: 'http://8.134.183.234:8000/public/video_2.mp4'},
                  {src: 'http://8.134.183.234:8000/video/video_2.mp4'}
                ],
              },
              {
                pageSrc: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                needShowVideoMenu: true,
                srcMatch: 'http://8.134.183.234:8000/public/video',
                currentVideoIndex: 0,
                transitionDuration: 3000,  // 过渡时长
                fadeOpacity: 1,  // 视频透明度
                video: null, // 用于存储视频元素
                videoSrc: [
                  {src: 'http://8.134.183.234:8000/public/video_3.mp4'},
                  {src: 'http://8.134.183.234:8000/video/video_2.mp4'}
                ],
              }
            ]
          }
        },
        methods: {
          moveVideo() {

          }
        },
        mounted() {
            this.$message.warning("来看短视频正在升级中~，以后再来吧");
            this.slider = new VideoSlider(this.videoInfo);
        }
    }
</script>

<style scoped>
  * {
    border: 0;
    padding: 0;
    margin: 0;
  }

  .video-head-contain {
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 9999;
  }

  .video-foot-contain {
    position: fixed;
    width: 100vw;
    height: auto;
    z-index: 9999;
    bottom: 0;
  }

  .video-contain {
    width: 100vw;
    height: 100vh;
    background-color: #1e1e1e;
    position: relative;
    overflow: hidden;
  }

  .video-item{
    height: 100%;
    position: absolute;
    transition: transform 0.5s ease, opacity 0.5s ease;
  }

  #prev-video {
    transform: translateY(-100%); /* 初始位置在上方 */
  }

  #next-video {
    transform: translateY(100%); /* 初始位置在下方 */
  }
</style>
