<template>
  <v-card>
    <v-card-title>
      <h1>Cadastrar</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="registerFarmer.nome"
                :rules="fieldRules"
                label="Nome"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="registerFarmer.estado"
                :rules="fieldRules"
                :items="estados"
                label="Estado"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="registerFarmer.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model.number="registerFarmer.idade"
                label="Idade"
                :rules="idadeRules"
                required
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6">
              <v-select
                v-model="registerFarmer.pesticida"
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
    <v-divider></v-divider>
    <v-card-actions class="ma-3">
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="
          register();
          snackbar = true;
        "
      >
        Cadastrar
      </v-btn>
      <v-btn color="error" @click="cleanForm" class="ml-3"> Limpar </v-btn>
      <v-snackbar v-model="snackbar">
        {{ status }}
        <template #action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
            >Fechar</v-btn
          >
        </template>
      </v-snackbar>
    </v-card-actions>
  </v-card>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      snackbar: false,
      registerFarmer: {
        nome: "",
        estado: "",
        email: "",
        idade: "",
        pesticida: "",
      },
      status: "",
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
    };
  },
  methods: {
    register() {
      this.registerFarmer.idade = parseInt(this.registerFarmer.idade);
      Axios.post(
        `${process.env.VUE_APP_BASEURL}/agrousers`,
        this.registerFarmer
      )
        .then((res) => {
          this.status = res.data;
          console.log(this.status);
        })
        .catch((_) => {
          const mensagem = "Erro ao Cadastrar!!!";
          this.status = mensagem;
          console.log(this.status);
        });
      this.cleanForm();
    },

    cleanForm() {
      this.registerFarmer = {};
    },
  },
};
</script>

<style></style>
