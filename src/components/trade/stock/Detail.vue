<template>
  <div>
    <el-form ref="tradeForm" :model="tradeForm" :rules="rules" label-width="80px" size="small" status-icon>
      <el-form-item label="商品名称" prop="tradeName">
        <el-input v-model="tradeForm.tradeName" />
      </el-form-item>
      <el-form-item label="商品类型" prop="tradeType">
        <el-input v-model="tradeForm.tradeType" />
      </el-form-item>
      <el-form-item label="商品来源" prop="tradeResource">
        <el-input v-model="tradeForm.tradeResource" />
      </el-form-item>
      <el-form-item label="商品进价" prop="tradeBid">
        <el-input v-model="tradeForm.tradeBid" />
      </el-form-item>
      <el-form-item label="商品售价" prop="tradePrice">
        <el-input v-model="tradeForm.tradePrice" />
      </el-form-item>
      <el-form-item label="备注" prop="tradeRemake">
        <el-input type="textarea" v-model="tradeForm.tradeRemake" />
      </el-form-item>
      <el-form-item>
        <div style="float: right;">
          <el-button type="primary" @click="submitForm(ruleFormRef)" size="small">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)" size="small">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      tradeForm: {},
      rules: []
    };
  },
  props: {
    id: null
  },
  mounted() {
    if (this.id) {
      this.initData();
    }
  },
  methods: {
    async submitForm() {
      this.$refs.tradeForm.validate((valid, fields) => {
        if (valid) {
          let res = this.$Http('/trade/save', 'post', this.tradeForm);
          this.$Message.success('提交成功！');
          this.$emit('doClose');
        } else {
          this.$Message.warning('数据校验失败！');
        }
      });
    },
    resetForm() {
      this.$refs.tradeForm.resetFields();
    },
    async initData() {
      let res = await this.$Http('/trade/info', 'post', {
        id: this.id
      });
      this.tradeForm = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>