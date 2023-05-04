<template>
  <template v-for="item in menuTree" :key="item">
    <template v-if="item.children && item.children.length>0">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{item.name}}</span>
        </template>
        <SubMenu :menuTree="item.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :key="item.path" :index="item.path">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
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

<style lang="scss" scoped>
:deep(.el-sub-menu__title) {
  padding-right: 0;
}
</style>