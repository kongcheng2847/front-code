<template>
  <div>
    <el-form ref="fileForm" :model="fileForm" :rules="rules" label-width="100px" size="large" status-icon>
      <el-form-item label="文件名称" prop="fileName">
        <el-input v-model="fileForm.fileName" />
      </el-form-item>
      <el-form-item label="文件保存名称">
        <el-input v-model="fileForm.fileSavedName" disabled />
      </el-form-item>
      <el-form-item label="文件路径">
        <el-input v-model="fileForm.filePath" disabled />
      </el-form-item>
      <el-form-item label="文件大小">
        <el-input v-model="fileForm.fileSize" disabled />
      </el-form-item>
      <el-form-item label="文件类型">
        <el-input v-model="fileForm.fileType" disabled />
      </el-form-item>
      <el-form-item label="备注" prop="fileNote">
        <el-input type="textarea" v-model="fileForm.fileNote" />
      </el-form-item>
      <el-form-item>
        <div style="float: right;">
          <el-button type="primary" @click="submitForm(ruleFormRef)" size="large">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)" size="large">重置</el-button>
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
      fileForm: {},
      rules: {}
    };
  },
  props: {
    file: null
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await this.$Http('/file/info', 'post', {
        id: this.file.id
      });
      this.fileForm = res.data;
    },
    async submitForm() {
      this.$refs.fileForm.validate((valid, fields) => {
        if (valid) {
          let res = this.$Http('/file/saveOrUpdate', 'post', this.fileForm);
          this.$Message.success('提交成功！');
          this.$emit('doClose');
        } else {
          this.$Message.warning('数据校验失败！');
        }
      });
    },
    resetForm() {
      this.$refs.fileForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>