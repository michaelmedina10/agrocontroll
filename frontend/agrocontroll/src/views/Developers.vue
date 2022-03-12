<template>
  <v-container fluid>
    <Developer />
  </v-container>
</template>

<script>
export default {
  name: "Developers",
  components: {
    Developer: () => import("@/components/DevelopersCard"),
  },
};
</script>

<style></style>
