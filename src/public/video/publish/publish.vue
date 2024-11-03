<template>
  <div class="publish-box">
    <input type="file" @change="onFileChange" accept="video/mp4" @click.stop ref="fileInput" style="display: none;width: 0;height: 0"/>
    <div class="publish-info publish-top">
      <div class="publish-top-item">
        <direction-button
          text="返回"
          direction="to-left"
          class="flex-center-box publish-top-back"
          @click="back">
        </direction-button>
      </div>
      <div class="publish-top-item">
        <div class="publish-top-reselect" v-if="undefined !== videoInfo && videoInfo != null">
          <direction-button
            text="重新选择"
            direction="to-right"
            class="flex-center-box"
            @click="triggerInputClick">
          </direction-button>
        </div>
      </div>
    </div>
    <div class="publish-mid">
      <div class="empty-box"
           v-if="null == videoInfo" @click="triggerInputClick">
        <svg t="1729693390589" class="icon empty-box-svg" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="14916" width="256" height="256">
          <path
            d="M746.9056 520.1664c-115.5328-0.5632-210.6368 92.8768-212.1728 208.64-1.6128 118.4256 91.5968 215.1936 208.64 216.3712a212.1216 212.1216 0 0 0 214.7072-210.6112c0.896-117.9648-93.4912-213.76-211.1744-214.4z m49.0752 201.4208v108.7488h-99.1744v-108.7488H659.968l86.4-86.528 86.4 86.528h-36.8128z"
            fill="#909090" p-id="14917"></path>
          <path
            d="M494.464 708.1984c1.7408-126.6944 105.8304-229.0176 232.3968-228.4288a232.0384 232.0384 0 0 1 86.912 17.408V161.92a83.072 83.072 0 0 0-83.072-83.072H148.992a83.072 83.072 0 0 0-83.072 83.072v498.5856a83.0976 83.0976 0 0 0 83.072 83.1232h347.904a238.8992 238.8992 0 0 1-2.432-35.4304zM315.2384 203.52l332.3904 207.7184-332.3904 207.7184V203.52z"
            fill="#909090" p-id="14918"></path>
        </svg>
      </div>
      <div class="video-slot" v-else>
        <simple-video
          ref="videoShowBox"
          :current="true"
          :is-edit="true"
          class="video-item video"
          video-canvas-id="videoMasterId"
          :video-sound-switch="true"
          :video-info="videoInfo"
        />
      </div>
    </div>
    <div class="publish-info publish-bottom">
      <div class="bottom-button" @click="showOrClose">
        <div class="cir-item cir-item1"></div>
        <div class="cir-item cir-item2"></div>
        <div class="cir-item cir-item3"></div>
      </div>
    </div>
    <el-drawer
      title="作品编辑"
      :show-close="true"
      :modal="false"
      :wrapperClosable="false"
      :close-on-press-escape="true"
      class="publish-info-box"
      :withHeader="true"
      :visible.sync="show"
      size="70%"
      direction="btt"
      :before-close="handleClose">
      <div class="info-drawer-box">
        <div class="video-info-box simple-info-box">
          <div class="info-right simple-info">
            <div class="info-cover-box flex-left-box">
              <el-image v-if="videoFrame"
                        :src="videoFrame"
                        fit="cover"
                        :preview-src-list="[videoFrame]"
                        style="max-width: 100%; height: auto;"/>
              <div class="cover-label-box">
                <span class="unable-select-element">视频封面</span>
              </div>
            </div>
          </div>
          <div class="info-left simple-info">
            <div>
              <div class="simple-input-box info-title-box flex-center-box">
                <my-input :value="form.title" @update-value="updateTitle" placeholder="好的标题更吸引人..."/>
              </div>
              <div class="info-tag-box flex-center-box">
                <my-input :value="form.tags" @update-value="updateTags" placeholder="#话题 "/>
              </div>
              <div class="info-local-box flex-center-box">
                <my-input :value="form.location" @update-value="updateIpLocal" placeholder="你在哪里"/>
              </div>
            </div>
          </div>
        </div>
        <div style="padding-left: 1rem; padding-right: 1rem">
          <el-divider/>
        </div>
        <div class="video-info-box flex-center-box simple-input-box simple-input-description">
          <my-input :value="form.description" @update-value="updateDescription" placeholder="没有描述也是一种描述"/>
        </div>
        <div class="video-publish-box flex-right-box">
          <direction-button
            text="下一步"
            direction="to-right"
            class="flex-center-box"
            @click="publishVideo">
          </direction-button>
        </div>
      </div>
    </el-drawer>
    <video ref="videoForGetFrameVideo" style="position: fixed;top:0;left: 0;z-index: -100;width:100vw;height:100vh;margin: 0;padding: 0;border: 0"/>
    <canvas ref="videoForGetFrameCanvas" style="position: fixed;top:0;left: 0;z-index: -100;width:100vw;height:100vh;margin: 0;padding: 0;border: 0"/>
  </div>
