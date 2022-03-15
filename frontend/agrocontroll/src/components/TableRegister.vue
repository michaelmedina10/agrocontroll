<template>
  <div>
    <v-data-table :headers="headers" :items="farmesList">
      <template #[`item.acao`]="{ item }">
        <v-btn small fab color="warning" @click.stop="update(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-dialog
          v-model="dialogRemoveFarmer"
          max-width="500px"
          persistent
          :retain-focus="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              small
              fab
              color="error"
              class="ml-3"
              @click="DialogOfRemove(item)"
              v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h1>Remover Registro</h1>
            </v-card-title>
            <v-card-text>
              <span
                >O Registro com ID:{{ farmer.id }} Nome:{{ farmer.nome }} será
                removido</span
              >
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="remove"> Remover </v-btn>
              <v-btn class="ml-3" @click="dialogRemoveFarmer = false">
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      dialogRemoveFarmer: false,
      headers: [
        { text: "Nome", value: "nome" },
        { text: "Estado", value: "estado" },
        { text: "E-mail", value: "email" },
        { text: "Idade", value: "idade" },
        { text: "Pesticida", value: "pesticida" },
        { text: "Ações", value: "acao", sortable: false },
      ],
      farmer: {},
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
      this.farmer = farmer;
    },
    remove() {
      Axios.delete(
        `${process.env.VUE_APP_BASEURL}/agrousers/${this.farmer.id}`
      ).then((_) => {
        const editedIndex = this.$store.state.farmes.indexOf(
          this.$store.state.farmes.filter(
            (farmer) => farmer.id == this.farmer.id
          )[0]
        );
        this.$store.state.farmes.splice(editedIndex);
        this.dialogRemoveFarmer = false;
      });
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
