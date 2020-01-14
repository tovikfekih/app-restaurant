<template>
  <v-card outlined class="elevation-0 mb-3" style="overflow:hidden;">
    <v-row>
      <v-col cols="4" class="pa-0">
        <v-img
          width="150"
          height="100"
          :src="
            'https://loremflickr.com/150/150/pizza/all?lock=' +
              (hash(plat.name + id) + '').substr(0, 2)
          "
        ></v-img>
      </v-col>
      <v-col cols="8">
        <div class="headline">
          <v-row>
            <v-col class="pb-0">
              {{ plat.name }}
            </v-col>
            <v-col class="text-right pr-8 pb-0">
              <span> {{ plat.price }} € </span>
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col class="pb-0 pt-0">
            <span class="text--grey">{{ plat.type }}</span>
          </v-col>
          <v-col class="pb-0 pt-0 pr-8 text-right">
            <v-btn
              class="margin-top:-10px;"
              x-small
              color="primary"
              dark
              v-if="!panier && !admin"
              @click="AjouterAuPanier"
              fab
            >
              <v-icon small>mdi-cart-plus</v-icon></v-btn
            >
            <v-btn
              class="margin-top:-10px;"
              color="secondary"
              dark
              x-small
              v-if="panier && !admin"
              @click="EnleverDuPanier"
              fab
            >
              <v-icon>mdi-cart-minus</v-icon></v-btn
            >
          </v-col>
        </v-row>

        <!-- <span> {{ plat.description.substr(0, 50) }}... </span> -->
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    panier: {
      type: Boolean,
      default: false
    },
    admin: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: _.random(0, 9999)
    },
    plat: {
      type: Object,
      default: {
        name: "",
        type: "",
        description: "",
        photo: "",
        price: ""
      }
    }
  },
  methods: {
    EnleverDuPanier() {
      this.$store.state.panier.splice(
        this.$store.state.panier.indexOf(this.plat),
        1
      );
      this.$message({
        message: "Ce plat a bien été enlevé de votre panier.",
        type: "success",
        showClose: true
      });
    },
    AjouterAuPanier() {
      this.$store.state.panier.push(this.plat);
      this.$message({
        message: "Plat ajouté a votre panier.",
        type: "success",
        showClose: true
      });
    },
    hash(s) {
      var h = 0,
        l = s.length,
        i = 0;
      if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
      return h;
    }
  }
};
</script>

<style scoped></style>
