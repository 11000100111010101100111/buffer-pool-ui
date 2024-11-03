<template>
  <div class="operation-of-avatar">
    <el-image
      :src="user.info.url"
      class="about-auth-img"/>
  </div>
</template>

<script>
    export default {
        name: "SimpleUser",
        data() {
          return {
            user: {
              info: {
                url: "http://8.134.183.234/icon/about-auth.jpg",
                name: "二叉树"
              }
            }
          }
        }
    }
</script>

<style scoped>
  .operation-of-avatar {
    width: 2.2rem;
    height: 2.2rem;
    background-color: #1ab394;
    border-radius: 1.5rem;
    border: .1rem solid #fff;
    cursor: pointer;
  }
  .operation-of-avatar > .el-image {
    border-radius: 1.5rem;
  }

  .operation-of-avatar:hover {
    box-shadow: 0 0 1rem #1e1e1e;
  }
</style>
