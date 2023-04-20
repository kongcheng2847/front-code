<template>
  <div class="base-group" :style="{ height: bodyHeight + 'px' }">
    <el-calendar v-model="value" />
  </div>
</template>

<script>
export default {
  name: 'BaseView',
  data() {
    return {
      value: new Date()
    };
  },
  mounted() {
    this.get();
  },
  components: {},
  props: {},
  methods: {
    async get() {
      let res = await this.$Http('/trade/list', 'post', {
        pageSize: 1,
        pageNumber: 10,
        condiiton: {
          tradeName: ''
        }
      });
      console.log(res);
    }
  },
  computed: {
    bodyHeight: {
      get: function () {
        return window.innerHeight - 85;
      },
      set: function (newValue) {
        this.$refs.table.$el.style.height = newValue + 'px';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-group {
  display: flex;
  align-items: center;
  margin: 10px;
  border: 1px solid #ebedf0;
  border-radius: 5px;
}
</style>