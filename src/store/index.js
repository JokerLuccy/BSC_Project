import Vue from "vue";
import Vuex from "vuex";
import status from "./Modules/status";
import common from "./Modules/common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { status, common },
});
