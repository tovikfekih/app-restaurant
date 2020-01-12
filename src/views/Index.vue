<template>
  <div>
    <v-parallax
      height="380"
      class="pa-0"
      style="position:relative;"
      src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
    >
      <div class="overlay" />
    </v-parallax>
    <svg
      style="position: relative;
    margin-top: -153px;"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        fill="white"
        fill-opacity="1"
        d="M0,96L60,106.7C120,117,240,139,360,128C480,117,600,75,720,74.7C840,75,960,117,1080,128C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      />
    </svg>
    <v-container style="margin-top:-430px;z-index:10;position:relative">
      <v-row>
        <v-col cols="12">
          <div
            style="font-size:50px;"
            class="mb-2 font-weight-thin white--text text-center"
          >C'est bon de commander</div>
          <div
            class="title white--text text-center"
          >Faites-vous livrer les meilleurs restos près de chez vous avec Restaury</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="offset-2">
          <v-card>
            <v-card-title class="pt-0">
              <v-text-field
                width="100%"
                placeholder="Recherchez votre restaurant..."
                round
                hide-details
                prepend-icon="mdi-domain"
                single-line
                v-model.trim="rechercheParNomTemp"
                @keyup.enter="lancerRecherche"
              ></v-text-field>
              <v-btn depressed rounded small class="mt-4 ml-5" @click="lancerRecherche">
                <v-icon left>mdi-magnify</v-icon>Rechercher
              </v-btn>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10" class="offset-1">
          <restaurant-liste :filtres="filtres" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
import RestaurantListe from "./../components/RestaurantListe";
import RestaurantServices from "./../services/RestaurantServices";
export default {
  components: {
    RestaurantListe
  },
  data() {
    return {
      rechercheParNomTemp: "",
      filtres: {
        nom: ""
      }
    };
  },
  methods: {
    lancerRecherche() {
      this.filtres.nom = _.cloneDeep(this.rechercheParNomTemp);
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
