<template>
  <div>
    <p :v-for="(index,item) in workbook.SheetNames" @click="getTable(item)">{{item}}</p>
  </div>
  <el-table :data="excelData" style="width: 100%" size="small">
    <el-table-column v-for="(value, key, index) in excelData[0]" :key="index" :prop="key" :label="key"></el-table-column>
  </el-table>
</template>

<script>
import * as XLSX from 'xlsx/xlsx.mjs';

export default {
  name: 'PreviewXLSX',
  data() {
    return {
      workbook: null,
      excelData: []
    };
  },
  props: {
    id: null
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let res = await this.$FileBlob('/file/dowloadFile', { id: this.id });
      const xlsx_data = res.data.arrayBuffer();
      let tem_workbook = XLSX.read(xlsx_data, { type: 'array' }); // 解析数据
      this.workbook.value = tem_workbook;
      this.getTable(tem_workbook.SheetNames[0]); // 读取第一张表数据
    },
    // 解析xlsx数据为table
    getTable(sheetName) {
      let worksheet = workbook.value.Sheets[sheetName];
      this.excelData.value = XLSX.utils.sheet_to_json(worksheet);
    }
  }
};
</script>