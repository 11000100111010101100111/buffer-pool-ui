<template>
  <div class="process-bar" :style="style" ref="processMaster"
       @touchstart="startTouch"
       @touchmove="moveTouch"
       @touchend="endTouch">
    <div class="process-current" ref="processSlave1"></div>
    <div class="process-full" ref="processSlave2"></div>
  </div>
</template>

<script>
    export default {
        name: "SimplePercentageBar",
        props: {
          width: {
            type: String,
            default: '100%'
          },
          height: {
            type: String,
            default: '100%'
          },
          currentPercentage: {
            type: Number,
            default: 0
          },
          fullPercentage: {
            type: Number,
            default: 0
          },
          widthType: {
            type: String,
            default: 'vw'
          }
        },
        data() {
          return {
            style: `{width: ${this.width}vw !important, height: ${this.height}}`,
            fullPercentageLocal: this.fullPercentage,
            currentPercentageLocal: this.currentPercentage
          }
        },
        methods: {
          /**
           * 传入参数：百分比数值
           * */
          onChange(current, full) {
            if (current && current > 0) {
              this.currentPercentageLocal = current;
            }
            if (full && full > 0) {
              this.fullPercentageLocal = full;
            }

            if (this.currentPercentageLocal > 100) {
              this.currentPercentageLocal = 100;
            }
            if (this.currentPercentageLocal < 0) {
              this.currentPercentageLocal = 0;
            }

            if (this.fullPercentageLocal > 100) {
              this.fullPercentageLocal = 100;
            }
            if (this.fullPercentageLocal < 0) {
              this.fullPercentageLocal = 0;
            }
            document.body.style.setProperty('--current', Number(this.currentPercentageLocal).toFixed(2) + this.widthType);
            document.body.style.setProperty('--full', Number(this.fullPercentageLocal).toFixed(2) + this.widthType);
          },
          startTouch(event) {
            this.inChange = true;
            this.startX = event.touches[0].clientX;
          },
          moveTouch(event) {
            let deltaX = event.touches[0].clientX - this.startX;
            if (deltaX > window.innerWidth) deltaX = window.innerWidth;
            let percentage = Number(deltaX / window.innerWidth).toFixed(4) * 100;
            this.onChange(percentage, this.fullPercentageLocal);
          },
          endTouch(event) {
            let deltaX = event.touches[0].clientX - this.startX;
            if (deltaX > window.innerWidth) deltaX = window.innerWidth;
            let percentage = Number(deltaX / window.innerWidth).toFixed(4) * 100;
            this.$emit("changeTo", percentage);
            this.inChange = false;
          }
        },
        mounted() {
          this.onChange();
        }
    }
</script>

<style scoped>
  body {
    --current: 0;
    --full: 0;
  }
  * {
    margin: 0;
    padding: 0;
  }
  .process-bar {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(225, 225, 225, 0);
  }
  .process-current {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100%;
    width: var(--current);
    transition: width 0.3s linear;
    background-color: #fff;
  }
  .process-full {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    z-index: 9;
    height: 100%;
    width: var(--full);
    background-color: #cccccc;
    transition: width 0.3s linear;
  }
</style>
