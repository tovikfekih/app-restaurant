<template>
  <v-container fluid>
    <v-row>
      <v-col>
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
            <v-btn color="primary" rounded small class="mt-4 ml-5" @click="CreerRestaurant">
              <v-icon left>mdi-plus</v-icon>Restaurant
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          show-expand
          single-expand
          :loading="loading"
          :headers="headers"
          :items="restaurants"
          :server-items-length="pagination.totalItems"
          :options.sync="pagination"
          :footer-props="{
            'items-per-page-options': pagination.rowsPerPageItems
          }"
          class="elevation-1"
        >
          <template v-slot:expanded-item="{ item, headers }">
            <td :colspan="headers.length">
              <v-container fluid>
                <v-row style="width:100%;">
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>La carte</v-card-title>
                      <v-card-text>
                        <restaurant-plat
                          admin
                          v-for="(plat, index) in item.carte"
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
                        <v-tabs>
                          <v-tab
                            v-for="(menu, index) in item.menus"
                            :key="index"
                            :href="`#tab-${index}`"
                          >{{ menu.name }}</v-tab>
                          <v-tab-item
                            class="pt-3"
                            v-for="(menu, index) in item.menus"
                            :key="index"
                            :value="`tab-${index}`"
                          >
                            <restaurant-plat
                              admin
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
              </v-container>
            </td>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn
              color="blue lighten-2 white--text"
              x-small
              fab
              @click="EditerRestaurant(item)"
              class="mr-3"
            >
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
            <v-btn color="red white--text" x-small fab @click="SupprimerRestaurant(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog
      scrollable
      v-model="CreateEditRestaurantDialog"
      width="70%"
      @close="RestaurantAEditer=null"
    >
      <CreateEditRestaurant
        v-if="CreateEditRestaurantDialog"
        :edit="RestaurantAEditer"
        @fermer="CreateEditRestaurantDialog=false;RestaurantAEditer=null"
        @creation="CreateEditRestaurantDialog=false;lancerRecherche()"
        @update="CreateEditRestaurantDialog=false;lancerRecherche()"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import RestaurantPlat from "./../RestaurantPlat";
import CreateEditRestaurant from "./../admin/CreateEditRestaurant";
import RestaurantServices from "./../../services/RestaurantServices";
export default {
  components: {
    RestaurantPlat,
    CreateEditRestaurant
  },
  data() {
    return {
      RestaurantAEditer: null,
      CreateEditRestaurantDialog: false,
      loading: true,
      rechercheParNomTemp: "",
      rechercheParNom: "",
      /* name: "",
          address: {
            building: "",
            coord: ["", ""],
            street: "",
            zipcode: ""
          },
          borough: "",
          cuisine: "",
          */
      headers: [
        {
          text: "Nom du restaurant",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Cuisine",
          align: "left",
          sortable: false,
          value: "cuisine"
        },
        {
          text: "Building",
          align: "left",
          sortable: false,
          value: "address.building"
        },
        {
          text: "Street",
          align: "left",
          sortable: false,
          value: "address.street"
        },
        {
          text: "Zipcode",
          align: "left",
          sortable: false,
          value: "address.zipcode"
        },
        {
          text: "Localisation",
          align: "left",
          sortable: false,
          value: "address.coord"
        },
        {
          text: "Actions",
          align: "left",
          value: "action",
          width: 120
        }
      ],
      restaurants: [],
      pagination: {
        page: 1,
        itemsPerPage: 5,
        totalItems: 0,
        rowsPerPageItems: [5, 10, 20, 30]
      }
    };
  },
  watch: {
    pagination: {
      handler() {
        this.lancerRecherche();
      },
      deep: true
    }
  },
  methods: {
    lancerRecherche() {
      this.loading = true;
      RestaurantServices.list(
        this,
        { nom: _.cloneDeep(this.rechercheParNomTemp) },
        this.pagination
      ).then(r => {
        this.loading = false;
        this.restaurants = r.data;
        this.pagination.totalItems = r.count;
      });
    },
    SupprimerRestaurant(res) {
      var r = confirm("Etes vous sure de vouloir supprimer ce restaurant ?");
      if (r == true) {
        RestaurantServices.delete(this, res._id).then(r => {
          this.lancerRecherche();
        });
      }
    },
    EditerRestaurant(res) {
      this.RestaurantAEditer = res;
      this.CreateEditRestaurantDialog = true;
    },
    CreerRestaurant(resto) {
      this.CreateEditRestaurantDialog = true;
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
