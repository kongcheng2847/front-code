<template>
  <div class="raffle-group">
    <div class="raffle-content">
      <el-button type="primary" icon="Plus" size="large" @click="toRaffle">幸运抽奖</el-button>
      <el-carousel
        :interval="interval"
        :autoplay="autoplay"
        :pause-on-hover="hover"
        @change="carouselChange"
        type="card"
        trigger="click"
        indicator-position="outside"
        arrow="always"
        height="500px"
      >
        <el-carousel-item v-for="(item,index) in awards" :key="index" :name="item.title" ref="carouselItemRef">
          <h3>{{ index+1 }}</h3>
          <el-card :body-style="{ padding: '0px' }">
            <div>
              <h1>{{item.title}}</h1>
            </div>
            <div>
              <h2>{{item.describe}}</h2>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Raffle',
  data() {
    return {
      autoplay: true,
      interval: 3000,
      hover: true,
      awards: [
        {
          title: 'awardOne',
          describe: '奖项1'
        },
        {
          title: 'awardTwo',
          describe: '奖项2'
        },
        {
          title: 'awardThree',
          describe: '奖项3'
        },
        {
          title: 'awardFour',
          describe: '奖项4'
        },
        {
          title: 'awardFive',
          describe: '奖项5'
        },
        {
          title: 'awardSix',
          describe: '奖项6'
        }
      ],
      activeAward: null
    };
  },
  methods: {
    toRaffle() {
      this.hover = false;
      this.autoplay = true;
      this.interval = 300;
      setTimeout(() => {
        this.autoplay = false;
        console.log(this.activeAward);
      }, 5000);
    },
    carouselChange(val) {
      //   console.log(val);
      this.activeAward = this.awards[val];
    }
  }
};
</script>

<style lang="scss" scoped>
.raffle-group {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .raffle-content {
    flex: auto;
    .card-main {
      display: flex;
      flex-direction: column;
    }
    .el-carousel {
      padding: 20px;
    }
    .el-carousel__item h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 80px;
      margin: 0;
      text-align: center;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
</style>