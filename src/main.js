import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "reset-css";
import "./main.css";
import "nprogress/nprogress.css";
import "vant/lib/index.css";
import "./assets/icons/iconfont.css";
import "animate.css";
import VueLazyLoad from "vue-lazyload";
import VConsole from "vconsole";
import { Progress, Divider, List, Overlay, Dialog, Toast } from "vant";
import { mapState } from "vuex";
Vue.use(VueLazyLoad);
Vue.use(Progress);
Vue.use(Divider);
Vue.use(List);
Vue.use(Overlay);
Vue.use(Dialog);
Vue.use(Toast);
Vue.config.productionTip = false;
Vue.mixin({
  computed: {
    ...mapState({ address: (state) => state.common.address }),
    getAddress() {
      return this.address;
    },
  },
});
new VConsole();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
