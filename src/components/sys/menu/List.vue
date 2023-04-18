<template>
  <div class="menu-list-group">
    <el-table
      ref="table"
      :data="tableData"
      stripe
      border
      row-key="id"
      default-expand-all
      highlight-current-row
      :header-cell-style="headerCellStyle"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @row-dblclick="handleRowDbClick"
      style="width: 100%; height: 98%;"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="orderNo" label="序号" />
      <el-table-column prop="name" label="菜单名称" />
      <el-table-column prop="icon" label="菜单图标" />
      <el-table-column prop="disabled" label="禁用状态">
        <template #default="scope">{{scope.row.disabled?'是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="path" label="菜单路径" />
      <el-table-column prop="remake" label="备注" />
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
      let res = await this.$Http('/menu/listTreeMenu', 'get', {
        pageSize: 1,
        pageNumber: 10,
        condition: {}
      });
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
      let res = await this.$Http('/menu/batchDelete', 'post', ids);
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
.menu-list-group {
  height: 100%;
}
</style>