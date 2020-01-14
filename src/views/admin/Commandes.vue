<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <commande-list></commande-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommandeList from "./../../components/admin/CommandeListe";
export default {
  components: { CommandeList }
};
</script>

<style scoped></style>
