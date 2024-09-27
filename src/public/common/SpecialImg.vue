<template>
    <div class="img-box">
      <img3-d :src="img.src" :title="img.title" :text="img.message"/>
    </div>
</template>

<script>
    import Img3D from "./img3D";
    export default {
        name: "SpecialImg",
        components: {Img3D},
        data() {
          return {
            img: {
              key: 3,
              src: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
              title: 'This is a special Img Card',
              message: 'It has a certain 3D effect, and when the mouse moves, it calculates the rounded corners based on the distance between the mouse and the four corners of the rectangle. The closer the corner is, the more obvious its rounded corners are'
            }
          }
        }
    }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .img-box {
    --mainColor: #BE3E50;
    background-color: var(--mainColor);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-items: center;
    justify-content: center;
  }
</style>
