import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      farmer: {},
      farmes: [],
      user: null,
    };
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        Axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
      } else {
        delete Axios.defaults.headers.common["Authorization"];
      }
    },
  },
  actions: {},
  modules: {},
});
