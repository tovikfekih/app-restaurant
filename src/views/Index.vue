<template>
  <div>
    banjour
  </div>
</template>

<script>
import RestaurantServices from "./../services/RestaurantServices";
export default {
  mounted() {
    RestaurantServices.list(this);
  }
};
</script>

<style scoped></style>
