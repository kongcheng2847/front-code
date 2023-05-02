<template>
  <div class="dict-group">
    <div class="header-group">
      <el-tooltip content="新增" placement="top">
        <el-button type="primary" icon="Plus" size="large" @click="()=>{this.detailDialog = true;}"></el-button>
      </el-tooltip>
      <el-tooltip content="刷新" placement="top">
        <el-button type="info" icon="Refresh" size="large" @click="()=>{this.$refs.dictList.initData();}"></el-button>
      </el-tooltip>
    </div>
    <div class="main-group">
      <List ref="dictList"></List>
    </div>
    <div v-if="detailDialog">
      <el-dialog v-model="detailDialog" width="50%" draggable>
        <template #header="{  titleId, titleClass }">
          <div class="dialog-header">
            <span :id="titleId" :class="titleClass">新增</span>
          </div>
        </template>
        <Detail @doClose="doClose" :dict="dict"></Detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import List from '@/components/sys/dict/List.vue';
import Detail from '@/components/sys/dict/Detail.vue';

export default {
  name: 'DictView',
  data() {
    return {
      detailDialog: false,
      dict: {
        code: '',
        name: ''
      }
    };
  },
  components: {
    List,
    Detail
  },
  mounted() {
    // console.log('出现');
  },
  methods: {
    doClose() {
      this.detailDialog = false;
      setTimeout(() => {
        this.$refs.dictList.initData();
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.dict-group {
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