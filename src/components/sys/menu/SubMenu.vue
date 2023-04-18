<template>
  <template v-for="item in menuTree" :key="item">
    <template v-if="item.children && item.children.length>0">
      <el-sub-menu :index="item.path">
        <template #title>
          <span>{{item.name}}</span>
        </template>
        <SubMenu :menuTree="item.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :key="item.path" :index="item.path">
        <span>{{item.name}}</span>
      </el-menu-item>
    </template>
  </template>
</template>
<script>
export default {
  name: 'SubMenu',
  data() {
    return {};
  },
  props: {
    menuTree: null
  },
  mounted() {},
  methods: {}
};
</script>