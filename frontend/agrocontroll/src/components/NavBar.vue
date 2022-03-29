<template>
  <nav>
    <v-app-bar app clipped-left height="50" flat class="tollbar">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="white--text"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <router-link to="/" class="router-link">
        <v-toolbar-title>
          <v-icon large left class="white--text">mdi-tractor</v-icon>
          <span class="subtitle-1 grey--text text--darken-1">Agro</span>
          <span class="h1 grey--text text-lighten-5">Controll</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      color="green darken-1"
      dark
      v-model="drawer"
      app
      clipped
    >
      <template v-slot:prepend>
        <v-row class="ma-5 d-flex flex-column align-center">
          <v-avatar size="80" color="white"
            ><span class="title">Logo</span></v-avatar
          >
          <span class="mt-2 white--text subtitle-1">AgroControll</span>
        </v-row>
        <v-divider></v-divider>
      </template>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.title"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider color="#E8F5E9"></v-divider>
        <v-menu :offset-x="true">
          <template #activator="{ on, attrs }">
            <v-btn text class="ma-4" v-on="on" v-bind="attrs">
              <span class="px-2">{{ user.name }}</span>
              <v-icon large right>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(link, i) in computedUserLinks"
              :key="i"
              router
              :to="link.route"
              @click="logout(link.title)"
            >
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
const { VUE_APP_USERKEY } = process.env;
export default {
  name: "NavBar",
  data() {
    return {
      user: this.$store.state.user,
      links: [
        { icon: "mdi-home", title: "Home", route: "/" },
        { icon: "mdi-account", title: "Registers", route: "/registers" },
        { icon: "mdi-widgets", title: "DashBoard", route: "/dashboard" },
        {
          icon: "mdi-account-supervisor-circle-outline",
          title: "Developers",
          route: "/developers",
        },
      ],
      drawer: true,
      userLinks: [
        { icon: "mdi-cog", title: "Admin", route: "/admin" },
        { icon: "mdi-logout", title: "Log Out", route: "/signin" },
      ],
    };
  },
  methods: {
    logout(title) {
      if (title == "Log Out") {
        localStorage.removeItem(VUE_APP_USERKEY);
        this.$store.commit("setUser", null);
      }
    },
  },
  computed: {
    computedUserLinks() {
      if (this.user.admin == "1") return this.userLinks;
      return this.userLinks.filter((link) => link.title != "Admin");
    },
  },
};
</script>

<style>
.tollbar {
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.router-link {
  text-decoration: none;
}
</style>
