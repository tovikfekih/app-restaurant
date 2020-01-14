<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="400"
      offset-x
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          depressed
          color="#5dd1f8c9"
          large
          class="elevation-0 mr-5 mt-5"
          fab
          style="margin-top:-35px;position:fixed;top:15px; right:15px;"
        >
          <v-scale-transition>
            <v-btn
              v-if="nb_total > 0"
              fab
              x-small
              depressed
              absolute
              color="red"
              class="white--text"
              right
              style="top:-25px;right:-8px"
            >
              <span style="font-size:18px;">{{ nb_total }}</span></v-btn
            >
          </v-scale-transition>
          <v-icon color="white">mdi-cart</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <v-row>
            <v-col class="py-0">Votre panier</v-col>
            <v-col class="py-0 text-right"> Total : {{ prix_total }} €</v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="max-height:380px;overflow:auto;">
          <restaurant-plat
            v-for="(plat, index) in panier"
            :key="index"
            :id="index"
            :plat="plat"
            panier
          />
          <div v-if="nb_total <= 0" class="text-center">
            Votre panier est vide.
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="px-5">
          Total : {{ nb_total }} plats
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false">Fermer</v-btn>
          <v-btn
            :disabled="nb_total <= 0"
            color="primary"
            text
            @click="PasserCommande"
            >Passer la commande</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import RestaurantPlat from "./RestaurantPlat";
import _ from "lodash";
export default {
  components: {
    RestaurantPlat
  },
  data: () => ({
    menu: false
  }),
  methods: {
    PasserCommande() {
      if (this.nb_total <= 0) return;
      this.$store.state.commandes.push({
        datetime: new Date().toISOString(),
        dishes: this.$store.state.panier
      });
      this.$store.state.panier = [];
      this.$message({
        message: "Votre commande a été passé",
        type: "success",
        showClose: true
      });
      this.menu = false;
    }
  },
  computed: {
    panier() {
      return this.$store.state.panier;
    },
    nb_total() {
      return this.$store.state.panier.length;
    },
    prix_total() {
      return _.round(_.sumBy(this.$store.state.panier, "price"), 2);
    }
  }
};
</script>
<style scoped></style>
