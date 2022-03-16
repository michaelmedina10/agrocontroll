<template>
  <v-dialog v-model="value" max-width="500px">
    <v-card>
      <v-card-title><h1>Remover Registros</h1></v-card-title>
      <v-card-text>
        <h2>Tem certeza que deseja excluir esse registro?</h2>
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

<script>
import Axios from "axios";
export default {
  props: ["value"],
  computed: {
    editedItem() {
      return { ...this.$store.state.farmer };
    },
  },
  methods: {
    closeDialog() {
      this.$emit("input", false);
    },
    remove() {
      const itemToBeDeleted = { ...this.editedItem };
      Axios.delete(
        `${process.env.VUE_APP_BASEURL}/agrousers/${itemToBeDeleted.id}`
      ).then((_) => {
        const editedIndex = this.$store.state.farmes.indexOf(
          this.$store.state.farmes.filter(
            (farmer) => farmer.id == itemToBeDeleted.id
          )[0]
        );
        this.$store.state.farmes.splice(editedIndex);
        this.closeDialog();
      });
    },
  },
};
</script>

<style></style>
