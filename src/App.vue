<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import tp from "tp-js-sdk";
import { isWhichPlat } from "./utils/wallet";
import { testAddress } from "./config/constants";
export default {
  async mounted() {
    if (isWhichPlat()) {
      const res = await tp.getCurrentWallet();
      this.$store.commit("SET_ADDRESS", res.data.address);
    } else {
      this.$store.commit("SET_ADDRESS", testAddress);
    }
  },
};
</script>
<style lang="less"></style>
