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
import { Progress, Divider } from "vant";
Vue.use(VueLazyLoad);
Vue.use(Progress);
Vue.use(Divider);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
