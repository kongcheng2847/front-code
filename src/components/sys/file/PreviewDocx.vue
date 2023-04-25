<template>
  <div class="docWrap-group">
    <div ref="word" class="docWrap-content"></div>
  </div>
</template>

  <script>
import { renderAsync } from 'docx-preview';
export default {
  data() {
    return {};
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
      renderAsync(res['data'], this.$refs.word, null, {
        className: 'docx', // 默认和文档样式类的类名/前缀
        inWrapper: true, // 启用围绕文档内容渲染包装器
        ignoreWidth: false, // 禁止页面渲染宽度
        ignoreHeight: false, // 禁止页面渲染高度
        ignoreFonts: false, // 禁止字体渲染
        breakPages: true, // 在分页符上启用分页
        ignoreLastRenderedPageBreak: true, //禁用lastRenderedPageBreak元素的分页
        experimental: false, //启用实验性功能（制表符停止计算）
        trimXmlDeclaration: true, //如果为真，xml声明将在解析之前从xml文档中删除
        debug: false // 启用额外的日志记录
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.docWrap-group {
  height: 550px;
  overflow: auto;
  .docWrap-content {
    height: 100%;
  }
}
:deep(.docx-wrapper) {
  background-color: #fff;
  padding: 0;
}
:deep(.docx-wrapper > section.docx) {
  width: 100% !important;
  margin: 0px auto !important;
  padding: 0rem !important;
  min-height: auto !important;
  box-shadow: none;
  margin-bottom: 0;
}
</style>