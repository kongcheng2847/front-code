<template>
  <div class="menu-group">
    <div class="header-group">
      <el-button type="primary" size="small" @click="()=>{this.detailDialog = true;}">新增</el-button>
      <el-button type="primary" size="small" @click="()=>{this.$refs.menuList.initData();}">刷新</el-button>
      <el-button type="primary" size="small" @click="()=>{this.$refs.menuList.toBatchDelete();}">删除</el-button>
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
  margin: 10px;
  height: calc(100% - 25px);
  border: 1px solid #ebedf0;
  border-radius: 5px;

  .header-group {
    display: flex;
    margin: 5px;
    padding: 5px;
    height: 30px;
    align-items: center;
    border: 1px solid #ebedf0;
  }
  .main-group {
    padding: 5px;
    height: calc(100% - 50px);
  }
  .dialog-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>