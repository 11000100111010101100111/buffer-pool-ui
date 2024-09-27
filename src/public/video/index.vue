<template>
    <div class="short-video-home">

    </div>
</template>

<script>
    export default {
        name: "index",
        mounted() {
          this.$message.warning("来看短视频正在升级中~，以后再来吧");
          setInterval(() => {
            window.location.href = '/404';
          }, 3000);
        }
    }
</script>

<style scoped>

</style>
