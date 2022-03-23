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
            :placeholder="userDefault.admin"
            v-model="userDefault.admin"
            :rules="fieldRules"
            :items="adminLevel"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-if="register"
            label="Senha"
            type="password"
            v-model="userDefault.senha"
            :rules="fieldRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row class="ma-2">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn v-if="register" large color="primary" @click="registerUser">
          Cadastrar</v-btn
        >
        <v-btn v-else large color="error" @click="update"> Atualizar </v-btn>
        <v-btn large class="ml-2" @click="cleanFields"> Limpar</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ma-3">
      <v-container fluid class="grey lighten-5">
        <v-data-table class="ma-0" :headers="headers" :items="userList">
          <template #[`item.acao`]="{ item }">
            <v-btn small fab color="warning" @click="loadUserToUpdate(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-dialog
              v-model="dialog"
              max-width="500px"
              persistent
              :retain-focus="false"
            >
              <template #activator="{ on }">
                <v-btn
                  small
                  fab
                  color="error"
                  class="ml-3"
                  v-on="on"
                  @click="openDialog(item)"
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
                  <v-btn color="primary" @click="deleteUser"> Remover </v-btn>
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
      register: true,
      user: "",
      userDefault: {
        id: null,
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
      this.register = true;
      this.userDefault = {};
    },
    openDialog(user) {
      this.dialog = true;
      this.user = { ...user };
    },

    deleteUser() {
      Axios.delete(`${process.env.VUE_APP_BASEURL}/users/${this.user.id}`)
        .then((_) => {
          const editedIndex = this.userList.indexOf(
            this.userList.filter((user) => user.id === this.user.id)[0]
          );
          console.log(editedIndex);
          this.userList.splice(editedIndex);
        })
        .catch((err) => console.log(err));
      this.closeDialog();
    },
    async loadUserToUpdate(user) {
      await Axios.get(`${process.env.VUE_APP_BASEURL}/users/${user.id}`)
        .then((res) => (this.user = res.data))
        .catch((err) => res.send(err));
      this.userDefault.id = this.user.id;
      this.userDefault.nome = this.user.nome;
      this.userDefault.email = this.user.email;
      this.userDefault.admin = this.user.admin;
      this.userDefault.senha = this.user.senha;
      this.register = false;
      console.log(this.userDefault);
    },

    update() {
      Axios.put(
        `${process.env.VUE_APP_BASEURL}/users/${this.user.id}`,
        this.userDefault
      )
        .then((res) => {
          const editedIndex = this.userList.indexOf(
            this.userList.filter((user) => user.id == this.user.id)[0]
          );
          this.userDefault.admin = toString(this.userDefault.admin);
          this.loadUsers();
        })
        .catch((err) => {
          console.log(err);
        });
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
