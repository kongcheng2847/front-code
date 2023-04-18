<template>
  <div class="work-group">
    <el-container :style="{ height: height + 'px' }">
      <el-aside width="200px">
        <el-menu
          router
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="activeIndex"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          style="height: 100%;"
        >
          <SubMenu :menuTree="menuTree"></SubMenu>
        </el-menu>
      </el-aside>
      <el-main>
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
      msg: 'WorkView',
      activeIndex: '1',
      menuTree: []
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
}
</style>