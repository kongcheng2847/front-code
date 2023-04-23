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
          <el-image
            v-if="scope.row.fileType=='image'"
            style="display: flex; align-items: center; width: 30px; height: 20px"
            fit="cover"
            preview-teleported
            hide-on-click-modal
            :src="scope.row.filePath"
            :zoom-rate="1.2"
            :initial-index="0"
            :preview-src-list="previewList"
          />
          <el-button v-else link type="primary" size="small" @click="handleClick(scope.row)">预览</el-button>
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
    <div v-if="previewDialog">
      <el-dialog v-model="previewDialog" width="50%" draggable @close="initData">
        <template #header="{  titleId, titleClass }">
          <div class="dialog-header">
            <span :id="titleId" :class="titleClass">{{preview.title}}</span>
          </div>
        </template>
        <PreviewPDF v-if="preview.type=='pdf'" :id="preview.id"></PreviewPDF>
        <PreviewDocx v-if="preview.type=='docx' || preview.type=='txt'" :url="preview.path"></PreviewDocx>
        <PreviewXLSX v-if="preview.type=='xlsx' || preview.type=='xls'" :id="preview.id"></PreviewXLSX>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Detail from './Detail.vue';
import PreviewDOC from './PreviewDOC.vue';
import PreviewPDF from './PreviewPDF.vue';
import PreviewXLSX from './PreviewXLSX.vue';
import PreviewDocx from './PreviewDocx.vue';

export default {
  name: 'List',
  data() {
    return {
      tableData: [],
      previewList: [],
      multipleSelection: [],
      currentRow: null,
      detailDialog: false,
      previewDialog: false,
      file: null,
      disabled: false,
      preview: {
        id: null,
        url: null,
        type: null,
        title: null
      },
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
    Detail,
    PreviewPDF,
    PreviewDOC,
    PreviewXLSX,
    PreviewDocx
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
      this.previewList = this.tableData.filter(e => e.fileType == 'image').map(e => e.filePath);
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
      let fileName = row.fileName;
      let suffix = fileName.substring(fileName.lastIndexOf('.') + 1);
      this.preview = {
        id: row.id,
        type: suffix,
        title: row.fileName,
        path: row.filePath
      };
      this.previewDialog = true;
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