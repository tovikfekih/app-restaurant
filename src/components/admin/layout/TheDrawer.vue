<template>
  <v-navigation-drawer
    app
    dark
    v-model="inputValue"
    :src="image"
    mobile-break-point="991"
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)" />
    </template>
    <v-list-item two-line>
      <v-img src="./../../../assets/logo_white.png" width="70" />
    </v-list-item>

    <v-divider class="mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        exact
        active-class="primary white--text"
      >
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list nav>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home-import-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="font-weight-light">Site principal</v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin/login">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="font-weight-light">Se déconnecter</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    links: [
      {
        to: "/admin/restaurants",
        icon: "mdi-account",
        text: "Restaurants"
      },
      {
        to: "/admin/commandes",
        icon: "mdi-clipboard-outline",
        text: "Commandes"
      }
    ]
  }),

  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"])
  }
};
</script>
