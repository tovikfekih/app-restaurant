<template>
  <v-data-table show-expand single-expand :headers="headers" :items="commandes" class="elevation-0">
    <template v-slot:expanded-item="{ item, headers }">
      <td :colspan="headers.length">
        <v-row style="width:100%;">
          <v-col class="mt-3">
            <div class="headline">Visualisation des plats commandées</div>
          </v-col>
        </v-row>
        <v-row style="width:100%;">
          <v-col cols="12" v-for="(plat, index) in item.dishes" :key="index">
            <restaurant-plat admin :plat="plat" :id="index"></restaurant-plat>
          </v-col>
        </v-row>
      </td>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn color="red white--text" x-small fab @click="SupprimerCommande(item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import _ from "lodash";
import RestaurantPlat from "./../../components/RestaurantPlat";
export default {
  components: {
    RestaurantPlat
  },
  data() {
    return {
      headers: [
        {
          text: "La date et l'heure de la commande",
          align: "left",
          sortable: true,
          value: "datetime"
        },
        {
          text: "Nombre de plats commandé",
          align: "left",
          sortable: true,
          value: "nb_plats"
        },
        {
          text: "Montant total",
          align: "left",
          sortable: true,
          value: "montant_total"
        },
        {
          text: "Actions",
          align: "left",
          value: "action"
        }
      ],
      pagination: {
        page: 1,
        itemsPerPage: 5,
        totalItems: 0,
        rowsPerPageItems: [5, 10, 20, 30]
      }
    };
  },
  computed: {
    commandes() {
      let commandes = _.map(this.$store.state.commandes, c => {
        c.nb_plats = c.dishes.length;
        c.montant_total = _.sumBy(c.dishes, "price");
        return c;
      });
      return commandes;
    }
  },
  methods: {
    SupprimerCommande(cmd) {
      this.$store.state.commandes.splice(
        this.$store.state.commandes.indexOf(cmd),
        1
      );
    }
  },
  mounted() {}
};
</script>

<style scoped>
.v-data-table__expanded.v-data-table__expanded__content {
  position: relative;
}
</style>
