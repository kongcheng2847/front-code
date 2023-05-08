<template>
  <div class="award-records-list-group">
    <el-table
      ref="table"
      :data="tableData"
      stripe
      border
      size="large"
      highlight-current-row
      :header-cell-style="headerCellStyle"
      @current-change="handleRowClick"
      @selection-change="handleSelectionChange"
      @row-dblclick="handleRowDbClick"
      style="width: 100%; height: 100%;"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="awardContent" label="奖项内容" />
      <el-table-column prop="createTime" label="抽奖时间" />
      <template v-slot:empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <Pagination :page="page" @initData="initData"></Pagination>
  </div>
</template>
  
  <script>
export default {
  name: 'AwardRecordsList',
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentRow: null,
      page: {
        total: 0,
        pageSize: 10,
        pageNumber: 1
      }
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await this.$Http('/raffle/awardRecords/queryPage', 'post', {
        pageSize: this.page.pageSize,
        pageNumber: this.page.pageNumber,
        condition: {}
      });
      // console.log(res);
      this.page.total = res.data.total;
      this.tableData = res.data.records;
    },
    // 表头单元格样式
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      return {
        backgroundColor: '#f0f2f5',
        color: '#001436',
        fontWeight: 500,
        padding: '8px 0px',
        fontSize: '12px'
      };
    },
    handleRowClick(val) {
      this.currentRow = val;
    },
    handleRowDbClick(row) {
      this.file = row;
      this.detailDialog = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async toBatchDelete() {
      if (this.multipleSelection.length === 0) {
        return this.$Message.warning('无数据！');
      }
      const ids = this.multipleSelection.map(e => {
        return e.id;
      });
      let res = await this.$Http('/raffle/awardRecords/batchDelete', 'post', ids);
      this.initData();
    }
  },
  computed: {
    tableHeight: {
      get: function () {
        return window.innerHeight - 120;
      },
      set: function (newValue) {
        this.$refs.table.$el.style.height = newValue + 'px';
      }
    }
  }
};
</script>
  
<style lang="scss" scoped>
.award-records-list-group {
  height: 100%;
}
</style>