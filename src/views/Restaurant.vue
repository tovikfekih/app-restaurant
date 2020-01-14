<template>
  <div>
    <v-parallax
      v-if="restaurant"
      height="350"
      class="pa-0"
      style="position:relative;"
      :src="photo"
    >
      <div class="overlay" />
    </v-parallax>
    <v-container style="margin-top:-230px;z-index:10;position:relative">
      <v-row>
        <v-col cols="8" class="offset-2">
          <v-row>
            <v-col cols="8" class="white--text">
              <div class="display-2">
                {{ restaurant.name }}
              </div>
              <span style="text-transform:capitalize;">
                <v-icon class="white--text" left>mdi-stove</v-icon>
                Cuisine : {{ restaurant.cuisine }}
              </span>
              <span
                v-if="restaurant.address"
                style="text-transform:capitalize;"
                class="ml-4"
              >
                <v-icon class="white--text" left
                  >mdi-home-circle-outline</v-icon
                >
                {{ restaurant.address.street }}, {{ restaurant.borough }},
                {{ restaurant.address.building }},
                {{ restaurant.address.zipcode }}
              </span>
            </v-col>
            <v-col cols="4" class="text-right">
              <span class="white--text ml-4" style="font-size:20px;">
                {{ GradeMoyen }}/5
                <span v-if="restaurant.grades"
                  >({{ restaurant.grades.length }} Notes)</span
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
        <v-col cols="8" class="offset-2 pt-0" v-if="restaurant">
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
                <v-card-text v-if="restaurant.carte" class="text-center pt-0">
                  <v-btn
                    @click="AjouterAuPanier(restaurant.carte)"
                    small
                    depressed
                    text
                    ><v-icon left>mdi-plus</v-icon> Ajouter la carte au
                    panier</v-btn
                  >
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
                      <div v-if="menu" class="text-center">
                        <v-btn
                          @click="AjouterAuPanier(menu.dishes)"
                          small
                          depressed
                          text
                          ><v-icon left>mdi-plus</v-icon> Ajouter le menu au
                          panier</v-btn
                        >
                      </div>
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
      if (this.restaurant.grades)
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
    AjouterAuPanier(plats) {
      this.$store.state.panier = this.$store.state.panier.concat(plats);
      this.$message({
        message: "Les plats ont été ajouté a votre panier.",
        type: "success",
        showClose: true
      });
    },
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
