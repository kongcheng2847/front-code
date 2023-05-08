<template>
  <div>
    <vxe-toolbar ref="xToolbar" :loading="loading">
      <template #buttons>
        <div>
          <vxe-form :data="award">
            <vxe-form-item title="奖项组" field="awardGroup" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.awardGroup" placeholder="请输入奖项组" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="奖项标题" field="awardTitle" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.awardTitle" placeholder="请输入奖项标题" clearable></vxe-input>
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
      ref="awardConfigTable"
      height="460"
      :data="tableData"
      :column-config="{resizable: true}"
      :edit-config="{trigger: 'click', mode: 'cell', showUpdateStatus: true, showInsertStatus: true}"
    >
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="orderNo" title="排序号" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #edit="{ row }">
          <vxe-input v-model="row.orderNo" type="number"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="awardIndex" title="奖项索引" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #edit="{ row }">
          <vxe-input v-model="row.awardIndex" type="number"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="awardContent" title="奖项内容" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.awardContent" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="awardGroup" title="奖项组" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.awardGroup" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="awardTitle" title="奖项标题" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input v-model="row.awardTitle" type="text"></vxe-input>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'AwardConfigDetail',
  data() {
    return {
      loading: false,
      tableData: []
    };
  },
  props: {
    award: null
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await this.$Http('/raffle/awardConfig/listByAwardGroup', 'post', this.award);
      this.tableData = res.data;
    },
    async insertEvent() {
      const $table = this.$refs.awardConfigTable;
      const newRecord = {
        awardGroup: this.award.awardGroup,
        awardTitle: this.award.awardTitle
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
      const $table = this.$refs.awardConfigTable;
      const checkboxRecords = $table.getCheckboxRecords();
      try {
        const ids = checkboxRecords.filter(e => e.id != null).map(e => e.id);
        await this.$Http('/raffle/awardConfig/batchDelete', 'post', ids);
        await this.initData();
      } catch (e) {
        if (e && e.message) {
          this.$XModal.message({ content: e.message, status: 'error' });
        }
      }
    },
    async saveEvent() {
      const $table = this.$refs.awardConfigTable;
      const { insertRecords, updateRecords } = $table.getRecordset();
      if (insertRecords.length <= 0 && updateRecords.length <= 0) {
        this.$XModal.message({ content: '数据未改动！', status: 'warning' });
        return;
      }
      this.loading = true;
      try {
        const tableData = insertRecords.concat(updateRecords);
        let res = await this.$Http('/raffle/awardConfig/batchSaveOrUpdate', 'post', tableData);
        console.log(res);
        await this.initData();
        this.$XModal.message({ content: `操作成功，新增 ${insertRecords.length} 条，更新 ${updateRecords.length} 条`, status: 'success' });
      } catch (e) {
        if (e && e.message) {
          this.$XModal.message({ content: e.message, status: 'error' });
        }
      }
      this.loading = false;
    }
  }
};
</script>