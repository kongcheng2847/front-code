<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'BaseView',
  data() {
    return {
      msg: 'BaseView'
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
  }
};
</script>

<style lang="scss" scoped>
</style>