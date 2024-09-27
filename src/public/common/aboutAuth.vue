<template>
    <div class="about-auth">
      <div class="about-auth-title-con" style="margin-bottom: 1rem">
        <div class="about-auth-title class-title">
          <span class="unable-select-element">{{authInfo.title}}</span>
        </div>
      </div>
      <el-row :gutter="0" offset="0" justify="center">
        <el-col class="about-auth-item-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="col-item col-img">
            <el-image :src="authInfo.url" class="about-auth-img"/>
            <br>
            <span class="personalized-signature unable-select-element">{{personalizedSignature}}</span>
          </div>
        </el-col>
        <el-col class="about-auth-item-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="col-item">
            <div class="auth-info-list" v-for="i in authInfo.info" :key="i.key">
              <div><p class="title-text unable-select-element">{{i.title}}</p></div>
              <div><p class="label-text unable-select-element">{{i.label}}</p></div>
            </div>
          </div>
        </el-col>
        <el-col class="about-auth-item-col"  :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="auth-message">
            <p class="unable-select-element">{{authInfo.message}}</p>
          </div>
        </el-col>
      </el-row>
      <div class="class-more" >
        <a class="more-about-me class-title unable-select-element" :href="authPage">More about me</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "aboutAuth",
        props: {
          authInfo: {
            type: Object,
            required: true
          }
        },
        data() {
          return {
            authPage: '/auth/home',
            tags: [
              {id: 1, svgId: '#icon-github-fill', src:'https://github.com/11000100111010101100111', title: 'About auth\'s personal github website'},
              {id: 1, svgId: '#icon-csdn', src:'https://blog.csdn.net/qq_44140450', title: 'About auth\'s personal csdn website'},
              {id: 1, svgId: '#icon-bilibili', src:'https://space.bilibili.com/352234388', title: 'About auth\'s personal bilibili website'},
            ],
            personalizedSignature: 'Not having personality is also a kind of personality'
          }
        }
    }
</script>

<style scoped>
  .about-auth {
    width: 90vw;
    height: auto;
    margin-left: 5vw;
    background-color: var(--mainColor);;
    background-color: #fff;
  }

  .class-title {
    font-family: "Raleway", sans-serif;
    font-size: 2rem;
  }

  .about-auth-title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: unset;
    -ms-flex-pack: unset;
    justify-content: flex-start;
    justify-items: inherit;
    flex-direction: column;
    padding-top: 2rem;
  }

  .about-auth-title-con {
    /*display: flex;*/
    /*justify-content: left;*/
    /*justify-items: left;*/
  }

  .about-auth-item-col {
    /*max-width: 80vw;*/
    /*min-width: 20vw;*/
  }

  .auth-info-list {
    display: flex;
    justify-items: center;
    justify-content: space-between;
    text-align: center;
    width: 25vw;
    max-width: 16rem;
    min-width: 8rem;
    height: auto;
  }

  .auth-info-list>div{
    width: 50%;
  }

  .title-text{
    width: 50%;
    font-family: "Courier New", Courier, monospace;
    color: #a7a5ad;
    text-align: right;
    margin-right: 0.5rem;
  }

  .label-text {
    width: 50%;
    font-family: "Courier New", Courier, monospace;
    text-align: left;
  }

  .about-auth-img {
    width: 8rem;
    max-height: 16rem;
    mim-width: 8rem;
    aspect-ratio: 1/1;
  }

  .auth-message {
    color: #a7a5ad;
    text-align: center;
    display: unset;
    font-size: 1rem;
    font-family: "Courier New", Courier, monospace;
  }

  .col-item {
    text-align: center;
    display: unset;
    font-size: 1rem;
    font-family: "Courier New", Courier, monospace;
  }

  .col-img {
    width: 100%;
  }


  .button-logos{
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .button-logo-item {
    width:2rem;
    height: 2rem;
    border-radius: 1rem;
    background-color: #fff;
    aspect-ratio: 1/1;
    transition: all 0.5s linear;
    cursor: pointer;
    margin: 0.2rem;
  }

  .button-logo-item:hover {
    transform: scale(1.1);
  }

  .el-col {
    display: flex;
    justify-items: center;
    justify-content: center;
  }

  .personalized-signature {
    text-align: center;
    font-size: 0.5rem;
    font-family: "Courier New", Courier, monospace;
    color: gray;
  }

  .class-more {
    width: 100%;
    display: flex;
    justify-content: right;
    cursor: pointer;
  }
  .more-about-me {
    transition: all 0.3s linear;
    margin-bottom: 0.2rem;
    font-size: 1.5rem;
    color:  #191823;
    padding-right: .1rem;
  }
  .more-about-me:hover {
    color: var(--mainColor);;
    border-right: 0.2rem var(--mainColor) solid;
  }
</style>
