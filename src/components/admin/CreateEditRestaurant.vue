<template>
  <v-card>
    <v-card-title>
      <span>Creation/Edition d'un restaurant</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-text-field v-model="resto.name" label="Nom du restaurant" required></v-text-field>
              <v-text-field v-model="resto.cuisine" label="Cuisine" required></v-text-field>
              <v-text-field v-model="resto.borough" label="Borough" required></v-text-field>
              <v-text-field v-model="resto.address.building" label="Batiment" required></v-text-field>
              <v-text-field v-model="resto.address.street" label="Rue" required></v-text-field>
              <v-text-field v-model="resto.address.zipcode" label="Code postal" required></v-text-field>
              <v-text-field v-model="resto.address.coord[0]" label="Latitude" required></v-text-field>
              <v-text-field v-model="resto.address.coord[1]" label="Longitude" required></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-card outlined class="mb-3">
                <v-card-title>
                  <span>Les menus</span>
                  <v-btn :disabled="loading" text fab x-small @click="AjouterMenu" class="ml-3">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text v-for="(menu, index_menu) in resto.menus" :key="index_menu">
                  <v-row>
                    <v-col cols="10" class="py-0">
                      <v-text-field v-model="menu.name" label="Label du menu" required></v-text-field>
                    </v-col>
                    <v-col cols="2" class="py-0">
                      <v-btn
                        :disabled="loading"
                        text
                        fab
                        x-small
                        @click="AjouterPlatMenu(index_menu)"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0">
                      <table cellspacing="0" cellpadding="0" class="pl-1">
                        <tr v-for="(plat, index) in menu.dishes" :key="index">
                          <td width="50">Plat {{index+1}} :</td>
                          <td class="px-2">
                            <v-text-field v-model="plat.name" label="Nom du plat" required></v-text-field>
                          </td>
                          <td class="px-2">
                            <v-text-field v-model="plat.type" label="Type de plat" required></v-text-field>
                          </td>
                          <td class="px-2">
                            <v-text-field v-model="plat.price" number label="Prix" required></v-text-field>
                          </td>
                        </tr>
                      </table>
                    </v-col>
                  </v-row>
                  <v-divider v-if="index_menu<resto.menus.length-1"></v-divider>
                </v-card-text>
              </v-card>
              <v-card outlined>
                <v-card-title>
                  <span>La carte</span>
                  <v-btn
                    :disabled="loading"
                    text
                    fab
                    x-small
                    @click="AjouterPlatCarte"
                    class="ml-3"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col class="py-0">
                      <table cellspacing="0" cellpadding="0" class="pl-1">
                        <tr v-for="(plat, index) in resto.carte" :key="index">
                          <td width="50">Plat {{index+1}} :</td>
                          <td class="px-2">
                            <v-text-field v-model="plat.name" label="Nom du plat" required></v-text-field>
                          </td>
                          <td class="px-2">
                            <v-text-field v-model="plat.type" label="Type de plat" required></v-text-field>
                          </td>
                          <td class="px-2">
                            <v-text-field v-model="plat.price" number label="Prix" required></v-text-field>
                          </td>
                        </tr>
                      </table>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-col class="text-right">
        <v-btn color="grey" text @click="$emit('fermer')">Fermer</v-btn>
        <v-btn :disabled="loading" :loading="loading" color="primary" @click="createEditRestaurant">
          <v-icon left small>mdi-plus</v-icon>Créer/Editer
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import RestaurantServices from "./../../services/RestaurantServices";
import _ from "lodash";
export default {
  props: {
    edit: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      template: {
        menu: { name: "", dishes: [] },
        plat: {
          name: "",
          type: "",
          price: ""
        }
      },
      resto: {
        name: "",
        address: {
          building: "",
          coord: ["", ""],
          street: "",
          zipcode: ""
        },
        borough: "",
        cuisine: "",
        menus: [
          {
            id: "",
            name: "",
            dishes: [
              {
                id: "",
                name: "",
                type: "",
                description: "",
                photo: "",
                price: ""
              }
            ]
          }
        ],
        carte: [
          {
            id: "",
            name: "",
            type: "",
            description: "",
            photo: "",
            price: ""
          }
        ]
      }
    };
  },
  mounted() {
    if (this.edit != null) this.resto = this.edit;
  },
  methods: {
    createEditRestaurant() {
      this.loading = true;
      if (typeof this.resto._id != "undefined")
        // Edit
        RestaurantServices.update(this, this.resto._id, this.resto).then(r => {
          this.$emit("update");
          this.loading = false;
        });
      else
        RestaurantServices.create(this, this.resto).then(r => {
          this.$emit("creation");
          this.loading = false;
        });
    },
    AjouterPlatMenu(index) {
      this.resto.menus[index].dishes.push(_.cloneDeep(this.template.plat));
    },
    AjouterPlatCarte() {
      this.resto.carte.push(_.cloneDeep(this.template.plat));
    },
    AjouterMenu() {
      let menu = _.cloneDeep(this.template.menu);
      menu.dishes.push(_.cloneDeep(this.template.plat));
      this.resto.menus.push(menu);
    }
  }
};
</script>

<style scoped></style>
