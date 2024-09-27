<template>
  <div class="love-box">
    <ul>
      <li class="love-pic">
          <label for="love-check">
            <input type="checkbox" id="love-check"
                   hidden
                   :disabled="isLove"
                   v-model="isLove"
                   @change="handleChange">
            <el-tooltip class="item" effect="dark" content="click like button support once one day" placement="top">
              <svg t="1727089819946" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   p-id="4106">
                <path
                  @click="clickCheckBox"
                  d="M736.048379 127.978498c-65.881404 0-128.494541 24.942046-176.314463 70.525785-4.644381 4.300353-28.726356 28.726356-47.30388 47.647909l-47.30388-47.131866c-47.819923-45.755753-110.605073-71.041828-177.00252-71.041828-141.223585 0-255.956996 114.905426-255.956996 255.956996 0 82.394759 41.111372 144.319839 76.546279 182.506971l316.849992 320.11826c25.11406 25.11406 52.980346 41.455401 86.695112 41.455401 33.714766 0 61.581052-16.341341 86.695112-41.455401l316.677977-319.946246 2.236183-2.408198c38.187133-47.647909 74.310096-92.715606 74.310096-180.098774C992.005375 242.883924 877.09995 127.978498 736.048379 127.978498z"
                  fill="#515151" p-id="4107" id="heart"></path>
              </svg>
            </el-tooltip>
  <!--          <span id="love-span"></span>-->
          </label>
      </li>
      <li class="love-txt" v-if="!showLoveCount">
        <span>Do you like it here?</span>
      </li>
      <li class="love-count" v-if="showLoveCount">
        <div>
          <span class="unable-select-element">Have been liked</span>
          <span class="unable-select-element count-number">{{loveCount > 0 ? loveCount : '-'}}</span>
          <span class="unable-select-element">times already</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {loveOnce, hasLovedMe, lovedCount} from "@/api/website/website"
  export default {
    name: "LoveMe",
    data() {
      return {
        loveCount: 0,
        showLoveCount: false,
        isLove: false,
        timer: null
      }
    },
    methods:{
      clickCheckBox() {
        if (this.isLove) {
          //this.$message.warning("一天只能喜欢一次哦，不然我会骄傲的！")
        }
      },
      async handleChange() {
        await loveOnce().then(res => {
          this.initLoveCount(false);
          if (res.code !== 200) {
            this.$message.warning(` ${res.message}`)
          }
        }).catch(e => {
          this.isLove = false;
          this.$message.warning(`喜欢失败了，再试一次吧! ${e.message}`)
        })
      },
      initLoveInfo() {
        hasLovedMe().then(res => {
          if (res.code === 200) {
            this.isLove = res.data.hasLoved;
            this.showLoveCount = res.data.hasLoved;
            this.loveCount = res.data.lovedCount ? res.data.lovedCount : '-' ;
          }
        })
      },
      async initLoveCount(init) {
        await lovedCount().then(res => {
          if (res.code === 200) {
            this.loveCount = res.data;
          }
          if (!init) {
            this.showLoveCount = true;
          }
        })
      },
      queryCountAsync() {
        this.timer = setInterval(() => {
          this.initLoveCount(true);
        }, 60000);
      }
    },
    mounted() {
      try {
        this.initLoveInfo();
      } catch (e) {
        console.error(e);
      }
      this.queryCountAsync();
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }
</script>

<style scoped>
  .love-box {
    padding-top: 3rem;
    padding-bottom: 1rem;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  ul > li {
    list-style: none;
  }
  .love-pic {
    margin-bottom: 1.8rem;
  }
  .love-pic, .love-count, .love-txt {
    display: flex;
    justify-content: center;
    justify-items: center;
  }

  .love-txt, .count-number{
    font-family: "Courier New", Courier, monospace;
  }

   .count-number{
     font-family: 'Helvetica', 'Tahoma', sans-serif;
     font-weight: bold;
     color: #fff;
     margin-right: .4rem;
     margin-left: .4rem;
     background-color: var(--mainColor);
     padding: .1rem;
     border-radius: .2rem;
  }
  .love-count>span {
    margin-right: .2rem;
    margin-left: .2rem;
    font-family: "Raleway", sans-serif;
  }

  svg {
    width: 3.5rem;
    height: 3.5rem;
    position: relative;
    z-index: 10;
  }

  #heart {
    fill: #eee;
    stroke: var(--mainColor);
    stroke-width: 1rem;
    stroke-dasharray: 2600;
    stroke-dashoffset: 2600;
    stroke-linecap: round;
    cursor: pointer;
  }

  #love-span {
    display: block;
    width: 1rem;
    height: 1rem;
    background-color: transparent;
    border-radius: 50%;
    /*position: relative;*/
    /*top: 50%;*/
    /*left: 50%;*/
    transform: translate(-50%, -50%) scale(1) !important;
    box-shadow: 0 -5rem 0 var(--mainColor),
                0 5rem 0 var(--mainColor),
                -5rem 0 0 var(--mainColor),
                5rem 0 0 var(--mainColor),
                -4.8rem -4.8rem 0 var(--mainColor),
                4.8rem -4.8rem 0 var(--mainColor),
                4.8rem 4.8rem 0 var(--mainColor),
                -4.8rem 4.8rem 0 var(--mainColor);
  }

  #love-check:checked + svg #heart {
    animation: drawHeart 1s linear forwards;
  }

  #love-check:checked ~ #love-span {
    animation: blink .5s ease-in-out forwards;
    animation-delay: 0.85s;
  }

  #love-check:checked + svg {
    animation: beat 1s linear forwards;
  }

  @keyframes drawHeart {
    0% {
      stroke-dashoffset: 2600;
    }
    80% {
      fill: #eee;
      stroke-dashoffset: 0;
    }
    100% {
      fill: var(--mainColor);
      stroke-dashoffset: 0;
    }
  }

  @keyframes blink {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0.8;
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 0;
    }
  }

  @keyframes beat {
    0% {
      transform: scale(1);
    }
    70% {
      transform: scale(1);
    }
    80% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
