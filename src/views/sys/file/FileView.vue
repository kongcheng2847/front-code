<template>
  <div class="file-group">
    <div class="header-group">
      <el-tooltip content="单文件上传" placement="top">
        <vxe-button status="primary" icon="vxe-icon-upload" @click="uploadSingle" style="height: 40px;"></vxe-button>
      </el-tooltip>
      <el-tooltip content="多文件上传" placement="top">
        <vxe-button status="primary" icon="vxe-icon-upload" @click="uploadMultiple" style="margin-right: 10px; height: 40px;"></vxe-button>
      </el-tooltip>
      <el-tooltip content="刷新" placement="top">
        <el-button type="info" icon="Refresh" size="large" @click="()=>{this.$refs.fileList.initData();}"></el-button>
      </el-tooltip>
      <el-tooltip content="删除" placement="top">
        <el-button type="danger" icon="Delete" size="large" @click="()=>{this.$refs.fileList.toBatchDelete();}"></el-button>
      </el-tooltip>
      <el-tooltip content="下载" placement="top">
        <el-button type="primary" icon="Download" size="large" @click="()=>{this.$refs.fileList.toBatchDowloadFile();}"></el-button>
      </el-tooltip>
    </div>
    <div class="main-group">
      <List ref="fileList"></List>
    </div>
    <div v-if="detailDialog">
      <el-dialog v-model="detailDialog" width="50%" draggable>
        <template #header="{  titleId, titleClass }">
          <div class="dialog-header">
            <span :id="titleId" :class="titleClass">新增</span>
          </div>
        </template>
        <Detail @doClose="doClose"></Detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import List from '@/components/sys/file/List.vue';
import Detail from '@/components/sys/file/Detail.vue';

export default {
  name: 'FileView',
  components: {
    List,
    Detail
  },
  data() {
    return {
      detailDialog: false
    };
  },
  mounted() {},
  methods: {
    async uploadSingle() {
      try {
        const { file } = await this.$VXETable.readFile();
        const formData = new FormData();
        //append方法逐个添加键值对
        formData.append('file', file); //把文件实体添加到表单对象
        //序列化其他数据为json添加到表单对象，后台反序列化获取对象实体，也可以单个append(),后台直接用对象取，如果一次性添加而不序列化会出错
        formData.append(
          'form',
          JSON.stringify({
            fileName: file.name,
            fileSize: file.size
          })
        );
        // console.log(formData.get('form'));
        // console.log(formData.get('file'));
        let res = await this.$Http('file/uploadFile', 'post', formData);
        this.$refs.fileList.initData();
      } catch (e) {
        this.$XModal.message({ content: '文件选取异常！', status: 'error' });
      }
    },
    async uploadMultiple() {
      try {
        const { files } = await this.$VXETable.readFile({ multiple: true });
        const forms = [];
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          forms.push({
            fileName: file.name,
            fileSize: file.size
          });
          formData.append('files', file); //把文件实体添加到表单对象
        }
        formData.append('forms', JSON.stringify(forms));
        let res = await this.$Http('file/uploadFiles', 'post', formData);
        this.$refs.fileList.initData();
      } catch (e) {
        this.$XModal.message({ content: '文件选取异常！', status: 'error' });
      }
    },
    doClose() {
      this.detailDialog = false;
      setTimeout(() => {
        this.$refs.fileList.initData();
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.file-group {
  height: 100%;
  .main-group {
    height: calc(100% - 92px);
  }
  .dialog-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>