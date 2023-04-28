<template>
  <div class="table-pagination">
    <el-pagination
      small
      background
      :layout="layout"
      :page-sizes="pageSizes"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.pageNumber"
      @size-change="handleSizeChange"
      @current-change="handleNumberChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {};
  },
  props: {
    layout: {
      default: () => {
        return 'total, sizes, prev, pager, next, jumper';
      }
    },
    pageSizes: {
      default: () => {
        return [10, 30, 50];
      }
    },
    page: {
      default: () => {
        return {
          total: 0,
          pageSize: 10,
          pageNumber: 1
        };
      }
    }
  },
  mounted() {
    console.log(this.layout);
    console.log(this.pageSizes);
    console.log(this.page);
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.$emit('initData');
    },
    handleNumberChange(val) {
      this.page.pageNumber = val;
      this.$emit('initData');
    }
  }
};
</script>