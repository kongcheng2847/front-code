<template>
  <div class="work-group">
    <el-container :style="{ height: height + 'px' }">
      <el-aside class="aside-group">
        <el-menu
          router
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical"
          :default-active="$route.path"
          :collapse="isCollapse"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          style="height: 100%;"
        >
          <div class="shrink-group">
            <div class="shrink-title" v-show="!isCollapse">{{'收起导航栏'}}</div>
            <div class="shrink-icon">
              <template v-if="isCollapse">
                <el-icon>
                  <Expand @click="shrinkMenu" />
                </el-icon>
              </template>
              <template v-else>
                <el-icon>
                  <Fold @click="shrinkMenu" />
                </el-icon>
              </template>
            </div>
          </div>
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
    shrinkMenu() {
      this.isCollapse = !this.isCollapse;
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
    width: auto;
    margin: 10px;
    border-radius: 5px;
    position: relative;
    .el-menu-vertical:not(.el-menu--collapse) {
      min-width: 300px;
      min-height: 400px;
    }
    .shrink-group {
      width: 100%;
      height: 50px;
      padding: 10px;
      color: #409eff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      .shrink-title {
        flex: auto;
        text-align: left;
        padding-left: inherit;
      }
      .shrink-icon i {
        font-size: 25px;
      }
    }
  }
  .main-content {
    flex: 1;
    margin: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid var(--el-border-color);
  }
}
</style>