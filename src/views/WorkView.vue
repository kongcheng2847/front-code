<template>
  <div class="work-group">
    <el-container :style="{ height: height + 'px' }">
      <el-aside class="aside-group">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          :collapse="isCollapse"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          style="height: 100%;"
        >
          <SubMenu :menuTree="menuTree"></SubMenu>
        </el-menu>
      </el-aside>
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SubMenu from '@/components/sys/menu/SubMenu.vue';

export default {
  name: 'WorkView',
  data() {
    return {
      menuTree: [],
      isCollapse: false
    };
  },
  mounted() {
    this.initMenu();
  },
  components: {
    SubMenu
  },
  props: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      // this.router.to(this.activeIndex);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async initMenu() {
      let res = await this.$Http('/menu/listTreeMenu', 'get');
      console.log(res);
      this.menuTree = res.data;
    }
  },
  computed: {
    height: {
      get: function () {
        return window.innerHeight - 60;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.work-group {
  width: 100%;
  height: 100%;
  background-color: #ebedf0;

  .aside-group {
    margin: 10px;
    border-radius: 5px;
  }
  .main-content {
    margin: 10px;
    border-radius: 5px;
    border: 1px solid var(--el-border-color);
  }
}
</style>