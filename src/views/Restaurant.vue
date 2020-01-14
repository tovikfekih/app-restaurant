<template>
  <div>
    <v-parallax
      v-if="restaurant"
      height="230"
      class="pa-0"
      style="position:relative;"
      :src="photo"
    >
      <div class="overlay" />
      <!-- <svg
        style="position: absolute;
    bottom: -80px;
    left: 0;"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="white"
          fill-opacity="1"
          d="M0,192L80,202.7C160,213,320,235,480,224C640,213,800,171,960,160C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg> -->
    </v-parallax>
    <v-container style="margin-top:-120px;z-index:10;position:relative">
      <v-row>
        <v-col cols="8" class="offset-2">
          <v-row>
            <v-col
              ><div class="display-2 white--text">
                {{ restaurant.name }}
              </div>
              <div class="test">Addresse</div>
            </v-col>
            <v-col class="text-right">
              <span class="white--text ml-4" style="font-size:20px;">
                {{ GradeMoyen }}
                <span v-if="restaurant.grades"
                  >({{ restaurant.grades.length }})</span
                >
              </span>
              <v-rating
                :value="GradeMoyen"
                half-increments
                dense
                dark
                readonly
                background-color="#eee"
                size="25"
              ></v-rating>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="offset-2" v-if="restaurant">
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-text
                  v-if="restaurant.address"
                  class="pa-0"
                  style="height:160px;overflow: hidden;"
                >
                  <restaurant-map :localisation="restaurant.address.coord" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-card-title>La carte</v-card-title>
                <v-card-text>
                  <restaurant-plat
                    v-for="(plat, index) in restaurant.carte"
                    :key="index"
                    :id="index"
                    :plat="plat"
                  />
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-title class="pb-0">Les menus</v-card-title>
                <v-card-text class="pt-0">
                  <v-tabs v-model="MenuTab">
                    <v-tab
                      v-for="(menu, index) in restaurant.menus"
                      :key="index"
                      :href="`#tab-${index}`"
                      >{{ menu.name }}</v-tab
                    >
                    <v-tab-item
                      class="pt-3"
                      v-for="(menu, index) in restaurant.menus"
                      :key="index"
                      :value="`tab-${index}`"
                    >
                      <restaurant-plat
                        v-for="(plat, index) in menu.dishes"
                        :key="index"
                        :id="index"
                        :plat="plat"
                      />
                    </v-tab-item>
                  </v-tabs>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>Evaluations</v-card-title>
                <v-card-text class="pa-0">
                  <v-row>
                    <v-col
                      cols="12"
                      class="pt-0 pb-0"
                      v-for="(g, index) in restaurant.grades"
                      :key="index"
                    >
                      <restaurant-evaluation
                        :id="index + '-' + restaurant._id"
                        :grade="g"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
import RestaurantMap from "./../components/RestaurantMap";
import RestaurantEvaluation from "./../components/RestaurantEvaluation";
import RestaurantPlat from "./../components/RestaurantPlat";
import RestaurantListe from "./../components/RestaurantListe";
import RestaurantServices from "./../services/RestaurantServices";
export default {
  components: {
    RestaurantListe,
    RestaurantPlat,
    RestaurantEvaluation,
    RestaurantMap
  },
  data() {
    return {
      MenuTab: "tab-0",
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
    GradeMoyen() {
      if (this.restaurant)
        return _.round(_.mean(_.map(this.restaurant.grades || [], "grade")), 1);
      return 0;
    },
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
          this.MenuTab = "tab-0";
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
