<template>
  <div class="luckysheet-group">
    <div id="luckysheet" class="luckysheet-content"></div>
  </div>
</template>

<script>
import LuckyExcel from 'luckyexcel';

export default {
  name: 'PreviewExcel',
  data() {
    return {};
  },
  props: {
    id: null,
    fileName: null
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let res = await this.$FileBlob('/file/dowloadFile', { id: this.id });
      let blob = new Blob([res.data]);
      let file = new File([blob], this.fileName, { type: 'excel/xlsx' });
      console.log('file', file);
      LuckyExcel.transformExcelToLucky(
        file,
        (exportJson, luckysheetfile) => {
          // 获得转化后的表格数据后，使用luckysheet初始化，或者更新已有的luckysheet工作簿
          // 注：luckysheet需要引入依赖包和初始化表格容器才可以使用
          luckysheet.create({
            container: 'luckysheet', //luckysheet is the container id
            lang: 'zh', // 设定表格语言
            title: this.fileName,
            allowEdit: false, //作用：是否允许前台编辑
            // allowUpdate: true,
            sheetFormulaBar: false,
            allowCopy: true, //是否允许拷贝
            showinfobar: false, //是否显示顶部名称栏
            showtoolbar: false, //是否第二列显示工具栏
            showsheetbar: true, //是否显示底部表格名称区域
            showstatisticBar: true, //是否显示底部计数栏
            pointEdit: false, //是否是编辑器插入表格模式
            pointEditUpdate: null, //编辑器表格更新函数
            data: exportJson.sheets,
            title: exportJson.info.name,
            userInfo: exportJson.info.name.creator
          });
        },
        err => {
          logger.error('Import failed. Is your fail a valid xlsx?');
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.luckysheet-group {
  height: 550px;
  .luckysheet-content {
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
}
</style>