<template>
  <div class="menu-group">
    <div class="header-group">
      <el-tooltip content="新增" placement="top">
        <el-button type="primary" icon="Plus" size="large" @click="()=>{this.detailDialog = true;}"></el-button>
      </el-tooltip>
      <el-tooltip content="删除" placement="top">
        <el-button type="danger" icon="Delete" size="large" @click="()=>{this.$refs.menuList.toBatchDelete();}"></el-button>
      </el-tooltip>
      <el-tooltip content="刷新" placement="top">
        <el-button type="info" icon="Refresh" size="large" @click="()=>{this.$refs.menuList.initData();}"></el-button>
      </el-tooltip>
    </div>
    <div class="main-group">
      <List ref="menuList"></List>
    </div>
    <div v-if="detailDialog">
      <el-dialog v-model="detailDialog" width="50%" draggable>
        <template #header="{  titleId, titleClass }">
          <div class="dialog-header">
            <span :id="titleId" :class="titleClass">新增</span>
          </div>
        </template>
        <Detail @doClose="doClose"></Detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import List from '@/components/sys/menu/List.vue';
import Detail from '@/components/sys/menu/Detail.vue';

export default {
  name: 'MenuView',
  components: {
    List,
    Detail
  },
  data() {
    return {
      detailDialog: false
    };
  },
  mounted() {},
  methods: {
    doClose() {
      this.detailDialog = false;
      setTimeout(() => {
        this.$refs.menuList.initData();
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-group {
  height: 100%;
  .main-group {
    height: calc(100% - 52px);
  }
  .dialog-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>