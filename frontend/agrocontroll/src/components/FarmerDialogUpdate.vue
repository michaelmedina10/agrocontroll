<template>
  <v-dialog v-model="value" max-width="800px" persistent>
    <v-card>
      <v-card-title>
        <h1>Atualizar Registro</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.nome"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.estado"
                  label="Estado"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.email"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="editedItem.idade"
                  label="Idade"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.pesticida"
                  label="Pesticida"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateFarmer"> Atualizar </v-btn>
        <v-btn class="ml-3" @click="closeDialog"> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Axios from "axios";
export default {
  props: ["value"],
  data() {
    return {};
  },
  computed: {
    editedItem() {
      return { ...this.$store.state.farmer };
    },
  },
  methods: {
    closeDialog() {
      this.$emit("input", false);
    },
    updateFarmer() {
      const itemsToBeEdited = { ...this.editedItem };
      itemsToBeEdited.idade = parseInt(itemsToBeEdited.idade);
      Axios.put(
        `${process.env.VUE_APP_BASEURL}/agrousers/${itemsToBeEdited.id}`,
        itemsToBeEdited
      )
        .then((_) => {
          const editedIndex = this.$store.state.farmes.indexOf(
            this.$store.state.farmes.filter(
              (farmer) => farmer.id == itemsToBeEdited.id
            )[0]
          );
          this.$store.state.farmes[editedIndex] = itemsToBeEdited;
        })
        .catch((err) => res.send(err));
      this.closeDialog();
    },
  },
};
</script>

<style></style>
