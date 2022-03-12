<template>
  <v-container fluid>
    <v-tabs v-model="tab" background-color="#232526" dark grow>
      <v-tab v-for="(item, i) in items" :key="i">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in items" :key="i">
        <v-card flat dark>
          <v-card-text>
            <v-container fluid>
              <v-row v-if="item.content === 'Registros'">
                <v-col>
                  <TableRegister />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  name: "registers",
  components: {
    TableRegister: () => import("@/components/TableRegister"),
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: "Registros", content: "Registros" },
        { tab: "Cadastrar", content: "Cadastrar" },
      ],
    };
  },
};
</script>

<style></style>
