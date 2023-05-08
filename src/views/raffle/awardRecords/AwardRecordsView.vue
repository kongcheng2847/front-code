<template>
  <div class="award-records-group">
    <div class="header-group">
      <el-tooltip content="删除" placement="top">
        <el-button type="danger" icon="Delete" size="large" @click="()=>{this.$refs.awardRecordsList.deleteSelectEvent();}"></el-button>
      </el-tooltip>
      <el-tooltip content="刷新" placement="top">
        <el-button type="info" icon="Refresh" size="large" @click="()=>{this.$refs.awardRecordsList.initData();}"></el-button>
      </el-tooltip>
    </div>
    <div class="main-group">
      <List ref="awardRecordsList"></List>
    </div>
  </div>
</template>
    
<script>
import List from '@/components/raffle/awardRecords/List.vue';

export default {
  name: 'AwardRecordsView',
  data() {
    return {
      msg: 'AwardRecordsView'
    };
  },
  components: {
    List
  }
};
</script>
    
<style lang="scss" scoped>
.award-records-group {
  height: 100%;
  .main-group {
    height: calc(100% - 92px);
  }
}
</style>