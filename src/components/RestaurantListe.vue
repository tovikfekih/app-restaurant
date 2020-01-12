<template>
  <v-container fluid class="mt-5" style="position:relative">
    <v-row v-if="initiated">
      <v-col cols="4" v-for="(r, index) in restaurants" :key="index">
        <restaurant-card :restaurant="r" />
      </v-col>
      <v-overlay style="position:absolute;" color="white" :value="loading">
        <v-progress-circular color="blue" indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-row>
    <v-row v-else>
      <v-col cols="4">
        <v-sheet :color="`grey lighten-3`" class="pa-1">
          <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet :color="`grey lighten-3`" class="pa-1">
          <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet :color="`grey lighten-3`" class="pa-1">
          <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <v-pagination
            :disabled="!initiated || loading"
            v-model="pagination.page"
            :length="pagination.totalItems"
            :total-visible="6"
            circle
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RestaurantCard from "./RestaurantCard";
import RestaurantServices from "./../services/RestaurantServices";
export default {
  components: {
    RestaurantCard
  },
  props: {
    filtres: {
      type: Object,
      default: () => {
        return {
          nom: ""
        };
      }
    }
  },
  data() {
    return {
      initiated: false,
      loading: true,
      restaurants: [],
      pagination: {
        page: 1,
        itemsPerPage: 6,
        totalItems: 0
      }
    };
  },
  watch: {
    filtres: {
      handler() {
        this.loading = true;
        this.pagination.page = 1;
        this.getRestaurants();
      },
      deep: true
    },
    pagination: {
      handler() {
        this.loading = true;
        this.getRestaurants();
      },
      deep: true
    }
  },
  methods: {
    getRestaurants() {
      RestaurantServices.list(this, this.filtres, this.pagination)
        .then(r => {
          this.loading = false;
          this.restaurants = r.data;
          this.pagination.totalItems = r.count;
        })
        .finally(() => {
          if (!this.initiated) this.initiated = true;
        });
    }
  },
  mounted() {
    this.getRestaurants();
  }
};
</script>

<style scoped></style>
