<template>
  <div>
    <el-menu
      router
      :default-active="$route.path"
      :ellipsis="false"
      mode="horizontal"
      text-color="#fff"
      background-color="#545c64"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="/">{{msg}}</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/base">首页</el-menu-item>
      <el-menu-item index="/work">工作台</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      msg: 'Welcome To My Business Note',
      activeIndex: '/base'
    };
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
</style>