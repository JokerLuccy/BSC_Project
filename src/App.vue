<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import tp from "tp-js-sdk";
import { isWhichPlat } from "./utils/wallet";
import { testAddress } from "./config/constants";
import { checkRegister } from "./server";
import { Dialog } from "vant";
export default {
  methods: {
    beforeClose(action, done) {
      if (action === "confirm") {
        done();
        this.$router.push("/login");
      } else {
        done();
      }
    },
  },
  async mounted() {
    if (isWhichPlat()) {
      const res = await tp.getCurrentWallet();
      this.$store.commit("SET_ADDRESS", res.data.address);
      const isRegister = await checkRegister(res.data.address);
      if (
        !isRegister &&
        this.$route.path !== "/login" &&
        this.$route.path !== "/register"
      ) {
        Dialog.alert({
          title: "提示",
          message: "该账号未注册",
          confirmButtonText: "确认",
          beforeClose: this.beforeClose,
        });
      }
    } else {
      this.$store.commit("SET_ADDRESS", testAddress);
    }
  },
};
</script>
<style lang="less"></style>
