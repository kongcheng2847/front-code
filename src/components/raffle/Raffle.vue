<template>
  <div class="container">
    <div v-for="item in awards" :key="item.awardIndex" :class="{ active: activeIndex === item.awardIndex }">
      <template v-if="item.awardIndex==0">
        <el-button type="primary" icon="Plus" size="large" @click="start(item)" style="width: 50%; height: 40%;">幸运抽奖</el-button>
      </template>
      <template v-else>
        <span>{{ item.awardContent }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Raffle',
  data() {
    return {
      activeIndex: 1,
      awards: [
        {
          index: 1,
          content: '谢谢惠顾'
        },
        {
          index: 2,
          content: '一等奖'
        },
        {
          index: 3,
          content: '谢谢惠顾'
        },
        {
          index: 8,
          content: '谢谢惠顾'
        },
        {
          index: 0,
          content: '幸运抽奖'
        },
        {
          index: 4,
          content: '三等奖'
        },
        {
          index: 7,
          content: '谢谢惠顾'
        },
        {
          index: 6,
          content: '二等奖'
        },
        {
          index: 5,
          content: '谢谢惠顾'
        }
      ],
      cicles: 0, //定义圈数
      time: 400 //定义速度
    };
  },
  mounted() {
    this.initAwards();
  },
  methods: {
    async initAwards() {
      let res = await this.$Http('/raffle/awardConfig/list', 'post');
      console.log(res);
      this.awards = res.data;
    },
    start(item) {
      if (item.awardIndex !== 0) return;
      //轮盘转动
      //   const selectIndex = 2;
      //定义一个随机数
      const selectIndex = Math.round(Math.random() * 7) + 1;

      this.startView(selectIndex, () => {
        //停止时的回调函数
        const result = this.awards.find(item => {
          return item.awardIndex === selectIndex;
        });
        //输出结果
        console.log('当前抽中:' + result.awardContent);
        this.$Http('/raffle/awardRecords/save', 'post', {
          awardId: result.id,
          awardContent: result.awardContent
        });
      });
    },
    startView(selectIndex, fn) {
      if (this.activeIndex === selectIndex && this.cicles < 4) {
        //圈数+1
        this.cicles += 1;
        //速度加快
        this.time -= 100;
      }
      if (this.activeIndex === selectIndex && this.cicles >= 4) {
        this.cicles += 1;
        //圈数>4时速度减慢
        this.time += 100;
      }
      if (this.cicles > 7 && this.activeIndex === selectIndex) {
        //圈数为8时停止
        fn();
        return;
      }
      let timer = setTimeout(() => {
        //定时器轮询
        if (this.activeIndex < 8) {
          this.activeIndex++;
        } else {
          this.activeIndex = 1;
        }
        //每走一步清除定时器再递归调用，实现连续效果
        clearTimeout(timer);
        this.startView(selectIndex, fn);
      }, this.time);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.container div {
  margin: 10px;
  width: 30%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #f2f6fc;
}
.container div span {
  //   margin: 0 auto;
  font-size: 30px;
}
.active {
  background-color: #e6a23c !important;
}
</style>