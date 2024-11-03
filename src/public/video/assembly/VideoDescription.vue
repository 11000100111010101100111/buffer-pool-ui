<template>
  <div :class="['base-box-video-info', showFull ? 'full-of' : '']">
    <div class="description-box unable-select-element">
      <div class="video-title">
        <a class="user-of-video" :href="videoInfo.userLink">@{{videoInfo.authName}}</a>
        <span class="title-of-video" v-if="videoInfo.title && videoInfo.title.length > 0" style="font-weight: bolder; line-height: 1.6rem">·</span>
        <span class="title-of-video" v-if="videoInfo.title">{{videoInfo.title}}</span>
      </div>
      <div class="video-description">
        <span>&nbsp;{{showText}}</span>
        <span v-if="!showFull && 'normal' !== needShowFullType" class="show-hidden-more">...</span>
        <svg v-if="needShowFullType === 'to-open'"
             @click="clickToShowAll()"
             t="1730001125283"
             class="icon need-show-full"
             viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="4514" width="64" height="64">
          <path
            d="M985.6 59.830857m0 36.571429l0 292.571428q0 36.571429-36.571429 36.571429l0 0q-36.571429 0-36.571428-36.571429l0-292.571428q0-36.571429 36.571428-36.571429l0 0q36.571429 0 36.571429 36.571429Z"
            fill="#8a8a8a" p-id="4515"></path>
          <path
            d="M976.676571 124.123429m-36.571428 0l-292.571429 0q-36.571429 0-36.571428-36.571429l0 0q0-36.571429 36.571428-36.571429l292.571429 0q36.571429 0 36.571428 36.571429l0 0q0 36.571429-36.571428 36.571429Z"
            fill="#8a8a8a" p-id="4516"></path>
          <path
            d="M574.400093 397.806954m25.859905-25.859905l258.599051-258.599051q25.859905-25.859905 51.71981 0l0 0q25.859905 25.859905 0 51.71981l-258.599051 258.599051q-25.859905 25.859905-51.71981 0l0 0q-25.859905-25.859905 0-51.71981Z"
            fill="#8a8a8a" p-id="4517"></path>
          <path
            d="M84.918857 942.738286m0-36.571429l0-292.571428q0-36.571429 36.571429-36.571429l0 0q36.571429 0 36.571428 36.571429l0 292.571428q0 36.571429-36.571428 36.571429l0 0q-36.571429 0-36.571429-36.571429Z"
            fill="#8a8a8a" p-id="4518"></path>
          <path
            d="M93.842286 878.445714m36.571428 0l292.571429 0q36.571429 0 36.571428 36.571429l0 0q0 36.571429-36.571428 36.571428l-292.571429 0q-36.571429 0-36.571428-36.571428l0 0q0-36.571429 36.571428-36.571429Z"
            fill="#8a8a8a" p-id="4519"></path>
          <path
            d="M108.992093 863.288097m25.859905-25.859905l258.599051-258.599051q25.859905-25.859905 51.71981 0l0 0q25.859905 25.859905 0 51.71981l-258.599051 258.599051q-25.859905 25.859905-51.71981 0l0 0q-25.859905-25.859905 0-51.71981Z"
            fill="#8a8a8a" p-id="4520"></path>
        </svg>
        <svg v-if="needShowFullType === 'to-close'"
             @click="clickToNotShowAll()"
             t="1730002995027" class="icon need-show-full" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="7323" width="64" height="64">
          <path
            d="M597.333333 395.861333V192a21.333333 21.333333 0 0 0-42.666666 0v256a21.333333 21.333333 0 0 0 21.333333 21.333333h256a21.333333 21.333333 0 0 0 0-42.666666h-205.12L890.24 163.306667a21.333333 21.333333 0 0 0-30.165333-30.165334L597.333333 395.861333z m-170.666666 232.277334V832a21.333333 21.333333 0 0 0 42.666666 0V576a21.333333 21.333333 0 0 0-21.333333-21.333333H192a21.333333 21.333333 0 0 0 0 42.666666h205.12L133.76 860.693333a21.333333 21.333333 0 0 0 30.165333 30.165334L426.666667 628.138667z"
            fill="#8a8a8a" p-id="7324"></path>
        </svg>
        <a class="video-tag" :href="tag.link" v-for="tag in videoInfo.tags" :key="tag.key">#{{tag.label}}</a>
      </div>
      <div class="about-video-auth">

      </div>
      <div class="other-info-video">
        <span class="split-of-video el-icon-location"></span>
        <span class="location-of-video">{{videoInfo.ipLocal}}</span>
        <span class="split-of-video" v-if="times && ('' !== times || times.length > 0)">·</span>
        <span class="time-of-video">{{times}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {parseTime} from './../../../utils/kit'

  export default {
    name: "VideoDescription",
    props: {
      videoInfo: {
        type: Object,
        required: false,
        default: {
          duration: 3,
          ipLocal: '广东深圳',
          createTime: '2024-9-28 13:03:00.000',
          publishTime: '2024-9-28 13:03:00.000', //@todo
          authName: '二叉树',
          userLink: '',
          title: null,
          description: '这是视频的描述！',
          tags: [
            {label: '自然风光', key: 0, link: '#'},
            {label: 'IKUN', key: 1, link: '#'},
            {label: '给我一个忘记你的理由', key: 2, link: '#'}
          ]
        }
      }
    },
    data() {
      return {
        needShowFullType: 'normal', // to-open, to-close, normal
        showFull: false,
        showText: '',
        times: ''
      }
    },
    methods: {
      generatorTimes() {
        try {
          const timeDifference = this.timeDifference();
          if (timeDifference.secondsDifference < 3) {
            return '刚刚';
          }
          if (timeDifference.secondsDifference < 60) {
            return `${timeDifference.secondsDifference}秒前`
          }
          if (timeDifference.minutesDifference < 60) {
            return `${timeDifference.minutesDifference}分钟前`
          }
          if (timeDifference.hoursDifference < 24) {
            return `${timeDifference.hoursDifference}小时前`
          }
          return parseTime(new Date(this.videoInfo.publishTime).getTime(), '{y}.{m}.{d}');
        } catch (e) {
          log.warn(e);
          return ''
        }
      },
      timeDifference() {
        const dateString = this.videoInfo.publishTime;
        const targetDate = new Date(dateString);
        const currentDate = new Date();
        const timeDifference = currentDate - targetDate;
        return {
          secondsDifference: Math.floor(timeDifference / 1000),
          minutesDifference: Math.floor(timeDifference / 60000),
          hoursDifference: Math.floor(timeDifference / 3600000),
          daysDifference: Math.floor(timeDifference / (24 * 3600000))
        };
      },
      clickToShowAll() {
        this.showFull = true;
        this.getDescriptionTxt();
      },
      clickToNotShowAll() {
        this.showFull = false;
        this.getDescriptionTxt();
      },
      getDescriptionTxt() {
        if (!this.videoInfo || !this.videoInfo.description) {
          this.needShowFullType = 'normal';
          this.showText = '';
          return;
        }
        if (this.showFull) {
          this.needShowFullType = this.needShowFullType !== 'normal' ? (this.needShowFullType === 'to-open' ? 'to-close' : 'to-open') : 'normal';
          this.showText = this.videoInfo.description;
          return;
        }
        if (this.videoInfo.description.length > 10) {
          this.needShowFullType = 'to-open';
          this.showText = this.videoInfo.description.substring(0, 10);
          return;
        }
        this.needShowFullType = 'normal';
        this.showText = this.videoInfo.description;
      },
      update(videoInfo) {
        this.videoInfo = videoInfo;
        this.getDescriptionTxt();
        this.times = this.generatorTimes();
      }
    },
    mounted() {
      this.getDescriptionTxt();
      this.times = this.generatorTimes();
    }
  }
</script>

<style scoped>
  .base-box-video-info {
    width: 100vw;
    background: rgba(25, 24, 35, 0.05);
    transition: all .5s linear;
  }

  .description-box {
    width: auto;
    max-width: 100vw;
    height: auto;
    max-height: 20vh;
    background: rgba(30, 30, 30, 0);
    padding: 0.5rem 0.5rem .1rem .5rem;
    transition: all .5s linear;
    color: #fff;
  }

  .full-of {
    background: rgba(25, 24, 35, 0.5);
    max-height: 50vh;
  }

  .video-title {
    display: flex;
    justify-content: left;
    margin-bottom: .5rem;
  }

  .video-tag {
    color: #999;
    margin-left: .3rem;
  }

  .video-tag:hover {
    color: #1ab394;
    text-decoration: underline;
  }

  .video-description {
    /*width: inherit;*/
    /*white-space: normal;*/
    /*word-break: break-all;*/
    /*word-wrap: break-word;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/

    /*display: -webkit-box;*/
    /*-webkit-box-orient: vertical;*/
    /*-webkit-line-clamp: 2;*/
    letter-spacing: .12rem;
    line-height: 1.4;
    text-indent: 1rem;
    font-size: .95rem;
  }

  .split-char {
    font-weight: bold;
    margin-left: .5rem;
    margin-right: .5rem;
    text-align: center;
  }

  .show-hidden-more {
    text-align-last: center;
    text-align: center;
    margin-left: .2rem;
    font-weight: bold;
  }

  .title-of-video {
    font-size: 1.15rem;
    text-align: end;
    margin-left: .5rem;
  }

  .other-info-video {
    display: flex;
    justify-items: center;
    justify-content: left;
  }


  .split-of-video {
    line-height: 1.6rem;
    text-align-last: center;
    font-size: .9rem;
    text-align: center;
    color: #888;
    margin-right: .1rem;
    font-weight: bolder;
  }

  .location-of-video {
    line-height: 1.6rem;
    text-align-last: center;
    font-size: .8rem;
    text-align: center;
    color: #888;
    margin-right: .2rem;
  }

  .time-of-video {
    line-height: 1.6rem;
    text-align-last: center;
    font-size: .8rem;
    text-align: center;
    color: #888;
    margin-right: .2rem;
  }

  .user-of-video {
    font-weight: bold;
    font-size: 1.15rem;
    text-align: end;
  }

  .need-show-full {
    width: 1.3rem;
    height: 1.3rem;
    margin-left: .5rem;
    background-color: rgba(90, 94, 102, 0.5);
    color: #fff;
    border-radius: .2rem 0.1rem .2rem .1rem;
    padding: .1rem;
    transition: all .2s linear;
  }

  .need-show-full:hover {
    padding: .05rem;
  }
</style>
