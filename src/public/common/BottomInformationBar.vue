<template>
    <div class="button-bar">
        <div class="button-text website-sing">
          <span class="unable-select-element">{{message[0]}}</span>
          <el-divider direction="vertical"/>
          <span class="unable-select-element">{{message[1]}}</span>
        </div>
        <div class="button-text website-sing">
          <span class="unable-select-element">{{jsonData ? jsonData.about.en : ''}}</span>
        </div>
        <span class="button-text flow-me-title unable-select-element">Flow me</span>
        <ul class="button-logos">
          <li class="button-logo-item" v-for="tag in tags" :key="tag.key">
            <svg class="icon" aria-hidden="true" @click="localTo(tag.src)">
              <use :xlink:href="tag.svgId"></use>
            </svg>
          </li>
        </ul>
        <div class="button-text website-mark">
            <div class="unable-select-element" v-for="msg in mark" :key="msg.key">
              <el-divider direction="vertical" v-if="msg.type && 'split' === msg.type"/>
              <span :class="['unable-select-element', 'name' === msg.type? 'name-style' : '']">{{msg.label}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "BottomInformationBar",
        data() {
          return {
              message: ['天生我才必有用', '千金散尽还复来'],
              tags: [
                {id: 1, svgId: '#icon-github-fill', src:'https://github.com/11000100111010101100111', title: 'About auth\'s personal github website'},
                {id: 2, svgId: '#icon-csdn', src:'https://blog.csdn.net/qq_44140450', title: 'About auth\'s personal csdn website'},
                {id: 3, svgId: '#icon-bilibili', src:'https://space.bilibili.com/352234388', title: 'About auth\'s personal bilibili website'},
              ],
              mark: [{
                key:1,label:'本站由',type: 'normal'
              },{
                key:2,label:'Gavin\'Xiao',type: 'name'
              },{
                key:3,label:'提供技术支持',type: 'normal'
              },{
                key:4,label:'持续升级中',type: 'split'
              }],
            jsonData: null
          }
        },
        methods: {
          localTo(src) {
            window.open(src, '_blank');
          },
          async loadInitJson() {
            try {
              const response = await axios.get('/website-description.json'); // 替换为你的 URL
              this.jsonData = response.data;
            } catch (error) {
              console.error('Failed to load JSON:', error);
            }
          }
        },
        mounted() {
          this.loadInitJson();
        }
    }
</script>

<style scoped>

  .button-bar {
    width: 100%;
    height: 100%;
    color: #fff;
    background-color:var(--bottomColor);;
  }

  .button-text {
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  .website-sing{
    margin-top: 1rem;
    font-family: "Raleway", sans-serif;
  }

  .flow-me-title {
    margin-top: 1rem;
    font-family: "Courier New", Courier, monospace;
  }

  .website-mark {
    display: flex;
    justify-content: center;
    justify-items: baseline;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.6rem;
    font-family: "Courier New", Courier, monospace;
  }

  .button-logos{
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 0.5rem;
  }

  .button-logo-item {
    width:2rem;
    height: 2rem;
    border-radius: 1rem;
    color: #fff;
    background-color: rgba(0,0,0,0);
    aspect-ratio: 1/1;
    transition: all 0.3s linear;
    cursor: pointer;
    margin: 0.2rem;
  }

  .button-logo-item:hover {
    transform: scale(1.1);
  }

  .name-style {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    text-underline: #fff;
  }
</style>
