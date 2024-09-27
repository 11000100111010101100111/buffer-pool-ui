<template>
    <div class="auth-page">

    </div>
</template>

<script>
    export default {
        name: "index",
        mounted() {
          this.$message.warning("页面正在升级中，以后再来吧");
          setInterval(() => {
            window.location.href = '/404';
          }, 3000);
        }
    }
</script>

<style scoped>
  .auth-page {
    background-color: var(--mainColor);
  }
</style>
