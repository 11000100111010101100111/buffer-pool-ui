<template>
  <div class="search-box">
<!--    <div class="search-button">-->
      <picture-and-text icon="icon-sousuo" label="搜索"
                        :show-icon="true"
                        :show-label="false"
                        :show-number="false"
      />
<!--    </div>-->
  </div>
</template>

<script>
    import PictureAndText from "../common/PictureAndText";
    export default {
        name: "SimpleSearch",
        components: {PictureAndText}
    }
</script>

<style scoped>
  * {
    color: #fff;
  }

  .search-box {
    width: 100%;
    background: #fffdef;
    border-radius: 10rem;
    display: flex;
    justify-content: center;
    transition: all .5s linear;
  }

  /*.search-box:hover {*/
  /*  transform: scaleX(1.1);*/
  /*}*/

  .search-box>* {
    color: #1e1e1e !important;
  }

  .search-button {
    width: 2rem;
    height: 2rem;
  }

</style>
