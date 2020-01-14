<template>
  <v-card
    :to="'/restaurant/' + restaurant._id"
    :loading="loading"
    class="mx-auto"
    max-width="374"
    v-if="restaurant"
  >
    <v-img
      height="150"
      :src="
        'https://loremflickr.com/320/240/restaurant/all?lock=' +
          restaurant._id.replace(/\D+/g, '')
      "
    ></v-img>

    <v-card-title class="pb-0">{{ restaurant.name }}</v-card-title>

    <v-card-text class="pb-0">
      <v-row align="center" class="mx-0">
        <v-rating
          :value="GradeMoyen"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <div class="grey--text ml-4">
          {{ GradeMoyen }} ({{ restaurant.grades.length }})
        </div>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span style="text-transform:capitalize;">
            Cuisine : {{ restaurant.cuisine }} </span
          ><br />
          <span v-if="restaurant.address" style="text-transform:capitalize;"
            >Address : <br />
            {{ restaurant.address.street }}, {{ restaurant.borough }},
            {{ restaurant.address.building }},
            {{ restaurant.address.zipcode }}
          </span>
        </v-col>
      </v-row>

      <div>{{ restaurant.description }}</div>
    </v-card-text>

    <v-card-actions class="text-center">
      <v-btn
        color="deep-purple accent-4"
        text
        :to="'/restaurant/' + restaurant._id"
        >Consulter</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    restaurant: {
      type: Object,
      default: {}
    }
  },
  data: () => ({
    loading: false,
    selection: 1
  }),
  computed: {
    GradeMoyen() {
      return _.round(_.mean(_.map(this.restaurant.grades || [], "grade")), 1);
    }
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    }
  }
};
</script>

<style scoped></style>
