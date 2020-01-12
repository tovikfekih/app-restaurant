<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="restaurants"
    :server-items-length="pagination.totalItems"
    :options.sync="pagination"
    :footer-props="{
      'items-per-page-options': pagination.rowsPerPageItems
    }"
    class="elevation-1"
  >
    <template v-slot:item.action="{ item }">
      <v-btn color="blue lighten-2 white--text" x-small fab @click="edit(item)" class="mr-3">
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
      <v-btn color="red white--text" x-small fab @click="remove(item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import RestaurantServices from "./../../services/RestaurantServices";
export default {
  props: {
    admin: {
      type: Boolean,
      default: false
    },
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
      loading: true,
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
          this.loading = false;
          this.restaurants = r.data;
          this.pagination.totalItems = r.count;
        });
      },
      deep: true
    }
  },
  mounted() {
    if (this.admin)
      this.headers.push({
        text: "Actions",
        align: "left",
        value: "action"
      });
  }
};
</script>

<style scoped></style>
