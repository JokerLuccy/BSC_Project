import { userInfo } from "../../server";

export default {
  state: {
    address: "",
    userInfo: {},
  },
  getters: {},
  actions: {
    async getUserInfo({ commit }, { address }) {
      const data = await userInfo(address);
      commit("SET_USERINFO", data);
    },
  },
  mutations: {
    SET_ADDRESS(state, address) {
      state.address = address;
    },
    SET_USERINFO(state, data) {
      state.userInfo = data;
    },
  },
};
