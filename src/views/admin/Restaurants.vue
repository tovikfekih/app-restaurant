<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <restaurant-liste admin />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import RestaurantListe from "./../../components/admin/RestaurantListe";
export default {
  components: {
    RestaurantListe
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style scoped></style>
