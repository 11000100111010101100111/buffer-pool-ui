<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo el-menu"
    mode="horizontal"
    @select="handleSelect"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor">
    <el-menu-item index="1" class="el-icon-s-home" @click="homePage">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">猜你喜欢</template>
      <el-submenu index="2-1">
        <template slot="title" class="iconfont icon-kaifagongju">开发工具</template>
        <el-menu-item index="2-1-1" class="iconfont el-icon-map-location" @click="handleBaiDuAPIMap">实时天气地图
        </el-menu-item>
        <el-menu-item index="2-1-2" class="iconfont icon-json" @click="handleTranslate">翻译</el-menu-item>
        <el-menu-item index="2-1-1" disabled class="iconfont icon-api">Open API</el-menu-item>
        <el-menu-item index="2-1-2" disabled class="iconfont icon-webhook">WebHook</el-menu-item>
        <el-menu-item index="2-1-3" disabled class="iconfont icon-json">JSON在线</el-menu-item>
        <el-menu-item index="2-1-4" disabled class="iconfont icon-fuwu">消息通信</el-menu-item>
      </el-submenu>
      <el-submenu index="2-2">
        <template slot="title" class="iconfont icon-kaifagongju">AIGC</template>
        <el-menu-item index="2-2-1" class="iconfont icon-rtcyinshipintongxin" @click="toAIGCImg">图像生成</el-menu-item>
        <el-menu-item index="2-2-1" disabled class="iconfont icon-rtcyinshipintongxin">音视频处理</el-menu-item>
        <el-menu-item index="2-2-2" disabled class="iconfont icon-ailiaotian_AIliaotian">AI聊天</el-menu-item>
      </el-submenu>
      <el-submenu index="2-3">
        <template slot="title" class="iconfont icon-kaifarenyuan">开发者</template>
        <el-menu-item index="2-3-1" @click="toGithub" class="iconfont icon-guanli-1111">社区&共建</el-menu-item>
        <el-menu-item index="2-3-2" disabled class="iconfont icon-fuwu">面向开发者</el-menu-item>
        <el-menu-item index="2-3-3" disabled class="iconfont icon-shuomingwendang">文档中心</el-menu-item>
        <el-menu-item index="2-3-4" disabled class="iconfont icon-dc-icon-guojiazhongdianshiyanshi">实验室</el-menu-item>
        <el-menu-item index="2-3-5" disabled disabled class="iconfont icon-yijianyujianyifankui">意见&建议</el-menu-item>
        <el-menu-item index="2-3-6" disabled disabled class="iconfont icon-QAyanshou">Q&A</el-menu-item>
        <el-menu-item index="2-3-7" disabled><a href="https://www.ele.me" target="_blank"
                                                class="iconfont icon-guanyuwomen">关于我们</a>
        </el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" class="iconfont icon-blog1" @click="blog">博客</el-menu-item>
    <el-menu-item index="4" class="login-button">
      <user-login-info/>
    </el-menu-item>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import TopNav from '@/components/TopNav'
  import Hamburger from '@/components/Hamburger'
  import Screenfull from '@/components/Screenfull'
  import SizeSelect from '@/components/SizeSelect'
  import Search from '@/components/HeaderSearch'
  import KitGit from '@/components/Kit/Git'
  import KitDoc from '@/components/Kit/Doc'
  import UserLoginInfo from "./UserLoginInfo";

  export default {
    name: "Head",
    components: {
      UserLoginInfo,
      Breadcrumb,
      TopNav,
      Hamburger,
      Screenfull,
      SizeSelect,
      Search,
      KitGit,
      KitDoc
    },
    props: {
      backgroundColor: {
        type: String,
        default: 'rgba(0,0,0,0)'
      },
      textColor: {
        type: String,
        default: '#fff'
      },
      activeTextColor: {
        type: String,
        default: '#fff'
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ]),
      setting: {
        get() {
          return this.$store.state.settings.showSettings
        },
        set(val) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'showSettings',
            value: val
          })
        }
      },
      topNav: {
        get() {
          return this.$store.state.settings.topNav
        }
      }
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',

        activeMenu: '1',
      }
    },
    mounted() {

    },
    methods: {
      blog() {
        window.open('/blog', '_blank');
      },
      toAIGCImg() {
        window.open('/ai-gc/image', '_blank');
      },
      handleTranslate() {
        window.location.href = '/translate';
      },
      homePage() {
        window.location.href = '/home';
      },
      toGithub() {
        window.open('https://github.com/11000100111010101100111/SmallQuestionNotes', '_blank');
      },
      handleBaiDuAPIMap() {
        window.location.href = '/weather-baidu';
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped lang="scss">
  body {
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
  }

  .el-menu {
    display: flex;
    justify-content: space-between; /* 让菜单项两端对齐 */
  }

  .login-button {
    margin-left: auto; /* 将按钮推到右边 */
    width: 50px; /* 设置为正方形，宽度 */
    height: 50px; /* 设置为正方形，高度 */
    margin-top: 3px;
    margin-right: 3px;
    padding: 0; /* 移除默认的内边距 */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 0;
  }

  .login-button:focus {
    border: 0;
  }

  .login-button:checked {
    border: 0;
  }

  .login-button:active {
    border: 0;
  }

</style>
