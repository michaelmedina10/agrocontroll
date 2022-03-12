<template>
  <div>
    <v-data-table :headers="headers" :items="farmes">
      <template #[`item.acao`]="{ item }">
        <v-btn small fab color="warning" @click="update(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn small fab color="error" class="ml-3" @click="remove(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <FarmerDialog v-model="dialog" />
  </div>
</template>

<script>
import Axios from "axios";
export default {
  components: {
    FarmerDialog: () => import("@/components/FarmerDialog.vue"),
  },
  data() {
    return {
      dialog: false,
      headers: [
        { text: "Nome", value: "nome" },
        { text: "Estado", value: "estado" },
        { text: "E-mail", value: "email" },
        { text: "Idade", value: "idade" },
        { text: "Pesticida", value: "pesticida" },
        { text: "Ações", value: "acao", sortable: false },
      ],
      farmes: [],
      farmer: {},
    };
  },
  methods: {
    loadFarmes() {
      Axios.get(`${process.env.VUE_APP_BASEURL}/agrousers`)
        .then((res) => (this.farmes = res.data))
        .catch((err) => res.send(err));
    },

    update(farmer) {
      this.farmer = farmer;
      this.dialog = true;
    },
    remove(farmer) {
      console.log("Removendo...");
    },
  },
  mounted() {
    this.loadFarmes();
  },
};
</script>

<style></style>

<!-- <FarmerDialog v-model="dialog">
      <template #item>Teste</template>
      <h1>ABCH1</h1>
    </FarmerDialog> -->
