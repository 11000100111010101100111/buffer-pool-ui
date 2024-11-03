<template>
  <div class="video-foot">
    <div class="foot-left">
      <div class="btn-91">
        <svg
          @click="toPublish"
          t="1729685757366"
          class="icon video-foot-publish"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="7352" width="36" height="36">
          <path
            d="M512 17.6128c-382.293333 0-477.866667 95.573333-477.866667 477.866667s95.573333 477.866667 477.866667 477.866666 477.866667-95.573333 477.866667-477.866666-95.573333-477.866667-477.866667-477.866667z"
            fill="#FFFFFF" fill-opacity="1" p-id="7353"></path>
          <path
            d="M504.695467 222.4128a51.2 51.2 0 0 0-51.2 51.2v143.837867H290.133333a51.2 51.2 0 0 0-51.2 51.2v14.677333c0 28.2624 22.9376 51.2 51.2 51.2h163.362134v182.818133c0 28.330667 22.9376 51.2 51.2 51.2h14.609066a51.2 51.2 0 0 0 51.2-51.2l0.068267-182.8864h163.293867a51.2 51.2 0 0 0 51.2-51.2v-14.5408a51.2 51.2 0 0 0-51.2-51.2H570.5728V273.544533a51.2 51.2 0 0 0-51.2-51.2h-14.677333z"
            fill="1E1E1E" p-id="7354"></path>
        </svg>
      </div>
      <div class="foot-left-item video-foot-search">
        <my-input placeholder="想看点什么吗？"
                  class="foot-search"
                  @blur="blurInput"
                  @focus="focusInput"/>
      </div>
    </div>
    <div v-if="!focused" class="foot-right" @click="openSound()">
      <svg t="1729348824567" :class='["icon", "sound-switch", "span", !soundIsOpen ? "" : "sound-pic"]' viewBox="0 0 1024 1024"
           version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="10194" width="32" height="32">
        <path
          d="M512 59.392c-249.856 0-452.608 202.752-452.608 452.608 0 249.856 202.752 452.608 452.608 452.608s452.608-202.752 452.608-452.608c0-249.856-202.752-452.608-452.608-452.608z"
          fill="#fff" p-id="10195"></path>
        <path d="M640 509.952V78.848c-20.48-6.656-44.544-10.24-65.024-13.824v444.928H640z"
              fill="#191823"
              p-id="10196"></path>
        <path d="M512 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z"
              fill="#191823" p-id="10197"></path>
        <path
          d="M437.248 256c-80.896 37.376-146.944 102.912-184.32 184.32H187.392c46.592-112.64 137.216-202.752 249.856-249.856V256zM580.608 833.536V768c77.824-40.448 143.36-105.984 184.32-184.32h65.536c-47.104 112.64-137.216 202.752-249.856 249.856z"
          fill="#191823" p-id="10198"></path>
      </svg>
    </div>
  </div>
</template>

<script>
  import SimpleSearch from "./SimpleSearch";
  import SimpleUser from "./SimpleUser";
  import PictureAndText from "../common/PictureAndText";
  import MyInput from "../../../components/Kit/Default/MyInput";

  export default {
    name: "VideoFoot",
    components: {MyInput, PictureAndText, SimpleUser, SimpleSearch},
    props: {
      soundIsOpen: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        focused: false
      }
    },
    methods: {
      openSound() {
        if (!this.soundIsOpen) {
          this.$emit("open-sound", true);
        }
      },
      toPublish() {
        //window.location.href = '/lai-kan/video/publish';
        this.$emit("open-publish", true);
      },
      focusInput() {
        this.focused = true;
      },
      blurInput() {
        this.focused = false;
      }
    }
  }
</script>

<style scoped>
  .video-foot {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    width: 100%;

    background: #1e1e1e;

    padding: 1rem;
  }

  .video-foot-search {
    margin-left: .2rem;
    max-width: 95vw;
    width: 50vw;
    transition: width 0.35s;
    transform-origin: left;
  }

  .video-foot-search:focus-within {
    width: 95vw;
  }

  .video-foot-publish {
    width: auto;
    height: auto;
    cursor: pointer;
  }

  .foot-left {
    width: 90vw;
    display: flex;
    justify-items: center;
    justify-content: left;
  }

  .foot-left-item  {
    display: inline-block;
  }

  .foot-right {
    width: 10vw;
    display: flex;
    justify-items: center;
    justify-content: right;
    padding-right: .2rem;
  }

  .span {
    color: #fff !important;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .sound-pic {
    animation: spin 3.5s linear infinite;
  }

  .divider-span-v2 {
    color: var(--mainColor);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg); /* 初始角度 */
    }
    100% {
      transform: rotate(360deg); /* 旋转一整圈 */
    }
  }

  .foot-search {

  }

  .btn-91{
    display: flex;
    justify-content: center;
    justify-items: center;
  }

  .btn-91,
  .btn-91 *,
  .btn-91 :after,
  .btn-91 :before,
  .btn-91:after,
  .btn-91:before {
    border: 0 solid;
    box-sizing: border-box;
  }
  .btn-91 {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-image: none;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
    padding: 0;
  }
  .btn-91:disabled {
    cursor: default;
  }
  .btn-91:-moz-focusring {
    outline: auto;
  }
  .btn-91 svg {
    display: block;
    vertical-align: middle;
  }
  .btn-91 [hidden] {
    display: none;
  }
  .btn-91 {
    background: none;
    border: .2rem solid;
    border-radius: 999px;
    box-sizing: border-box;
    display: block;
    position: relative;
    text-transform: uppercase;
  }
  .btn-91 span {
    font-weight: 900;
  }
  .btn-91:after,
  .btn-91:before {
    border: .2rem solid red;
    border-radius: 9999px;
    content: "";
    inset: -0.2rem;
    position: absolute;
    z-index: -1;
  }
  .btn-91:after {
    border-color: blue;
  }
  .btn-91:before {
    -webkit-animation: glitch-border 3s infinite;
    animation: glitch-border 3s infinite;
  }
  .btn-91:after {
    animation: glitch-border 3s infinite reverse;
  }
  .btn-91 span {
    -webkit-animation: glitch-text 3s infinite;
    animation: glitch-text 3s infinite;
  }
  @-webkit-keyframes glitch-text {
    0% {
      text-shadow: 0 0 0 red, 0 0 0 blue;
    }
    50% {
      text-shadow: -2px 1px 0 red, 2px -1px 0 blue;
    }
    100% {
      text-shadow: 0 0 0 red, 0 0 0 blue;
    }
  }
  @keyframes glitch-text {
    0% {
      text-shadow: 0 0 0 red, 0 0 0 blue;
    }
    50% {
      text-shadow: -2px 1px 0 red, 2px -1px 0 blue;
    }
    100% {
      text-shadow: 0 0 0 red, 0 0 0 blue;
    }
  }
  @-webkit-keyframes glitch-border {
    0% {
      transform: translate(2px, -1px);
    }
    50% {
      transform: translate(-2px, -1px);
    }
    100% {
      transform: translate(2px, -1px);
    }
  }
  @keyframes glitch-border {
    0% {
      transform: translate(2px, -1px);
    }
    50% {
      transform: translate(-2px, -1px);
    }
    100% {
      transform: translate(2px, -1px);
    }
  }

  .sound-switch {
    max-height: 2.4rem;
    max-width: 2.4rem;
    min-height: 2.4rem;
    min-width: 2.4rem;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 1.2rem;
    border: .2rem solid;
  }
</style>
