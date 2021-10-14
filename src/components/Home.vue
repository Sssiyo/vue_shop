<template>
  <div>
    im home
    <el-button type="info" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>
