<template>
  <div class="footer">
    <H1>{{msg}}</H1>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      msg: 'Footer'
    };
  },
  mounted() {},
  components: {},
  props: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: #e6e8eb;
}
</style>
