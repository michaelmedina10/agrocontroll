import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";

Vue.config.productionTip = false;
// Só teste de autenticacao, apagar depois
// Axios.defaults.headers.common["Authorization"] =
//   "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjUsIm5hbWUiOiJtaWNoYWVsIiwiZW1haWwiOiJtaWNoYWVsLm1lZGluYUBnbWFpbC5jb20iLCJhZG1pbiI6IjEiLCJpYXQiOjE2NDgyMTAxNjcsImV4cCI6MTY0ODQ2OTM2N30.ZLDJM_eT6uqcp7K4lWyMJ0OkLmRZh3CcGuAbkHBe_Tc";
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
