<template>
    <div :class="[type]" @click="handleClick">
      <span class="unable-select-element">{{text}}</span>
    </div>
</template>

<script>
    export default {
        name: "DirectionButton",
        props: {
          direction: {
            type: String,
            default: "to-right"
          },
          text: {
            type: String,
            default: ""
          },
        },
        data() {
          return {
            support: {
              'to-left': 'btn-to-left',
              'to-right':'btn-to-right',
              'to-top':'btn-to-top',
              'to-bottom':'btn-to-bottom'
            },
            type: 'btn-to-right'
          }
        },
        methods: {
          handleClick() {
            this.$emit('click');
          }
        },
        created() {
          this.type = this.support[this.direction];
          if (undefined === this.type || null == this.type) {
            this.type = 'btn-to-right';
          }
        }
    }
</script>

<style scoped>
  .btn-to-right,
  .btn-to-right *,
  .btn-to-right :after,
  .btn-to-right :before,
  .btn-to-right:after,
  .btn-to-right:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .btn-to-right {
    display: flex;
    justify-content: center;
    justify-items: center;

    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: var(--bottomColor);
    background-image: none;
    color: #fff;
    cursor: pointer;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(var(--bottomColor), #fff);
    padding: 0;
    text-transform: uppercase;
    height: 2.5rem;
    width: 6rem;
  }

  .btn-to-right:disabled {
    cursor: default;
  }

  .btn-to-right:-moz-focusring {
    outline: auto;
  }

  .btn-to-right svg {
    display: block;
    vertical-align: middle;
  }

  .btn-to-right [hidden] {
    display: none;
  }

  .btn-to-right {
    --background: var(--bottomColor);
    background: none;
    overflow: hidden;
    position: relative;
  }

  .btn-to-right > span {
    /*display: block;*/
    /*position: relative;*/
    transition: transform 0.2s ease;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-weight: 900;
    line-height: 2.5rem;
  }

  .btn-to-right:after,
  .btn-to-right:before {
    --tilt: 20px;
    background: rgba(0, 0, 0, 0);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%);
    content: "";
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: -webkit-clip-path 0.2s ease;
    transition: clip-path 0.2s ease;
    transition: clip-path 0.2s ease, -webkit-clip-path 0.2s ease;
    width: 100%;
    z-index: -1;
  }

  .btn-to-right:after {
    --thickness: 5px;
    background: var(--background);
    height: calc(100% - var(--thickness) * 2);
    left: var(--thickness);
    top: var(--thickness);
    width: calc(100% - var(--thickness) * 2);
  }

  .btn-to-right:hover span {
    transform: translateX(-10px);
  }

  .btn-to-right:hover:after,
  .btn-to-right:hover:before {
    -webkit-clip-path: polygon(
      0 0,
      calc(100% - var(--tilt)) 0,
      100% 50%,
      calc(100% - var(--tilt)) 100%,
      0 100%
    );
    clip-path: polygon(
      0 0,
      calc(100% - var(--tilt)) 0,
      100% 50%,
      calc(100% - var(--tilt)) 100%,
      0 100%
    );
  }





  .btn-to-left,
  .btn-to-left *,
  .btn-to-left :after,
  .btn-to-left :before,
  .btn-to-left:after,
  .btn-to-left:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .btn-to-left {
    display: flex;
    justify-content: center;
    justify-items: center;

    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: var(--bottomColor);
    background-image: none;
    color: #fff;
    cursor: pointer;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(var(--bottomColor), #fff);
    padding: 0;
    text-transform: uppercase;
    height: 2.5rem;
    width: 6rem;
  }

  .btn-to-left:disabled {
    cursor: default;
  }

  .btn-to-left:-moz-focusring {
    outline: auto;
  }

  .btn-to-left svg {
    display: block;
    vertical-align: middle;
  }

  .btn-to-left [hidden] {
    display: none;
  }

  .btn-to-left {
    --background: var(--bottomColor);
    background: none;
    overflow: hidden;
    position: relative;
  }

  .btn-to-left > span {
    /*display: block;*/
    /*position: relative;*/
    transition: transform 0.2s ease;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-weight: 900;
    line-height: 2.5rem;
  }

  .btn-to-left:after,
  .btn-to-left:before {
    --tilt: 20px;
    background: rgba(0, 0, 0, 0);
    -webkit-clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      0 100%,
      0 50%);
    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      0 100%,
      0 50%);
    content: "";
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: -webkit-clip-path 0.2s ease;
    transition: clip-path 0.2s ease;
    transition: clip-path 0.2s ease, -webkit-clip-path 0.2s ease;
    width: 100%;
    z-index: -1;
  }

  .btn-to-left:after {
    --thickness: 5px;
    background: var(--background);
    height: calc(100% - var(--thickness) * 2);
    left: var(--thickness);
    top: var(--thickness);
    width: calc(100% - var(--thickness) * 2);
  }

  .btn-to-left:hover span {
    transform: translateX(10px);
  }

  .btn-to-left:hover:after,
  .btn-to-left:hover:before {
    -webkit-clip-path: polygon(
      calc(var(--tilt)) 0,
      100% 0,
      100% 100%,
      calc(var(--tilt)) 100%,
      0 50%
    );
    clip-path: polygon(
      calc(var(--tilt)) 0,
      100% 0,
      100% 100%,
      calc(var(--tilt)) 100%,
      0 50%
    );
  }

</style>
