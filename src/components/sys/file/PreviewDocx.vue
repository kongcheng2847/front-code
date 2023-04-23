<template>
  <VueOfficeDocx :src="url" @rendered="rendered"></VueOfficeDocx>
</template>

<script>
import VueOfficeDocx from '@vue-office/docx';

export default {
  name: 'PreviewDocx',
  data() {
    return {};
  },
  props: {
    url: null
  },
  components: {
    VueOfficeDocx
  },
  mounted() {},
  methods: {
    rendered() {
      console.log('渲染完成');
    }
  }
};
</script>