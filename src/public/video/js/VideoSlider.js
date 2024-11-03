
export class VideoSlider {
  constructor(videos) {
    this.videos = videos;
    this.currentIndex = 0;
    this.currentVideoElement = document.getElementById('current-video');
    this.prevVideoElement = document.getElementById('prev-video');
    this.nextVideoElement = document.getElementById('next-video');
    // this.currentVideoElement.src = this.videos[this.currentIndex].pageSrc;

    this.initEvents();
  }

  initEvents() {
    document.addEventListener('wheel', (e) => this.handleScroll(e));
    document.addEventListener('keydown', (e) => this.handleKey(e));
  }

  handleScroll(event) {
    if (event.deltaY > 0) {
      this.nextVideo();
    } else {
      this.prevVideo();
    }
  }

  handleKey(event) {
    if (event.key === 'ArrowUp') {
      this.prevVideo();
    } else if (event.key === 'ArrowDown') {
      this.nextVideo();
    }
  }

  nextVideo() {
    // this.prevVideoElement.src = this.videos[this.currentIndex].pageSrc;
    this.prevVideoElement.style.display = 'block';
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
    this.changeVideo('next');
  }

  prevVideo() {
    // this.nextVideoElement.src = this.videos[this.currentIndex].pageSrc;
    this.nextVideoElement.style.display = 'block';
    this.currentIndex = (this.currentIndex - 1 + this.videos.length) % this.videos.length;
    this.changeVideo('prev');
  }

  changeVideo(direction) {
    const fadeOutVideo = direction === 'next' ? this.currentVideoElement : this.prevVideoElement;
    const fadeInVideo = direction === 'next' ? this.nextVideoElement : this.currentVideoElement;

    // fadeOutVideo.style.opacity = 0; // Fade out

    setTimeout(() => {
      // Switch videos
      // this.currentVideoElement.src = this.videos[this.currentIndex].pageSrc;
      // this.currentVideoElement.load(); // Load new video
      // fadeInVideo.style.opacity = 1; // Fade in
      fadeInVideo.style.transform = 'translateY(0)'; // 向上移动到视口

      if (direction === 'next') {
        this.nextVideoElement.style.transform = 'translateY(100%)'; // Reset next video position
      } else {
        this.prevVideoElement.style.transform = 'translateY(-100%)'; // Reset previous video position
      }

      // Hide and reset after transition
      setTimeout(() => {
        // fadeOutVideo.style.display = 'none';
        fadeOutVideo.style.transform = direction === 'next' ? 'translateY(-100%)' : 'translateY(100%)';
      }, 500); // Match with CSS transition duration
    }, 500); // Match with CSS transition duration
  }
}