</template>

<script>
  import BlendShow from "../../../components/Kit/Default/BlendShow";
  import SimpleVideo from "../assembly/SimpleVideo";
  import MyInput from "../../../components/Kit/Default/MyInput";
  import DirectionButton from "../../../components/Kit/button/DirectionButton";
  import {publishVideos} from "@/api/video/publish";

  export default {
    name: "publish",
    components: {DirectionButton, MyInput, BlendShow, SimpleVideo},
    props: {
      fromPage: {
        type: Boolean,
        default: true
      },
      baseUri: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        show: true,
        videoInfo: null,
        videoInfo_cache: {
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
          duration: 3,
          ipLocal: '北京',
          createTime: '2024-9-28 13:03',
          authName: '二叉树',
          userLink: '',
          title: null,
          description: '这是视频的描述！',
          tags: [
            {label: '自然风光', key: 0, link: '#'},
            {label: 'IKUN', key: 1, link: '#'},
            {label: '给我一个忘记你的理由', key: 2, link: '#'}
          ]
        },
        videoFrame: null,
        files: null,
        form: {
          title: '',
          description: '',
          tags:'',
          location:''
        }
      }
    },
    methods: {
      updateTitle(v) {
        this.form.title = v;
      },
      updateTags(v) {
        this.form.tags = v;
      },
      updateIpLocal(v) {
        this.form.location = v;
      },
      updateDescription(v) {
        this.form.description = v;
      },
      showOrClose() {
        if (undefined === this.videoInfo || null == this.videoInfo) {
          this.$message.info("请先上传一个视频在编辑视频消息");
          return
        }
        this.show = !this.show;
      },
      handleClose() {
        this.show = !this.show;
      },
      triggerInputClick() {
        this.$refs.fileInput.click();
      },
      onFileChange(event) {
        this.files = event.target.files;
        const file = event.target.files[0];
        if (file) {
          this.onClose();
          let videoSrc = URL.createObjectURL(file);
          this.$refs.videoForGetFrameVideo.src = videoSrc;
          this.videoInfo = {
            pageSrc: this.videoFrame,
            needShowVideoMenu: true,
            srcMatch: 'http://8.134.183.234:8000/public/video',
            currentVideoIndex: 0,
            transitionDuration: 3000,  // 过渡时长
            fadeOpacity: 1,  // 视频透明度
            video: null, // 用于存储视频元素
            videoSrc: [
              {src: videoSrc}
            ],
            duration: 3,
            ipLocal: '北京',
            createTime: '2024-9-28 13:03',
            authName: '二叉树',
            userLink: '',
            title: null,
            description: '这是视频的描述！',
            tags: [
              {label: '自然风光', key: 0, link: '#'},
              {label: 'IKUN', key: 1, link: '#'},
              {label: '给我一个忘记你的理由', key: 2, link: '#'}
            ]
          };
          this.$refs.videoShowBox.doUpdate(this.videoInfo)
        }
      },
      getFirstNonTransparentFrame() {
        const videoCanvas = this.$refs.videoForGetFrameCanvas;
        const videoElement = this.$refs.videoForGetFrameVideo;
        const ctx = videoCanvas.getContext('2d');
        const checkFrame = (currentTime) => {
          videoElement.currentTime = currentTime;
          videoElement.addEventListener('seeked', () => {
            ctx.drawImage(videoElement, 0, 0, videoCanvas.width, videoCanvas.height);
            const imageData = ctx.getImageData(0, 0, videoCanvas.width, videoCanvas.height);
            const pixels = imageData.data;
            for (let i = 0; i < pixels.length; i += 4) {
              if (pixels[i + 3] > 0) {
                // alpha 值大于 0 不是透明帧，返回帧
                this.videoFrame = videoCanvas.toDataURL('image/png');
                return;
              }
            }
            // 如果是透明帧，则增加当前时间，检查下一帧
            if (currentTime < videoElement.duration) {
              checkFrame(currentTime + 0.1);
            }
          });
        };
        videoCanvas.width = videoElement.videoWidth;
        videoCanvas.height = videoElement.videoHeight;
        checkFrame(0);
      },
      onClose() {
        if (this.videoInfo) {
          this.videoInfo.videoSrc.forEach(srcObj => {
            URL.revokeObjectURL(srcObj.src);
          });
          URL.revokeObjectURL(this.videoFrame);
          this.videoInfo = null;
          this.videoFrame = null;
        }
      },
      publishVideo() {
        if (!this.fromPage) {
          this.$emit("publish-before", true);
        }
        this.$refs.videoShowBox.doClose();
        this.show = false;
        publishVideos(this.files, {
          title: this.form.title,
          description: this.form.description,
          tags: this.form.tags,
          location: {
            name: this.form.location,
            longitude: 0,
            latitude:0
          }
        }, (progressEvent) => {
          let p = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          this.$emit("close-publish-process",  p);
          console.log(p)
        }).then(res => {
          if (res.code === 200) {
            this.$message.success("视频上传成功");
          } else {
            this.$message.warning("视频上传失败" + res.message);
          }
          this.$emit("close-publish-process", 100);
          this.$emit("close-publish", false);
          this.onClose();
          this.init();
          this.form={
            title: '',
              description: '',
              tags:'',
              location:''
          }
        }).catch(e => {
          this.$emit("close-publish", false);
          this.$emit("close-publish-process", 0);
          this.$message.warning("视频上传失败，请重试");
          this.onClose();
          this.init();
          console.log(e)
          this.form={
            title: '',
            description: '',
            tags:'',
            location:''
          }
        });
      },
      back() {
        this.onClose();
        this.init();
        if (!this.fromPage) {
          this.$emit("close-publish", false);
        } else {
          this.$router.go(-1);
        }
      },
      init() {
        this.show = false;
        this.videoInfo=null;
        this.videoInfo_cache={
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
            duration: 3,
            ipLocal: '北京',
            createTime: '2024-9-28 13:03',
            authName: '二叉树',
            userLink: '',
            title: null,
            description: '这是视频的描述！',
            tags: [
            {label: '自然风光', key: 0, link: '#'},
            {label: 'IKUN', key: 1, link: '#'},
            {label: '给我一个忘记你的理由', key: 2, link: '#'}
          ]
        };
        this.videoFrame= null;
        this.files = null;
        this.form = {
            title: '',
            description: '',
            tags:'',
            location:''
        }
      }
    },
    mounted() {
      this.init();
      this.show = undefined !== this.videoInfo && null != this.videoInfo;

      this.$refs.videoForGetFrameVideo.addEventListener('loadeddata', () => {
        this.getFirstNonTransparentFrame();
      });

      this.$refs.videoForGetFrameVideo.load();
    },
    beforeDestroy() {
      this.onClose();
    }
  }
