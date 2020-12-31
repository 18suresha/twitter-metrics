<template>
  <div>
    <h3>{{account}}</h3>
    <line-chart :data="allPoints[account]"></line-chart>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Chart",
  props: ["account"],
  computed: mapGetters(["allPoints"])
};
</script>

<style scoped>
div {
  margin-top: 40px;
  padding: 6px;
  border: #41b883 1px solid;
  border-radius: 10px;
}
</style>
