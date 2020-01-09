<template>
  <v-data-table
    :headers="headers"
    :items="restaurants"
    :server-items-length="pagination.totalItems"
    :options.sync="pagination"
    :footer-props="{
      'items-per-page-options': pagination.rowsPerPageItems
    }"
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
import RestaurantServices from "./../services/RestaurantServices";
export default {
  props: {
    filtres: {
      type: Object,
      default: () => {
        return {
          name: "",
          types_cuisine: [],
          types_plats: []
        };
      }
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Nom du restaurant",
          align: "left",
          sortable: false,
          value: "name"
        }
      ],
      restaurants: [],
      pagination: {
        page: 1,
        itemsPerPage: 5,
        totalItems: 0,
        rowsPerPageItems: [5, 10, 20, 30]
      }
    };
  },
  watch: {
    pagination: {
      handler() {
        this.loading = true;
        RestaurantServices.list(this, this.filtres, this.pagination).then(r => {
          this.restaurants = r.data;
          this.pagination.totalItems = r.count;
        });
      },
      deep: true
    },
    mounted() {
      RestaurantServices.list(this, this.filtres, this.pagination).then(r => {
        this.restaurants = r.data;
        this.pagination.totalItems = r.count;
      });
    }
  }
};
</script>

<style scoped></style>
