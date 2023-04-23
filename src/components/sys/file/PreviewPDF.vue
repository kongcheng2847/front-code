<template>
  <div>
    <canvas id="pdf_canvas"></canvas>
  </div>
</template>
<script>
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf'; // 引入PDFJS
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry.js'; // 引入workerSrc的地址

export default {
  name: 'PreviewPDF',
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
      const blobPdf = new window.Blob([res['data']], { type: 'application/pdf;chaset-UTF-8' });
      const pdfhref = URL.createObjectURL(blobPdf);
      PDFJS.getDocument(pdfhref).promise.then(pdfDoc => {
        // pdf的总页数 // 获取第1页的数据
        const numPages = pdfDoc.numPages;
        pdfDoc.getPage(1).then(page => {
          // 设置canvas相关的属性
          const canvas = document.getElementById('pdf_canvas');
          const ctx = canvas.getContext('2d');
          const dpr = window.devicePixelRatio || 1;
          const bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;
          const ratio = dpr / bsr;
          const viewport = page.getViewport({ scale: 1 });
          canvas.width = viewport.width * ratio;
          canvas.height = viewport.height * ratio;
          canvas.style.width = viewport.width + 'px';
          canvas.style.height = viewport.height + 'px';
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          }; // 数据渲染到canvas画布上
          page.render(renderContext);
        });
      });
    },
    // 切换pdf页数
    changePdfPage(type) {
      if (type == 'pre') {
        if (pdfPage.value <= 1) {
          ElMessage.error('没有上一页了');
          return;
        }
        pdfPage.value -= 1;
      } else {
        if (pdfPage.value >= pdfValue.numPages) {
          ElMessage.error('没有下一页了');
          return;
        }
        pdfPage.value += 1;
      }
      initPdfPage();
    },

    // 重新初始化pdf对应页数
    initPdfPage() {
      pdfValue.getPage(pdfPage.value).then(page => {
        // 设置canvas相关的属性
        const canvas = document.getElementById('pdf_canvas');
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        const ratio = dpr / bsr;
        const viewport = page.getViewport({ scale: 1 });
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + 'px';
        canvas.style.height = viewport.height + 'px';
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        // 数据渲染到canvas画布上
        page.render(renderContext);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>