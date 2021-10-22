<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import tp from "tp-js-sdk";
export default {
  async mounted() {
    const res = await tp.getCurrentWallet();
    this.$store.commit("SET_ADDRESS", res.data.address);
  },
};
</script>
<style lang="less"></style>
