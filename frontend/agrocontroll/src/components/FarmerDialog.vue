<template>
  <v-dialog v-model="value">
    <v-card>
      <v-card-title>
        <h1>Atualizar Registro</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        Formulário
        <slot name="item"></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary"> Atualizar </v-btn>
        <v-btn class="ml-3" @click="closeDialog"> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["value"],
  methods: {
    closeDialog() {
      this.$emit("input", false);
    },
  },
};
</script>

<style></style>
