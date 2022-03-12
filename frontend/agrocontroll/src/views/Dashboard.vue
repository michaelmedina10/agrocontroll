<template>
  <v-container>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="warning" v-bind="attrs" v-on="on">Teste</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h1 class="text-h5">Atualizando Registros</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" sm="8" md="6" xl="3">
                <v-text-field
                  v-model="nome"
                  :counter="20"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="6" xl="3">
                <v-text-field
                  v-model="estado"
                  :counter="20"
                  label="Estado"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="12" xl="3">
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="4" xl="3">
                <v-text-field
                  v-model="idade"
                  label="Idade"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8" xl="3">
                <v-text-field
                  v-model="pesticida"
                  label="Pesticida"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-row justify="end">
            <v-btn color="primary" class="ma-2" large>
              <span>Atualizar</span>
            </v-btn>
            <v-btn color="error" class="ma-2" large @click="dialog = false">
              <span>Fechar</span>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      nome: "",
      idade: 0,
      email: "",
    };
  },
};
</script>

<style></style>
