<template>
  <ul class="operation-ul">
    <li class="operation-li operation-of-avatar">
      <div class="operation-of-avatar-box">
        <el-image
          @click="accessUser()"
          :src="videoInfo.authInfo.url"
          class="about-auth-img"/>
        <svg t="1730006333640"
             @click="focusUser()"
             class="icon focus-user"
             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="15778" id="mx_n_1730006333641" width="64" height="64">
          <path
            d="M790.976 190.72a32 32 0 0 1 45.258667-0.021333A457.248 457.248 0 0 1 970.666667 515.114667a457.248 457.248 0 0 1-134.293334 324.277333 32 32 0 1 1-45.258666-45.248A393.258667 393.258667 0 0 0 906.666667 515.114667a393.258667 393.258667 0 0 0-115.68-279.146667 32 32 0 0 1 0-45.258667z m-603.36 0.128a32 32 0 0 1 45.269333 45.248A393.258667 393.258667 0 0 0 117.333333 515.114667a393.258667 393.258667 0 0 0 115.466667 278.944 32 32 0 0 1-45.28 45.237333A457.248 457.248 0 0 1 53.333333 515.114667a457.248 457.248 0 0 1 134.293334-324.266667zM330.794667 285.866667a32 32 0 0 1 0.032 45.248A255.04 255.04 0 0 0 256 512a255.050667 255.050667 0 0 0 75.146667 181.184 32 32 0 1 1-45.216 45.301333A319.04 319.04 0 0 1 192 512a319.04 319.04 0 0 1 93.546667-226.090667 32 32 0 0 1 45.248-0.032z m407.36-0.266667A319.04 319.04 0 0 1 832 512a319.04 319.04 0 0 1-93.653333 226.208 32 32 0 0 1-45.28-45.237333A255.050667 255.050667 0 0 0 768 512a255.050667 255.050667 0 0 0-75.072-181.12 32 32 0 1 1 45.226667-45.269333zM566.752 384C637.408 384 682.666667 441.173333 682.666667 514.922667c0 58.005333-47.946667 116.789333-140.096 181.237333a53.333333 53.333333 0 0 1-61.141334 0C389.28 631.712 341.333333 572.928 341.333333 514.922667 341.333333 441.173333 386.592 384 457.258667 384c21.632 0 37.514667 5.994667 54.741333 18.421333C529.226667 389.994667 545.109333 384 566.741333 384z m0 64c-8.32 0-14.56 3.328-27.52 14.538667l-6.336 5.504a32 32 0 0 1-41.770667 0l-6.336-5.504c-12.96-11.2-19.2-14.538667-27.52-14.538667C425.653333 448 405.333333 473.674667 405.333333 514.922667c0 29.941333 34.410667 72.938667 106.666667 124.48 72.256-51.541333 106.666667-94.538667 106.666667-124.48C618.666667 473.674667 598.346667 448 566.741333 448z"
            fill="#ff0033" p-id="15779"></path>
        </svg>
      </div>
    </li>
    <li class="operation-li">
      <picture-and-text icon="icon-xihuan" label="喜欢"
                        @click="toLike()"
                        :show-icon="true"
                        :show-label="false"
                        :number="generatorNumber(videoInfo.data.likeCount)"/>
    </li>
    <li class="operation-li">
      <picture-and-text icon="icon-shoucang" label="收藏"
                        @click="toCollect()"
                        :show-icon="true"
                        :show-label="false"
                        :number="generatorNumber(videoInfo.data.collectCount)"/>
    </li>
    <li class="operation-li">
      <picture-and-text icon="icon-pinglun" label="评论"
                        @click="toComment()"
                        :show-icon="true"
                        :show-label="false"
                        :number="generatorNumber(videoInfo.data.commentCount)"/>
    </li>
    <li class="operation-li">
      <picture-and-text icon="icon-zhuanfa" label="转发"
                        @click="toForward()"
                        :show-icon="true"
                        :show-label="false"
                        :number="generatorNumber(videoInfo.data.forwardCount)"/>
    </li>
    <li class="operation-li">
      <picture-and-text icon="icon-gengduo" label="更多"
                        @click="toMore()"
                        :show-icon="true"
                        :show-label="false"
                        :show-number="false"/>
    </li>
  </ul>
</template>

<script>
  import PictureAndText from "../common/PictureAndText";

  export default {
    name: "VideoOperation",
    components: {PictureAndText},
    props: {
      videoInfo: {
        type: Object,
        default: {
          authInfo: {
            url: 'http://8.134.183.234/icon/about-auth.jpg'
          },
          data: {
            likeCount: 0,
            collectCount: 0,
            forwardCount: 0,
            commentCount: 0
          }
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      generatorNumber(num) {
        if (!num || isNaN(num) || num < 0) {
          return '0';
        }
        if (num < 1000) {
          return "" + num
        }
        if (num < 10000) {
          return Number(num / 1000.00).toFixed(1) + "k";
        }
        return Number(num / 10000.00).toFixed(1) + 'w';
      },
      accessUser() {
        this.$message.info("现在还不支持查看用户主页")
      },
      focusUser() {
        this.$message.info("现在未开放用户关注")
      },
      toLike() {
        this.$message.info("现在点赞未开放")
      },
      toCollect() {
        this.$message.info("现在收藏未开放")
      },
      toComment() {
        this.$message.info("现在评论区未开放")
      },
      toForward() {
        this.$message.info("现在还不支持转发")
      },
      toMore() {
        this.$message.info("现在还没有更多")
      },
      doUpdate(aboutInfo) {
        this.videoInfo = aboutInfo;
      }
    }
  }
</script>

<style scoped>
  .operation-ul {
    margin: 0;
    padding-left: 1rem;
    padding-right: .5rem;
  }

  .operation-li {
    list-style: none;
    text-align: center;
    color: #fffdef;
    margin-top: .2rem;
    margin-bottom: 1rem;
  }

  .operation-of-avatar {
    width: 3rem;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 1.5rem;
    border: .2rem solid #fff;
  }

  .operation-of-avatar-box > .el-image {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 1.3rem;
    padding: 0;
    margin: 0;
    border: 0;
  }

  .focus-user {
    /*position: relative;*/
    width: 1.5rem;
    height: 1.5rem;
    background-color: #fff;
    /*border: .05rem solid #fff;*/
    transform: translateY(-75%) translateX(-3%);
    border-radius: 50%;
  }
</style>
