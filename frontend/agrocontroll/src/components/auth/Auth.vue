<template>
  <div class="d-flex justify-center align-center auth-content">
    <v-card class="d-flex flex-column align-center pa-3" width="500px">
      <v-card-title>
        <v-icon class="display-1">mdi-tractor</v-icon>
        <span class="display-1 grey--text text--darken-1">Agro</span>
        <span class="display-1 grey--text text-lighten-5">Controll</span>
      </v-card-title>
      <v-card-text>
        <v-divider></v-divider>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="user.email"
                label="E-mail"
                required
                :rules="emailRules"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="user.senha"
                label="Senha"
                type="password"
                :rules="fieldRules"
                required
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" max-width="400px" width="400px" @click="signin">
          <v-icon left>mdi-login</v-icon>
          <span class="body-1">Entrar</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
const { VUE_APP_BASEURL, VUE_APP_USERKEY } = process.env;

export default {
  data() {
    return {
      user: {},
      fieldRules: [(v) => !!v || "Campo obrigatório"],
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
    };
  },
  methods: {
    signin() {
      try {
        if (this.$refs.form.validate()) {
          Axios.post(`${VUE_APP_BASEURL}/signin`, this.user)
            .then((res) => {
              this.$store.commit("setUser", res.data);
              localStorage.setItem(VUE_APP_USERKEY, JSON.stringify(res.data));
              this.$router.push({ path: "/" });
              this.$refs.form.reset();
            })
            .catch((err) => console.log(err));
        }
      } catch (error) {}
    },
  },
};
</script>

<style>
.auth-content {
  height: 100vh;
}
</style>
