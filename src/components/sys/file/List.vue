<template>
  <div class="file-list-group">
    <el-table
      ref="table"
      :data="tableData"
      stripe
      border
      highlight-current-row
      :header-cell-style="headerCellStyle"
      @current-change="handleRowClick"
      @selection-change="handleSelectionChange"
      @row-dblclick="handleRowDbClick"
      style="width: 100%; height: 95%;"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="fileName" label="文件名称" />
      <el-table-column prop="fileSize" label="文件大小" />
      <el-table-column prop="fileType" label="文件类型" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleClick(scope.row)">预览</el-button>
        </template>
      </el-table-column>
      <template v-slot:empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <div class="table-pagination">
      <el-pagination
        small
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 30, 50]"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.pageNumber"
        @size-change="handleSizeChange"
        @current-change="handleNumberChange"
      />
    </div>
    <div v-if="detailDialog">
      <el-dialog v-model="detailDialog" width="50%" draggable @close="initData">
        <template #header="{  titleId, titleClass }">
          <div class="dialog-header">
            <span :id="titleId" :class="titleClass">详情</span>
          </div>
        </template>
        <Detail @doClose="doClose" :file="file"></Detail>
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
      detailDialog: false,
      file: null,
      disabled: false,
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
  components: {
    Detail
  },
  methods: {
    async initData() {
      let res = await this.$Http('/file/queryPage', 'post', {
        pageSize: this.page.pageSize,
        pageNumber: this.page.pageNumber,
        condition: {}
      });
      console.log(res);
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
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.initData();
    },
    handleNumberChange(val) {
      this.page.pageNumber = val;
      this.initData();
    },
    async toBatchDelete() {
      if (this.multipleSelection.length === 0) {
        return this.$Message.warning('无数据！');
      }
      const ids = this.multipleSelection.map(e => {
        return e.id;
      });
      let res = await this.$Http('/file/batchDelete', 'post', ids);
      this.initData();
    },
    async toBatchDowloadFile() {
      if (this.multipleSelection.length === 0) {
        return this.$Message.warning('无数据！');
      } else if (this.multipleSelection.length === 1) {
        await this.$FileHttp('/file/dowloadFile', { id: this.multipleSelection[0].id });
      } else {
        const ids = this.multipleSelection.map(e => {
          return e.id;
        });
        await this.$FileHttp('/file/dowloadFiles', ids);
      }
      this.initData();
    },
    handleClick(row) {
      console.log(row.id);
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
.file-list-group {
  height: 100%;
}
</style>