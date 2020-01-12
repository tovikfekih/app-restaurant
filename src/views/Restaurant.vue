<template>
  <div>
    <v-parallax v-if="restaurant" height="280" class="pa-0" style="position:relative;" :src="photo">
      <div class="overlay" />
    </v-parallax>
    <v-container style="margin-top:-150px;z-index:10;position:relative">
      <v-row>
        <v-col cols="8" class="offset-2">
          <div class="display-2 white--text">
            {{restaurant.name}}
            span
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="offset-2">
          <v-card>
            <v-card-title>Hello</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <div class="headline">Evaluations :</div>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      cols="12"
                      class="pt-0 pb-0"
                      v-for="(g, index) in restaurant.grades"
                      :key="index"
                    >
                      <restaurant-evaluation :id="index+'-'+restaurant._id" :grade="g" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
import RestaurantEvaluation from "./../components/RestaurantEvaluation";
import RestaurantListe from "./../components/RestaurantListe";
import RestaurantServices from "./../services/RestaurantServices";
export default {
  components: {
    RestaurantListe,
    RestaurantEvaluation
  },
  data() {
    return {
      restaurant: {
        _id: null
      },
      initiated: false,
      loading: false
    };
  },
  beforeMount() {
    let id = this.$route.params.id;
    this.restaurant._id = id;
    this.getRestaurant(id);
  },
  computed: {
    photo() {
      return (
        "https://loremflickr.com/1200/800/restaurant,food/all?lock=" +
        this.restaurant._id.replace(/\D+/g, "")
      );
    }
  },
  methods: {
    getRestaurant(id = null) {
      this.loading = true;
      RestaurantServices.get(this, id)
        .then(r => {
          this.restaurant = r.restaurant;
        })
        .finally(() => {
          this.loading = false;
          if (!this.initiated) this.initiated = true;
        });
    }
  }
};
</script>

<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  opacity: 0.6;
  position: absolute;
  left: 0;
  background: #36d1dc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #5b86e5,
    #36d1dc
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #5b86e5,
    #36d1dc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
