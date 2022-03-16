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
                  :rules="fieldRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.estado"
                  label="Estado"
                  :rules="fieldRules"
                  :items="estados"
                  :placeholder="editedItem.estado"
                  persistent-placeholder
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.email"
                  label="E-mail"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.number="editedItem.idade"
                  label="Idade"
                  :rules="idadeRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.pesticida"
                  :placeholder="editedItem.pesticida"
                  persistent-placeholder
                  label="Pesticida"
                  :rules="fieldRules"
                  :items="pesticidas"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="
            updateFarmer();
            snackbar = true;
          "
        >
          Atualizar
        </v-btn>
        <v-btn class="ml-3" @click="closeDialog"> Cancelar </v-btn>
        <v-snackbar v-model="snackbar" timeout="3000">
          {{ status }}
          <template #action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
              >Fechar</v-btn
            >
          </template>
        </v-snackbar>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Axios from "axios";
export default {
  props: ["value"],
  data() {
    return {
      snackbar: false,
      status: "",
      fieldRules: [(v) => !!v || "Campo obrigatório"],
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      idadeRules: [
        (v) => !!v || "Campo Idade é obrigatório",
        (v) => {
          if (parseInt(v)) {
            return true;
          } else {
            return "Somente Números";
          }
        },
      ],
      pesticidas: [
        "Algicidas",
        "Antimicrobianos",
        "Biopesticidas",
        "Fungicidas",
        "Herbicidas",
        "Inseticidas",
        "Moluscidas",
        "Pesticidas",
        "Rodenticidas",
      ],
      estados: [
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins",
      ],
    };
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
        .then((res) => {
          this.status = res.data;
          const editedIndex = this.$store.state.farmes.indexOf(
            this.$store.state.farmes.filter(
              (farmer) => farmer.id == itemsToBeEdited.id
            )[0]
          );
          this.$store.state.farmes[editedIndex] = itemsToBeEdited;
        })
        .catch((err) => {
          this.status = "Erro para atualizar";
          res.send(err);
        });
      const id = setTimeout(() => {
        this.closeDialog();
        clearInterval(id);
      }, 3000);
    },
  },
};
</script>

<style></style>