</script>

<style scoped>
  * {
    border: 0;
    padding: 0;
    margin: 0;
  }

  .publish-box {
    width: 100vw;
    height: 100vh;
  }

  .publish-info {
    position: fixed;
    width: 100vw;
  }

  .publish-top {
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: left;
    justify-items: center;
    padding-left: .5rem;
    /*background: linear-gradient(to bottom, rgba(30, 30, 30, 1), rgba(30, 30, 30, 0));*/
    box-shadow: 0 0 0 0 var(--bottomColor);
  }

  .publish-top-item {
    padding-right: .2rem;
    border-radius: 999px;
  }

  .publish-top-reselect {
    display: flex;
    justify-items: center;
    justify-content: right;
  }

  .publish-top-back {
    display: flex;
    justify-items: center;
    justify-content: left;
  }

  .publish-bottom {
    bottom: 0;
    display: flex;
    justify-content: center;
    justify-items: center;
    background: linear-gradient(to top, rgba(30, 30, 30, 1), rgba(30, 30, 30, 0));
    padding-bottom: 1.5rem;
    padding-top: 1rem;
  }

  .empty-box {
    position: fixed;
    display: flex;
    justify-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10rem;
    height: 10rem;
    max-width: 256px;
    max-height: 256px;
  }

  .empty-box-svg {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .empty-box,
  .empty-box *,
  .empty-box :after,
  .empty-box :before,
  .empty-box:after,
  .empty-box:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .empty-box {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: var(--bottomColor);
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 100%;
    line-height: 1.5;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(var(--bottomColor), #fff);
    padding: 0;
  }

  @-webkit-keyframes pulse1 {
    0% {
      box-shadow: 0 0 0 0 var(--bottomColor);
    }
  }

  @keyframes pulse1 {
    0% {
      box-shadow: 0 0 0 0 var(--bottomColor);
    }
  }

  .empty-box:disabled {
    cursor: default;
  }

  .empty-box:-moz-focusring {
    outline: auto;
  }

  .empty-box svg {
    display: block;
    vertical-align: middle;
  }

  .empty-box [hidden] {
    display: none;
  }

  .empty-box {
    -webkit-animation: pulse1 2s infinite;
    animation: pulse1 2s infinite;
    border: 0;
    border-radius: 999px;
    box-shadow: 0 0 0 2em transparent;
    box-sizing: border-box;
    display: block;
    font-weight: 900;
    -webkit-mask-image: none;
    overflow: hidden;
    text-transform: uppercase;
  }


  .bottom-button,
  .bottom-button *,
  .bottom-button :after,
  .bottom-button :before,
  .bottom-button:after,
  .bottom-button:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .bottom-button {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: var(--bottomColor);
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 100%;
    line-height: 1.5;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(var(--bottomColor), #fff);
    padding: 0;
  }

  .bottom-button:disabled {
    cursor: default;
  }

  .bottom-button:-moz-focusring {
    outline: auto;
  }

  .bottom-button svg {
    display: block;
    vertical-align: middle;
  }

  .bottom-button [hidden] {
    display: none;
  }

  .bottom-button {
    width: 1rem;
    -webkit-animation: pulse 2s infinite;
    animation: pulse 2s infinite;
    border: 1px solid;
    border-radius: 999px;
    box-shadow: 0 0 0 2em transparent;
    box-sizing: border-box;
    display: block;
    font-weight: 900;
    -webkit-mask-image: none;
    overflow: hidden;
    padding: 1.2rem 3rem;
    position: relative;
    text-transform: uppercase;
  }

  @-webkit-keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #fff;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #fff;
    }
  }


  .btn-70,
  .btn-70 *,
  .btn-70 :after,
  .btn-70 :before,
  .btn-70:after,
  .btn-70:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .btn-70 {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: var(--bottomColor);
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 100%;
    line-height: 1.5;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(var(--bottomColor), #fff);
    padding: 0;
  }

  .btn-70:disabled {
    cursor: default;
  }

  .btn-70:-moz-focusring {
    outline: auto;
  }

  .btn-70 svg {
    display: block;
    vertical-align: middle;
  }

  .btn-70 [hidden] {
    display: none;
  }

  .btn-70 {
    box-shadow: inset 0 0 0 2px #fff;
    box-sizing: border-box;
    display: block;
    font-weight: 900;
    padding: 1.2rem 3rem;
    position: relative;
    text-transform: uppercase;
    transition: color 0.1s linear;
  }

  .btn-70:after,
  .btn-70:before {
    content: "";
    position: absolute;
  }

  .btn-70:before {
    border-bottom: var(--border);
    border-top: var(--border);
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }

  .btn-70:hover:before {
    --border: 4px solid var(--bottomColor);
    -webkit-animation: border-top-and-bottom 1s forwards;
    animation: border-top-and-bottom 1s forwards;
  }

  .btn-70:after {
    border-left: var(--border);
    border-right: var(--border);
    bottom: 50%;
    right: 0;
    transform: translateY(50%);
    width: 100%;
    z-index: -1;
  }

  .btn-70:hover:after {
    --border: 4px solid var(--bottomColor);
    -webkit-animation: border-right-and-left 1s forwards;
    animation: border-right-and-left 1s forwards;
  }

  @-webkit-keyframes border-top-and-bottom {
    0% {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes border-top-and-bottom {
    0% {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @-webkit-keyframes border-right-and-left {
    0% {
      height: 0;
    }
    to {
      height: 100%;
    }
  }

  @keyframes border-right-and-left {
    0% {
      height: 0;
    }
    to {
      height: 100%;
    }
  }

  .bottom-button {
    display: flex;
    justify-items: center;
    justify-content: center;
  }

  .cir-item {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: .4rem;
    height: .4rem;
    border-radius: .2rem;
    background-color: #fff;
    transition: all 0.3s linear;
  }

  .bottom-button:hover > .cir-item1 {
    transform: translateY(-50%) translateX(-250%);
  }

  .bottom-button:hover > .cir-item3 {
    transform: translateY(-50%) translateX(250%);
  }


  .publish-info-box {
    background-color: rgba(255, 255, 255, 0.6);
  }


  .flex-center-box {
    display: flex;
    justify-content: center;
    justify-items: center;
  }

  .flex-left-box {
    display: flex;
    justify-content: left;
    justify-items: center;
  }

  .flex-right-box {
    display: flex;
    justify-content: right;
    justify-items: center;
  }

  .info-drawer-box {

  }

  .video-info-box {

  }

  .video-publish-box {
    margin-right: 2rem;
  }

  .el-image {
    width: 20vw;
    height: 20vh;
    max-height: 256px;
    max-width: 256px;
    border-radius: .4rem;
  }

  .el-image > * {
    background-color: rgba(0, 0, 0, 0);
  }

  .simple-info-box {
    display: flex;
    padding: 1rem;
  }

  .simple-info {
    display: inline-block;
  }

  .simple-input-box {
    margin-top: .2rem;
    margin-bottom: .2rem;
  }

  .simple-input-description {
    padding-right: .2rem;
    padding-left: .2rem;
  }

  .info-cover-box {
    position: relative;
    max-width: 256px;
  }

  .cover-label-box {
    display: inline;
    position: absolute;
    width: 100%;
    font-size: .7rem;
    font-weight: bold;
    top: 100%;
    transform: translateY(-100%);
    z-index: 99;
    background-color: rgba(25, 24, 35, 0.7);
    color: #fff;
    text-align: center;
    padding: .2rem;
    border-radius: 0 0 .4rem .4rem;
    max-width: 256px;
  }
</style>
