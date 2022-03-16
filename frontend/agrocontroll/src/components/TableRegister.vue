<template>
  <div>
    <v-data-table :headers="headers" :items="farmesList">
      <template #[`item.acao`]="{ item }">
        <v-btn small fab color="warning" @click.stop="update(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          small
          fab
          color="error"
          class="ml-3"
          @click="DialogOfRemove(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <FarmerDialog v-model="dialog" />
    <FarmerDialogRemove v-model="dialogRemoveFarmer" />
  </div>
</template>

<script>
import Axios from "axios";
export default {
  components: {
    FarmerDialog: () => import("@/components/FarmerDialogUpdate.vue"),
    FarmerDialogRemove: () => import("@/components/FarmerDialogRemove.vue"),
  },
  data() {
    return {
      dialog: false,
      dialogRemoveFarmer: false,
      headers: [
        { text: "Nome", value: "nome" },
        { text: "Estado", value: "estado" },
        { text: "E-mail", value: "email" },
        { text: "Idade", value: "idade" },
        { text: "Pesticida", value: "pesticida" },
        { text: "Ações", value: "acao", sortable: false },
      ],
    };
  },
  methods: {
    loadFarmes() {
      Axios.get(`${process.env.VUE_APP_BASEURL}/agrousers`)
        .then((res) => (this.$store.state.farmes = res.data))
        .catch((err) => res.send(err));
    },

    update(farmer) {
      this.$store.state.farmer = farmer;
      this.dialog = true;
    },
    DialogOfRemove(farmer) {
      console.log("Removendo...");
      this.dialogRemoveFarmer = true;
      this.$store.state.farmer = farmer;
    },
  },
  mounted() {
    this.loadFarmes();
  },
  computed: {
    farmesList() {
      return this.$store.state.farmes;
    },
  },
  watch: {
    farmesList() {
      this.loadFarmes();
    },
  },
};
</script>

<style></style>

<!-- <FarmerDialog v-model="dialog">
      <template #item>Teste</template>
      <h1>ABCH1</h1>
    </FarmerDialog> -->
