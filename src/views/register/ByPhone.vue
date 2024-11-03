<template>
  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
    <h3 class="title unable-select-element">手机验证码登陆</h3>
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        type="text"
        auto-complete="off"
        @blur="validatePhone"
        style="margin-bottom: 0"
        placeholder="您的常用手机号，用于接收短信验证码"
      >
        <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon"/>
      </el-input>
      <span v-if="phoneError" style="color: var(--mainColor);font-size: .5rem; padding: 0;margin: 0;border: 0">{{ phoneError }}</span>
    </el-form-item>
    <el-form-item prop="code" v-if="captchaEnabled">
      <el-input
        v-model="loginForm.code"
        auto-complete="off"
        placeholder="短信验证码"
        style="width: 63%"
        @keyup.enter.native="handleLogin"
      >
      </el-input>
      <div class="login-code">
        <el-button @click="getCode" type="primary" :loading="sending">{{sendMsg}}</el-button>
      </div>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleLogin"
      >
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
    </el-form-item>
    <el-forn-item>
      <LoginType @login-type="readLoginType" init="phone"/>
    </el-forn-item>
  </el-form>
</template>

<script>
  import Cookies from "js-cookie";
  import LoginType from "./LoginType";
  import {getPhoneCode} from '@/api/login'
  export default {
      name: "ByPhone",
      components: {LoginType},
      data() {
        return {
          codeUrl: "",
          phoneError: null,
          loginForm: {
            username: "",
            code: "",
            uuid: "",
            type: 'phone',
            emailLoginBody: {
              emailCode: ""
            }
          },
          loginRules: {
            username: [
              {required: true, trigger: "blur", message: "请输入您的账号"}, {
                type: 'phone',
                message: '请输入正确的手机号码',
                trigger: ['blur', 'change']
              }
            ],
            code: [{required: true, trigger: "change", message: "请输入验证码"}]
          },
          loading: false,
          // 验证码开关
          captchaEnabled: true,
          // 注册开关
          register: true,
          redirect: undefined,
          sending: false,
          sendMsg: '立即发送'
        };
      },
      watch: {
        $route: {
          handler: function (route) {
            this.redirect = route.query && route.query.redirect;
          },
          immediate: true
        }
      },
      created() {
        this.getCookie();
      },
      methods: {
        getCode() {
          if (!this.validatePhone()) {
            return
          }
          this.sending = true;
          this.sendMsg = '发送中';
          getPhoneCode(this.loginForm.username).then(res => {
            this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
            if (res.code === 200) {
              this.$message.success("验证码发送成功");
              this.registerForm.uuid = res.uuid;

              let counts = 60;
              const timer = setInterval(() => {
                this.sendMsg = counts + '秒';
                counts--;
              }, 1000);
              setTimeout(() => {
                this.sending = false;
                clearInterval(timer);
                this.sendMsg = '立即发送';
              }, 60000);

            } else {
              this.sending = false;
              this.$message.warning("验证码发送失败，请重试");
            }
          }).catch(e => {
            this.sending = false;
            this.sendMsg = '立即发送';
          });
        },
        validatePhone() {
          const phonePattern = /^1[3-9]\d{9}$/; // 适用于中国大陆手机号码
          if (!this.loginForm.username) {
            this.phoneError = '手机号码不能为空';
            return false;
          } else if (!phonePattern.test(this.loginForm.username)) {
            this.phoneError = '手机号码格式不正确';
            return false;
          } else {
            this.phoneError = null;
          }
          return true;
        },
        getCookie() {
          const username = Cookies.get("username");
          this.loginForm = {
            username: username === undefined ? this.loginForm.username : username,
          };
        },
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true;
              Cookies.set("username", this.loginForm.username, {expires: 30});
              this.loginForm.type = 'phone';
              this.$store.dispatch("Login", this.loginForm).then(() => {
                this.$router.push({path: this.redirect || "/home"}).catch(() => {
                });
              }).catch(() => {
                this.loading = false;
                if (this.captchaEnabled) {
                  this.$message.warning("验证码有误，请重试");
                }
              });
            }
          });
        },
        readLoginType(data) {
          this.$emit('login-type', data); // 将数据传递给祖先组件
        }
      }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  * {
    padding: 0;
    margin: 0;
  }

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    opacity: 0.9;
    border-radius: 6px;
    background: #ffffff;
    width: 380px;
    max-width: 85vw;
    padding: 25px 25px 5px 25px;

    .el-input {
      height: 38px;

      input {
        height: 38px;
      }
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }

  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }

  .login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }

  .login-code-img {
    height: 38px;
  }

  .el-form-item--medium .el-form-item__content {
    line-height: 1rem !important;
  }

  .el-form-item--medium .el-form-item__content:before {
    line-height: 1rem !important;
  }

  .el-input__icon, .el-input__prefix {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
  }

</style>
