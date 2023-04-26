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
          <el-button v-else link type="primary" size="small" @click="previewPDF(scope.row)">预览</el-button>
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
      <el-dialog v-model="previewDialog" width="65%" draggable>
        <template #header="{  titleId, titleClass }">
          <div class="dialog-header">
            <span :id="titleId" :class="titleClass">{{ preview.name }}</span>
          </div>
        </template>
        <PreviewDocx v-if="preview.type=='doc'" :id="preview.id"></PreviewDocx>
        <PreviewExcelVue v-if="preview.type=='excel'" :id="preview.id" :fileName="preview.name"></PreviewExcelVue>
        <PreviewTxtVue v-if="preview.type=='txt'" :id="preview.id"></PreviewTxtVue>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Detail from './Detail.vue';
import PreviewDocx from './PreviewDocx.vue';
import PreviewTxtVue from './PreviewTxt.vue';
import PreviewExcelVue from './PreviewExcel.vue';

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
      preview: {
        id: null,
        name: null,
        type: null
      },
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
    Detail,
    PreviewDocx,
    PreviewTxtVue,
    PreviewExcelVue
  },
  methods: {
    async initData() {
      let res = await this.$Http('/file/queryPage', 'post', {
        pageSize: this.page.pageSize,
        pageNumber: this.page.pageNumber,
        condition: {}
      });
      // console.log(res);
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
    },
    doClose() {
      this.detailDialog = false;
      setTimeout(() => {
        this.initData();
      }, 500);
    },
    async previewPDF(row) {
      let res = await this.$FileBlob('/file/dowloadFile', { id: row.id });
      let fileName = row.fileName;
      let suffix = fileName.substring(fileName.lastIndexOf('.') + 1);
      this.preview.id = row.id;
      this.preview.name = fileName;

      if (suffix === 'pdf') {
        this.preview.type = suffix;
        let win = window.open(window.URL.createObjectURL(new Blob([res['data']], { type: 'application/pdf' })), window.tit);
        setTimeout(() => (win.document.title = fileName), 500);
        return;
      } else if (suffix.indexOf('doc') > -1) {
        this.preview.type = 'doc';
      } else if (suffix.indexOf('xls') > -1) {
        this.preview.type = 'excel';
      } else if (suffix == 'txt') {
        this.preview.type = suffix;
      } else {
        this.$Message.warning('非PDF/DOC/DOCX/EXCEL/TXT文件不可预览!');
      }
      this.previewDialog = true;
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