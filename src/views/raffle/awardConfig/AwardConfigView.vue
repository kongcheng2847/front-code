<template>
  <div class="award-config-group">
    <div class="header-group">
      <el-tooltip content="新增" placement="top">
        <el-button type="primary" icon="Plus" size="large" @click="()=>{this.detailDialog = true;}"></el-button>
      </el-tooltip>
      <el-tooltip content="刷新" placement="top">
        <el-button type="info" icon="Refresh" size="large" @click="()=>{this.$refs.awardConfigList.initData();}"></el-button>
      </el-tooltip>
    </div>
    <div class="main-group">
      <List ref="awardConfigList"></List>
    </div>
    <div v-if="detailDialog">
      <el-dialog v-model="detailDialog" width="50%" draggable>
        <template #header="{  titleId, titleClass }">
          <div class="dialog-header">
            <span :id="titleId" :class="titleClass">新增</span>
          </div>
        </template>
        <Detail @doClose="doClose" :award="award"></Detail>
      </el-dialog>
    </div>
  </div>
</template>
    
<script>
import List from '@/components/raffle/awardConfig/List.vue';
import Detail from '@/components/raffle/awardConfig/Detail.vue';

export default {
  name: 'AwardConfigView',
  data() {
    return {
      detailDialog: false,
      award: {
        awardGroup: null,
        awardTitle: null
      }
    };
  },
  components: {
    List,
    Detail
  },
  methods: {
    doClose() {
      this.detailDialog = false;
      setTimeout(() => {
        this.$refs.awardConfigList.initData();
      }, 500);
    }
  }
};
</script>
    
<style lang="scss" scoped>
.award-config-group {
  height: 100%;
  .main-group {
    height: calc(100% - 92px);
  }
}
</style>