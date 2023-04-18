<template>
  <div class="home">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #ffffff;
  height: 100%;
}
</style>
