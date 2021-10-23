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
import VueClipboard from "vue-clipboard2";
import { Progress, Divider, List, Overlay, Dialog, Toast, Loading } from "vant";
import { mapState } from "vuex";
Vue.use(VueLazyLoad);
Vue.use(Progress);
Vue.use(Divider);
Vue.use(List);
Vue.use(Overlay);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(VueClipboard);
Vue.config.productionTip = false;
Vue.mixin({
  computed: {
    ...mapState({ address: (state) => state.common.address }),
    getAddress() {
      return this.address;
    },
  },
});

// if (process.env.NODE_ENV === "development") {
//   const VConsole = require("vconsole");
//   new VConsole();
// }
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
