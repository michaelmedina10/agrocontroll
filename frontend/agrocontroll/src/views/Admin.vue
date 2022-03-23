<template>
  <v-container fluid class="grey lighten-5">
    <v-form>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Nome"
            v-model="userDefault.nome"
            :rules="fieldRules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="E-mail"
            v-model="userDefault.email"
            :rules="emailRules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Admin"
            v-model="userDefault.admin"
            :rules="fieldRules"
            :items="adminLevel"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Senha"
            v-model="userDefault.senha"
            :rules="fieldRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row class="ma-2">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn large color="primary" @click="registerUser"> Cadastrar</v-btn>
        <v-btn large class="ml-2"> Limpar</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ma-3">
      <v-container fluid class="grey lighten-5">
        <v-data-table class="ma-0" :headers="headers" :items="userList">
          <template #[`item.acao`]="{ item }">
            <v-btn small fab color="warning">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
              <template #activator="{ on }">
                <v-btn
                  small
                  fab
                  color="error"
                  class="ml-3"
                  v-on="on"
                  @click="deleteUser(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title><h1>Remover Usuários</h1></v-card-title>
                <v-card-text>
                  <h2>Tem certeza que deseja excluir esse usuário?</h2>
                  <span>Exclusões não podem ser desfeitas</span>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="remove"> Remover </v-btn>
                  <v-btn class="ml-3" @click="closeDialog"> Cancelar </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      userDefault: {
        nome: "",
        email: "",
        admin: "",
        senha: "",
      },
      fieldRules: [(v) => !!v || "Campo obrigatório"],
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      adminLevel: [1, 2, 3],
      headers: [
        { text: "ID", value: "id" },
        { text: "Nome", value: "nome" },
        { text: "E-mail", value: "email" },
        { text: "Admin", value: "admin" },
        { text: "Ação", value: "acao" },
      ],
      userList: [],
    };
  },
  methods: {
    loadUsers() {
      Axios.get(`${process.env.VUE_APP_BASEURL}/users`)
        .then((res) => (this.userList = res.data))
        .catch((err) => res.send(err));
    },
    registerUser() {
      try {
        console.log(this.userDefault);
        Axios.post(`${process.env.VUE_APP_BASEURL}/users`, this.userDefault)
          .then((res) => {
            console.log("Cadastrado com sucesso");
            this.loadUsers();
            this.cleanFields();
          })
          .catch((err) => console.log(err));
      } catch (error) {}
    },
    cleanFields() {
      this.userDefault = {};
    },

    deleteUser(user) {
      const itemToBeDeleted = { ...user };
      console.log(itemToBeDeleted);
      console.log(itemToBeDeleted.id);
      Axios.delete(`${process.env.VUE_APP_BASEURL}/users/${itemToBeDeleted.id}`)
        .then((_) => console.log("Deletado com Sucesso"))
        .catch((err) => console.log(err));
      this.loadUsers();
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style></style>
