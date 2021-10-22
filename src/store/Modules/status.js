export default {
  state: {
    isEditor: false,
  },
  getters: {},
  actions: {},
  mutations: {
    SET_EDITOR(state, status) {
      state.isEditor = status;
    },
  },
};
