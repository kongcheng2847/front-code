<template>
  <div class="raffle-group">
    <Raffle2></Raffle2>
  </div>
</template>
  
  <script>
import Raffle2 from '@/components/raffle/Raffle.vue';

export default {
  name: 'ControlView',
  data() {
    return {};
  },
  components: {
    Raffle2
  }
};
</script>
  
  <style lang="scss" scoped>
.raffle-group {
  height: 100%;
}
</style>