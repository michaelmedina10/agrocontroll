<template>
  <v-data-table
    :headers="headers"
    :items="registers"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Registros</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Novo Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.nome"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.estado"
                      label="Estado"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.idade"
                      label="Idade"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.pesticida"
                      label="Pesticida"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Você tem certeza que deseja deletar esse item</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.acao`]="{ item }">
      <v-row class="py-1">
        <v-col cols="12" md="6" class="pa-0">
          <v-btn small color="warning">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="pa-0">
          <v-btn small color="error">
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { baseURL } from "@/global";
import Axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nome", value: "nome" },
      { text: "Estado", value: "estado" },
      { text: "E-mail", value: "email" },
      { text: "Idade", value: "idade" },
      { text: "Pesticida", value: "pesticida", sortable: false },
      { text: "Ações", value: "acao", sortable: false },
    ],
    registers: [],
    editedIndex: -1,
    editedItem: {
      nome: "",
      estado: "",
      email: "",
      idade: 0,
      Pesticida: "",
    },
    defaultItem: {
      id: "",
      nome: "",
      estado: "",
      email: "",
      idade: 0,
      pesticida: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      console.log(baseURL);
      Axios.get(`${baseURL}/agrousers/`)
        .then((res) => (this.registers = res.data))
        .then(console.log)
        .catch((err) => res.send(err));
    },

    editItem(item) {
      this.editedIndex = this.registers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.registers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      Axios.delete(`${baseURL}/agrousers/${this.editedIndex}`)
        .then((_) => console.log("Deletado com Sucesso"))
        .catch((err) => res.send(err));
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.registers[this.editedIndex], this.editedItem);
      } else {
        this.registers.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
