<template>
  <div class="pretxt-group">
    <div class="pretxt-content">
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewTxt',
  data() {
    return {
      data: null
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
      let blob = new Blob([res['data']]);
      blob
        .text()
        .then(data => {
          console.log(data);
          // data：指成功读取到的内容
          this.data = data;
        })
        .catch(err => {
          //err： 指读取失败后返回的错误内容
          this.data = '文件解析失败！';
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pretxt-group {
  height: 550px;
  overflow: auto;
  .pretxt-content {
    height: 100%;
  }
}
</style>