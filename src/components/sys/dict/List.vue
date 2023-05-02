<template>
  <div class="dict-list-group">
    <el-table
      ref="table"
      :data="tableData"
      stripe
      border
      size="large"
      highlight-current-row
      :header-cell-style="headerCellStyle"
      @current-change="handleCurrentChange"
      @row-dblclick="handleRowDbClick"
      style="width: 100%; height: 100%;"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="code" label="字典编码" />
      <el-table-column prop="name" label="字典名称" />
      <template v-slot:empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <div v-if="detailDialog">
      <el-dialog v-model="detailDialog" width="50%" draggable @close="initData">
        <template #header="{  titleId, titleClass }">
          <div class="dialog-header">
            <span :id="titleId" :class="titleClass">编辑</span>
          </div>
        </template>
        <Detail @doClose="doClose" :dict="dict"></Detail>
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
      dict: {
        code: null,
        name: null
      },
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
      let res = await this.$Http('/dict/listDictGroup', 'get');
      console.log(res);
      this.tableData = res.data;
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
    handleRowDbClick(row) {
      this.dict = row;
      this.detailDialog = true;
    },
    doClose() {
      this.detailDialog = false;
      setTimeout(() => {
        this.initData();
      }, 500);
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
.dict-list-group {
  height: 100%;
}
</style>