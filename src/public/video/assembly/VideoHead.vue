<template>
  <div class="video-head-box">
    <div class="top-left setting-box">

    </div>
    <ul class="video-head">
      <li class="video-head-menu-item unable-select-element" @click="toVideoHome">
        <span>首页</span>
      </li>
      <li class="video-head-menu-item unable-select-element" @click="toRecommend">
        <span>推荐</span>
      </li>
      <li class="video-head-menu-item unable-select-element" @click="toExplore">
        <span>发现</span>
      </li>
      <li class="video-head-menu-item unable-select-element" @click="toHotList">
        <span>热榜</span>
      </li>
      <li class="video-head-menu-item unable-select-element" @click="toDaily">
        <span>日常</span>
      </li>
      <li class="video-head-menu-item unable-select-element" @click="toDailyTask">
        <span>任务</span>
      </li>
    </ul>
    <div class="top-right user-box">
      <user-login-info/>
    </div>
  </div>
</template>

<script>
    import UserLoginInfo from "../../common/UserLoginInfo";
    export default {
    components: {UserLoginInfo},
        name: "VideoHead",
        data() {
          return {

          }
        },
        methods: {
          toVideoHome() {
            window.open('/home', '_blank');
          },
          toRecommend() {
            this.$message.info("暂未开放，功能加急上线中~")
          },
          toExplore() {
            this.$message.info("暂未开放，功能加急上线中~")
          },
          toHotList() {
            this.$message.info("暂未开放，功能加急上线中~")
          },
          toDaily() {
            this.$message.info("暂未开放，功能加急上线中~")
          },
          toDailyTask() {
            this.$message.info("暂未开放，功能加急上线中~")
          }
        }
    }
</script>

<style scoped>

  .video-head-box {
    width: 100vw;
    background: rgba(30, 30, 30, 0.29);
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    justify-items: center;
  }
  .video-head {
    display: flex;
    max-width: 80vw;
    justify-content: center;
    justify-items: center;
    background: rgba(30, 30, 30, 0);;
    margin: 0;
    border: 0;
    list-style-type: disc;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    unicode-bidi: isolate;
  }

  .top-left {
    max-width: 10vw;
    width: 2rem;
    height: 2rem;
    /*background-color: var(--bottomColor);*/
    border-radius: 1rem;
    /*border: .1rem #fff solid;*/
  }
  .top-right {
    max-width: 10vw;
    width: 2.6rem;
    height: 2.6rem;
    background-color: rgba(26, 179, 148, 0);
    border-radius: 1.3rem;
    /*border: .1rem #fff solid;*/
  }

  .video-head-menu-item {
    list-style: none;
    color: #fffdef;
    font-family: "Courier New", Courier, monospace;
    /*font-family: "Raleway", sans-serif;*/
    margin-left: .5rem;
    margin-right: .5rem;
    transition: all 0.3s linear;
    font-weight: bold;
    display: table;
  }

  .video-head-menu-item:hover {
    color: #ffffff;
    font-weight: bold;
  }

  .video-head-menu-item > span {
    color: #fff !important;
    cursor: pointer;
    display: table-cell;
    vertical-align: middle;
    font-weight: bold;
  }
</style>
