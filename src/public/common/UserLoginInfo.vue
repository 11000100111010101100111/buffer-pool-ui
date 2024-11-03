<template>
  <div class="box-of-user-info">
    <div v-if="isLoggedIn" class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-image :src="userAvatar" class="user-avatar">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else @click="handleLogin" class="login-text login-text-hover">登</div>
  </div>
</template>

<script>
  import {getToken} from '@/utils/auth';
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import TopNav from '@/components/TopNav'
  import Hamburger from '@/components/Hamburger'
  import Screenfull from '@/components/Screenfull'
  import SizeSelect from '@/components/SizeSelect'
  import Search from '@/components/HeaderSearch'
  import KitGit from '@/components/Kit/Git'
  import KitDoc from '@/components/Kit/Doc'
  import {getUserProfile} from '@/api/system/user';
  import store from '../../store'
  export default {
    name: "UserLoginInfo",
    components: {
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
        isLoggedIn: false, // 用户登录状态
        userAvatar: '', // 用户头像地址
        userName: '', // 用户名

        headers: {Authorization: null},

        loginTo: '/login'
      }
    },
    mounted() {
      this.checkLoginStatus();
    },
    methods: {
      async logout() {
        this.$confirm('确定注销并退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.href = '/index';
          })
        }).catch(() => {
        });
      },

      homePage() {
        window.location.href = '/home';
      },
      handleLogin() {
        window.location.href = this.loginTo; // 假设登录页面为 /login
      },
      checkLoginStatus() {
        // 检查用户是否登录，可以通过检查 token 或调用后端 API
        const token = store.getters.token;// 示例中从 localStorage 获取 token
        if (token) {
          // 假设存在 token，则用户已登录，获取用户信息
          this.headers.Authorization = "Bearer " + token;
          this.isLoggedIn = true;
          this.getUserInfo();
        } else {
          this.isLoggedIn = false;
        }
      },
      getUserInfo() {
        // 调用后端 API 获取用户信息
        // 示例中使用了 async/await 和 fetch API，你可以根据你的项目配置使用 axios 或其他请求库
        if (this.headers.Authorization) {
          getUserProfile().then(response => {
            if (200 === response.code) {
              this.loginTo = '/user';
              this.userAvatar = response.data.avatar;
              this.userAvatar = (!this.userAvatar || this.userAvatar === null || this.userAvatar === "") ?
                require("@/assets/images/profile.jpg")
                : process.env.VUE_APP_BASE_API + this.userAvatar;
              this.userName = response.data.nickName;
            }
          });
        }
      },
    }
  }
</script>

<style scoped lang="scss">

  .box-of-user-info {
    width: 100%;
    height: 100%;
    padding: 0; /* 移除默认的内边距 */
    border-radius: 50%;
    border: 0;
    margin: 0;
  }

  .login-button:focus {
    border: 0;
  }

  .avatar-wrapper,
  .login-text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar-wrapper {
    border-radius: 10px;
    /*border-radius: 50%; !* 确保头像是圆形 *!*/
    overflow: hidden;
    background: #303133;
    transition: transform 0.5s ease;
  }

  .avatar {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .login-text {
    border-radius: 10px;
    /*border-radius: 50%; !* 使登录按钮的文字容器也是圆形 *!*/
    background-color: #FFD700;
    color: rgb(84, 92, 100);
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    font-size: 20px;
    line-height: 1; /* 确保文字居中 */
    transition: transform 0.5s ease;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      /*padding: 0 8px;*/
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 0;
          display: flex;
          justify-content: center;
          justify-items: center;
          background-color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
