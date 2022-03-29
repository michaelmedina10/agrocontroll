<template>
  <v-app>
    <NavBar v-if="this.$store.state.user" />
    <v-main class="grey lighten-5 main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Axios from "axios";
const { VUE_APP_BASEURL, VUE_APP_USERKEY } = process.env;
export default {
  name: "App",
  components: {
    NavBar: () => import("./components/NavBar.vue"),
  },
  data() {
    return {
      validatingToken: true,
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;
      const json = localStorage.getItem(VUE_APP_USERKEY);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "Signin" });
        return;
      }

      const res = await Axios.post(
        `${VUE_APP_BASEURL}/validateToken`,
        userData
      );
      if (res.data) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(VUE_APP_USERKEY);
        this.$router.push({ name: "Signin" });
      }

      this.validatingToken = false;
    },
  },
  created() {
    this.validateToken();
  },
};
</script>
<style>
.main {
  background: #232526; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #414345,
    #232526
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #414345,
    #232526
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
