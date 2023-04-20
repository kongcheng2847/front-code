<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      msg: 'Detail'
    };
  },
  props: {
    file: null
  },
  mounted() {
    // this.initData();
    console.log(this.file);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>