<template>
  <div class="home">
    <home-header />
    <introduce />
    <contract />
    <accounts />
    <browser />
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import HomeHeader from "../../components/HomeHeader.vue";
import Accounts from "./Accounts.vue";
import Browser from "./Browser.vue";
import Contract from "./Contract.vue";
import Introduce from "./Introduce.vue";
export default {
  components: { HomeHeader, Introduce, Contract, Accounts, Browser, Footer },
  name: "Home",
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
