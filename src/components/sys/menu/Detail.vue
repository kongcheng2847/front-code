<template>
  <div>
    <el-form ref="menuForm" :model="menuForm" :rules="rules" label-width="80px" size="large" status-icon>
      <el-form-item label="序号" prop="orderNo">
        <el-input v-model="menuForm.orderNo" type="number" />
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <el-tree-select v-model="menuForm.parentId" :data="menuOptions" check-strictly :render-after-expand="false" style="width: 100%;"></el-tree-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="menuForm.name" />
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model="menuForm.icon" />
      </el-form-item>
      <el-form-item label="菜单路径" prop="path">
        <el-input v-model="menuForm.path" />
      </el-form-item>
      <el-form-item label="禁用状态" prop="disabled">
        <el-radio-group v-model="menuForm.disabled">
          <el-radio :label="Boolean(false)" size="large">启用</el-radio>
          <el-radio :label="Boolean(true)" size="large">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remake">
        <el-input type="textarea" v-model="menuForm.remake" />
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
      menuForm: {},
      rules: {
        parentId: [{ required: true, message: '上级菜单必填', trigger: 'blur' }],
        name: [{ required: true, message: '菜单名称必填', trigger: 'blur' }],
        path: [{ required: true, message: '菜单路径必填', trigger: 'blur' }],
        disabled: [{ required: true, message: '菜单状态必填', trigger: 'blur' }]
      },
      menuOptions: []
    };
  },
  props: {
    id: null
  },
  mounted() {
    this.initMenuOptions();
    if (this.id) {
      this.initData();
    }
  },
  methods: {
    async submitForm() {
      this.$refs.menuForm.validate((valid, fields) => {
        if (valid) {
          let res = this.$Http('/menu/saveOrUpdate', 'post', this.menuForm);
          this.$Message.success('提交成功！');
          this.$emit('doClose');
        } else {
          this.$Message.warning('数据校验失败！');
        }
      });
    },
    resetForm() {
      this.$refs.menuForm.resetFields();
    },
    async initMenuOptions() {
      let res = await this.$Http('/menu/listTreeMenu', 'get');
      res.data.forEach(e => {
        this.setMenuTree(e);
      });
      this.menuOptions = res.data;
      console.log(this.menuOptions);
    },
    async initData() {
      let res = await this.$Http('/menu/info', 'post', {
        id: this.id
      });
      this.menuForm = res.data;
    },
    setMenuTree(obj) {
      obj['label'] = obj.name;
      obj['value'] = obj.id;
      if (obj.children) {
        obj.children.forEach(e => {
          this.setMenuTree(e);
        });
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>