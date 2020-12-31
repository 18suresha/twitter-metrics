<template>
  <div>
    <Chart v-for="account in accounts" :key="account" v-bind:account="account" />
  </div>
</template>

<script>
import Chart from './Chart.vue'
export default {
  name: "Charts",
  components: {
      Chart
  },
  data() {
    return {
      accounts: []
    };
  },
  created() {
    this.accounts = [ 'NASA', 'BarackObama', 'Illinois_Alma', 'CBS'];
  }
};
</script>

<style scoped>

</style>
