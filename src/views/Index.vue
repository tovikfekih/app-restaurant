<template>
  <div>
    <restaurant-liste :filtres="filtres" />
  </div>
</template>

<script>
import RestaurantListe from "./../components/RestaurantListe";
import RestaurantServices from "./../services/RestaurantServices";
export default {
  components: {
    RestaurantListe
  },
  data() {
    return {
      filtres: {
        nom: "",
        type_cuisine: [],
        type_plats: []
      }
    };
  },
  mounted() {}
};
</script>

<style scoped></style>
