<template>
  <div>
    <vxe-toolbar ref="xToolbar" :loading="loading">
      <template #buttons>
        <div>
          <vxe-form :data="dict">
            <vxe-form-item title="编码" field="name" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.code" placeholder="请输入编码" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="名称" field="code" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
          </vxe-form>
        </div>
        <vxe-button status="primary" content="新增" @click="insertEvent"></vxe-button>
        <vxe-button status="danger" content="删除" @click="deleteSelectEvent"></vxe-button>
        <vxe-button status="primary" content="提交" @click="saveEvent"></vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      show-overflow
      keep-source
      ref="dictTable"
      height="400"
      :data="tableData"
      :column-config="{resizable: true}"
      :edit-config="{trigger: 'click', mode: 'cell', showUpdateStatus: true, showInsertStatus: true}"
    >
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="orderNo" title="字典序号" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #edit="{ row }">
          <vxe-input v-model="row.orderNo" type="number"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="value" title="实际值" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.value" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="displayValue" title="反显值" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.displayValue" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="parentId" title="父级" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.parentId" type="text"></vxe-input>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      loading: false,
      tableData: []
    };
  },
  props: {
    dict: null
  },
  mounted() {
    console.log(this.dict);
    this.initData();
  },
  methods: {
    async insertEvent() {
      const $table = this.$refs.dictTable;
      const newRecord = {
        code: this.dict.code,
        name: this.dict.name
      };
      const { row: newRow } = await $table.insert(newRecord);
      await $table.setEditRow(newRow);
    },
    async deleteSelectEvent() {
      const type = await this.$XModal.confirm('您确定要删除选中的数据?');
      if (type !== 'confirm') {
        this.$XModal.message({ content: '已取消', status: 'info' });
        return;
      }
      const $table = this.$refs.dictTable;
      const checkboxRecords = $table.getCheckboxRecords();
      try {
        const ids = checkboxRecords.filter(e => e.id != null).map(e => e.id);
        await this.$Http('/dict/batchDelete', 'post', ids);
        await this.initData();
      } catch (e) {
        if (e && e.message) {
          this.$XModal.message({ content: e.message, status: 'error' });
        }
      }
    },
    async saveEvent() {
      const $table = this.$refs.dictTable;
      const { insertRecords, updateRecords } = $table.getRecordset();
      if (insertRecords.length <= 0 && updateRecords.length <= 0) {
        this.$XModal.message({ content: '数据未改动！', status: 'warning' });
        return;
      }
      this.loading = true;
      try {
        const tableData = insertRecords.concat(updateRecords);
        let res = await this.$Http('/dict/batchSaveOrUpdate', 'post', tableData);
        console.log(res);
        await this.initData();
        this.$XModal.message({ content: `操作成功，新增 ${insertRecords.length} 条，更新 ${updateRecords.length} 条`, status: 'success' });
      } catch (e) {
        if (e && e.message) {
          this.$XModal.message({ content: e.message, status: 'error' });
        }
      }
      this.loading = false;
    },
    async initData() {
      let res = await this.$Http('/dict/listByCode', 'post', this.dict);
      this.tableData = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>