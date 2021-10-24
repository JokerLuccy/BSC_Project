<template>
  <div class="home">
    <home-header />
    <introduce />
    <contract />
    <accounts />
    <!-- <browser /> -->
    <Footer />
    <notice />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Footer from "../../components/Footer.vue";
import HomeHeader from "../../components/HomeHeader.vue";
import Accounts from "./Accounts.vue";
// import Browser from "./Browser.vue";
import Contract from "./Contract.vue";
import Introduce from "./Introduce.vue";
import Notice from "./Notice.vue";
export default {
  components: {
    HomeHeader,
    Introduce,
    Contract,
    Accounts,
    Footer,
    Notice,
  },
  name: "Home",
  computed: {
    ...mapState({ userInfo: (state) => state.common.userInfo }),
  },
  methods: {
    ...mapActions(["getUserInfo"]),
  },
  async created() {
    await this.getUserInfo({ address: this.getAddress });
    if (!this.userInfo.hasPassword) this.$router.push("/set_pwd?type=0");
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
