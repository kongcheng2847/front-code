<template>
  <div class="stock-list-group">
    <el-table
      ref="table"
      :data="tableData"
      stripe
      border
      highlight-current-row
      :header-cell-style="headerCellStyle"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @row-dblclick="handleRowDbClick"
      style="width: 100%; height: 98%;"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="tradeName" label="商品名称" />
      <el-table-column prop="tradeType" label="商品类型" />
      <el-table-column prop="tradeResource" label="商品来源" />
      <el-table-column prop="tradeBid" label="商品进价" />
      <el-table-column prop="tradePrice" label="商品售价" />
      <el-table-column prop="tradeRemake" label="备注" />
      <template v-slot:empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <div v-if="detailDialog">
      <el-dialog v-model="detailDialog" width="50%" draggable>
        <template #header="{  titleId, titleClass }">
          <div class="dialog-header">
            <span :id="titleId" :class="titleClass">编辑</span>
          </div>
        </template>
        <Detail @doClose="doClose" :id="this.currentRow?this.currentRow.id:null"></Detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Detail from './Detail.vue';

export default {
  name: 'List',
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentRow: null,
      detailDialog: false
    };
  },
  mounted() {
    this.initData();
  },
  components: {
    Detail
  },
  methods: {
    async initData() {
      let res = await this.$Http('/trade/queryPage', 'post', {
        pageSize: 1,
        pageNumber: 10,
        condition: {}
      });
      console.log(res);
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
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleRowDbClick(row) {
      if (row.id) {
        this.detailDialog = true;
      }
    },
    doClose() {
      this.detailDialog = false;
      setTimeout(() => {
        this.initData();
      }, 500);
    },
    async toBatchDelete() {
      if (this.multipleSelection.length === 0) {
        return this.$Message.warning('无数据！');
      }
      const ids = this.multipleSelection.map(e => {
        return e.id;
      });
      let res = await this.$Http('/trade/batchDelete', 'post', ids);
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
.stock-list-group {
  height: 100%;
}
</style>