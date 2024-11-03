<template>
  <div class="pic-txt-box" @click="clickElement">
    <div class="pic-txt-item">
      <span v-if="showIcon" :class="['iconfont', icon, 'of-label', 'unable-select-element']"/>
    </div>
    <div>
      <span v-if="showNumber" class="of-text unable-select-element">{{number}}</span>
    </div>
    <div>
      <span v-if="showLabel" class="of-text unable-select-element">{{label}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PictureAndText",
    props: {
      showIcon: {
        type: Boolean,
        default: true
      },
      showLabel: {
        type: Boolean,
        default: ''
      },
      icon: {
        type: String,
        default: 'icon-duanshipin'
      },
      label: {
        type: String,
        default: 0
      },
      showNumber: {
        type: Boolean,
        default: true
      },
      number: {
        type: String,
        default: "-"
      }
    },
    methods: {
      clickElement() {
        this.$emit("click");
      }
    }
  }
</script>

<style scoped>
  .pic-txt-box {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
    transition: all .5s linear;
  }
  .pic-txt-item > .iconfont {
    padding-top: .2rem;
  }
  .pic-txt-item > .iconfont:hover {

  }

  .pic-txt-item {
    display: flex;
    justify-content: center;
    justify-items: center;
    width: 100%;
  }

  .pic-txt-item > .iconfont {
    margin-right: 0;
    margin-bottom: .2rem;
  }

  .of-text {
    /*font-family: "Courier New", Courier, monospace;*/
    font-size: 1.1rem;
    font-weight: bold;
  }

  .of-label {
    font-size: 1.5rem;
  }
</style>
