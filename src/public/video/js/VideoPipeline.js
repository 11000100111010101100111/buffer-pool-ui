export class VideoPipeline {
  constructor(videoInfo,
              soundOpen,
              canvas,
              videoPlay,
              videoElement,
              maxWidth,
              maxHeight,
              processAccept) {
    this.videoInfo = {
      needShowVideoMenu: true,
      srcMatch: 'http://8.134.183.234:8000/public/video',
      currentVideoIndex: 0,
      transitionDuration: 3000,  // 过渡时长
      fadeOpacity: 1,  // 视频透明度
      video: videoElement, // 用于存储视频元素
      videoSrc: videoInfo.videoSrc,
      poster: videoInfo.pageSrc,
      over: false
    };
    this.videoPlay = videoPlay;
    this.canvas = canvas;
    this.soundOpen = videoInfo.videoSoundSwitch;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.processAccept = processAccept;
    this.download = 0;
    this.playOver = 0;
    this.initVideo();
  }

  updateProgress() {
    const buffered = this.videoInfo.video.buffered;
    if (buffered.length > 0) {
      const totalDuration = this.videoInfo.video.duration;
      const bufferedEnd = buffered.end(buffered.length - 1);
      this.download = (bufferedEnd / totalDuration) * 100;
      this.processAccept(this.playOver, this.download);
    }
  }

  timeupdateProgress() {
    if (this.videoInfo.video.duration > 0) {
      this.playOver = (this.videoInfo.video.currentTime / this.videoInfo.video.duration) * 100;
      this.processAccept(this.playOver, this.download);
    }
  }

  changeTo(percentage) {
    if (!this.videoInfo.video) {
      return
    }
    if (!this.videoInfo.video.duration) {
      return;
    }
    this.videoInfo.video.currentTime = (percentage / 100) * this.videoInfo.video.duration;
  }

  initVideo() {
    this.videoInfo.video.autoplay = true;
    this.videoInfo.video.src = this.videoInfo.videoSrc[this.videoInfo.currentVideoIndex].src;
    this.videoInfo.video.loop = true;
    this.videoInfo.video.poster = this.videoInfo.poster;
    this.videoInfo.video.muted = !this.soundOpen;

    //this.videoInfo.video.crossOrigin = 'anonymous';

    this.videoInfo.video.addEventListener('loadedmetadata', this.loadMetadata.bind(this));
    this.videoInfo.video.addEventListener('ended', this.fadeOutAndNextVideo.bind(this));
    this.videoInfo.video.addEventListener('error', this.playError.bind(this));
    this.videoInfo.video.addEventListener('play', this.playFunc.bind(this));
    this.videoInfo.video.addEventListener('progress', this.updateProgress.bind(this));
    this.videoInfo.video.addEventListener('timeupdate', this.timeupdateProgress.bind(this));
  }

  playFunc() {
    const context = this.canvas.getContext('2d');
    this.drawFrame(context);
  }

  loadMetadata() {
    let width = this.videoInfo.video.videoWidth;
    let height = this.videoInfo.video.videoHeight;
    // let calc =  width / height;
    // //@todo 根据不同比例调整视频尺寸，1：1 、3：4、16：9等
    // if (calc > 1) {
    //   //宽屏视频
    //   if (width > this.maxWidth) {
    //     height = this.maxHeight * (this.maxWidth / width);
    //     width = this.maxWidth;
    //   }
    //   if (height > this.maxHeight) {
    //     width = this.maxWidth * (this.maxHeight / height);
    //     height = this.maxHeight;
    //   }
    // } else {
    //   //竖屏视频
    //   height = this.maxHeight;
    //   width = this.maxWidth;
    // }

    this.canvas.width = width;
    this.canvas.height = height;
  }

  resize() {
    this.loadMetadata();
  }

  playError() {
    this.videoInfo.currentVideoIndex = -1;
    this.fadeOutAndNextVideo();
  }

  fadeOutAndNextVideo() {
    this.play(true);
  }

  play(isNext) {
    this.videoInfo.fadeOpacity = 1;
    const fadeOutInterval = setInterval(() => {
      this.videoInfo.fadeOpacity -= 0.05;
      if (this.videoInfo.fadeOpacity <= 0) {
        clearInterval(fadeOutInterval);
        if (isNext) {
          this.playNextVideo();
        }
      }
    }, this.videoInfo.transitionDuration / 50);
  }

  playVideoAfterHandleCurrentVideoIndex() {
    this.videoInfo.video.src = this.videoInfo.videoSrc[this.videoInfo.currentVideoIndex].src;

    this.videoInfo.fadeOpacity = 0;
    const fadeInInterval = setInterval(() => {
      this.videoInfo.fadeOpacity += 0.05;  // 每次增加透明度
      if (this.videoInfo.fadeOpacity >= 1) {
        clearInterval(fadeInInterval);  // 完成淡入
      }
    }, this.videoInfo.transitionDuration / 50);

    this.videoInfo.video.play();
    this.videoPlay = true;
  }

  playNextVideo() {
    this.videoPlay = true;
    this.videoInfo.currentVideoIndex+=1;
    if (this.videoInfo.currentVideoIndex >= this.videoInfo.videoSrc.length) {
      this.videoInfo.currentVideoIndex = 0;
    }
    this.playVideoAfterHandleCurrentVideoIndex();
  }

  playLastVideo() {
    if (this.videoInfo.currentVideoIndex <= 0) {
      console.warn("已经是最开始的视频了，不能再退了喔");
      return;
    }
    this.videoPlay = true;
    this.videoInfo.currentVideoIndex--;
    this.playVideoAfterHandleCurrentVideoIndex();
  }

  drawFrame(context) {
    if (!this.videoInfo.over && !this.videoInfo.video.paused && !this.videoInfo.video.ended) {
      context.drawImage(this.videoInfo.video, 0, 0, context.canvas.width, context.canvas.height);
      context.globalAlpha = this.videoInfo.fadeOpacity;  // 应用透明度
      context.drawImage(this.videoInfo.video, 0, 0, context.canvas.width, context.canvas.height);
      requestAnimationFrame(() => this.drawFrame(context));
    }
  }

  clickToPlayVideo() {
    this.playVideo();
  }

  clickToPauseVideo() {
    this.videoInfo.video.pause();
    this.videoPlay = false;
  }

  playVideo() {
    this.videoInfo.video.play();
    this.videoPlay = true;
    this.videoInfo.needShowVideoMenu = !this.videoPlay;
  }

  hoverVideoMenu() {
    this.videoInfo.needShowVideoMenu = true;
  }

  leaveVideoMenu() {
    this.videoInfo.needShowVideoMenu = false;
  }

  begin() {
    this.videoInfo.video.play();
    this.clickToPlayVideo();
    return this;
  }

  destroy() {
    this.videoInfo.video.autoplay = false;
    this.videoInfo.video.loop = false;
    this.videoInfo.video.muted = false;
    this.videoInfo.over = true;
    this.videoInfo.video.pause();
    this.videoInfo.video.src = '';
    this.videoInfo.video.removeAttribute('src');
    this.videoInfo.video.removeEventListener('play', this.playFunc.bind(this));
    this.videoInfo.video.removeEventListener('error', this.playError.bind(this));
    this.videoInfo.video.removeEventListener('ended', this.playNextVideo.bind(this));
    this.videoInfo.video.removeEventListener('loadedmetadata', this.loadMetadata.bind(this));
    this.videoInfo.video.removeEventListener('progress', this.updateProgress.bind(this));
    this.videoInfo.video.removeEventListener('timeupdate', this.timeupdateProgress.bind(this));
    this.videoInfo.video.load();
  }

  checkVideoIsPlay() {
    return this.videoInfo && this.videoInfo.video && !this.videoInfo.video.paused;
  }

  checkVideoIsPause() {
    return this.videoInfo && this.videoInfo.video && this.videoInfo.video.paused;
  }

  checkVideoIsShowMenu() {
    return this.videoInfo && this.videoInfo.needShowVideoMenu;
  }

  switchSound(switchValue) {
    this.videoInfo.video.muted = !switchValue;
  }
}

