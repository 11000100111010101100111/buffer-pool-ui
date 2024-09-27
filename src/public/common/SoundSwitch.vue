<template>
  <div class="menu-item sound-switch"
       @click="switchRound"
       @mouseenter="onSoundMouseEnter"
       @mouseleave="onSoundMouseLeave">
    <canvas ref="soundCanvas" class="sound-open"/>
  </div>
</template>

<script>
    export default {
        name: "SoundSwitch",
        props: {
          soundOpen: {
            type: Boolean,
            default: true
          }
        },
        data() {
          return {
            soundSince: {
              maxAmplitude: 16,
              amplitude: 16,
              frequency: 0.16,
              phase: 2,
              lineColor: 'rgb(190,62,80)'
            },
          }
        },
        methods: {
          initSound() {
            this.canvas = this.$refs.soundCanvas;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.imageSmoothingEnabled = true;
            this.canvas.width = this.$refs.soundCanvas.parentElement.clientWidth;
            this.canvas.height = this.$refs.soundCanvas.parentElement.clientHeight;
            this.ctx.lineWidth = 0.3 * this.rootFontSize;
            this.animateSineWave();
          },
          switchRound() {
            this.soundOpen = !this.soundOpen;
            //通知父组件，开关变更了
            this.$emit("checked", this.soundOpen)
          },
          drawSineWave() {
            const width = this.canvas.width;
            const height = this.canvas.height;
            const centerY = height / 2;
            this.ctx.clearRect(-10, -10, width + 10, height + 10);
            this.ctx.beginPath();
            this.ctx.moveTo(0, centerY);
            for (let x = 0; x < width; x++) {
              const y = centerY + this.soundSince.amplitude * Math.sin((x * this.soundSince.frequency) + this.soundSince.phase);
              this.ctx.lineTo(x, y);
            }
            this.ctx.strokeStyle = this.soundSince.lineColor;
            this.ctx.stroke();
          },
          animateSineWave() {
            this.drawSineWave();
            this.soundSince.phase += 0.08;
            if (!this.soundOpen) {
              if (this.soundSince.amplitude > 0) {
                this.soundSince.amplitude -= 0.5;
              } else {
                this.soundSince.amplitude = 0;
              }
            } else {
              if (this.soundSince.amplitude < this.soundSince.maxAmplitude) {
                this.soundSince.amplitude += 0.5;
              } else {
                this.soundSince.amplitude = this.soundSince.maxAmplitude;
              }
            }
            requestAnimationFrame(this.animateSineWave);
          },
          onSoundMouseEnter() {
            this.soundSince.lineColor = '#fff';
          },
          onSoundMouseLeave() {
            this.soundSince.lineColor = 'rgb(190,62,80)';
          },
        },
        mounted() {
          this.rootFontSize = parseFloat(getComputedStyle(this.$root.$el).fontSize);
          this.initSound();
        }
    }
</script>

<style scoped>
  .sound-switch {
    position: absolute;
    transform: translate(calc(50vw - 50%), calc(50vh - 50%));

    display: flex;
    justify-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
    background-color: #f0f0f0;
    cursor: pointer;

    min-width: 3rem;
    min-height: 3rem;
    max-width: 3rem;
    max-height: 3rem;

    transition: all 1s ease;
  }
  .sound-open {
    width: 1.5rem;
    height: 1.5rem;
    transform: translateY(0.75rem);
    transition: all 0.8s ease-in-out;
  }

  .sound-switch:hover {
    background-color: var(--mainColor);
    border: 0.1rem solid #fff;
  }
</style>
