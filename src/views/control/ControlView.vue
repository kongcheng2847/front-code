<template>
  <div class="control-group">
    <Raffle></Raffle>
  </div>
</template>

<script>
import Raffle from '@/components/control/Raffle.vue';

export default {
  name: 'ControlView',
  data() {
    return {};
  },
  components: {
    Raffle
  }
};
</script>

<style lang="scss" scoped>
.control-group {
  height: 100%;
}
</style>