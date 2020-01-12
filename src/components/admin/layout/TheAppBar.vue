<template>
  <v-app-bar app absolute flat height="75" color="transparent">
    <v-btn v-if="responsive" dark icon @click.stop="onClick">
      <v-icon>mdi-view-list</v-icon>
    </v-btn>
    <v-toolbar-title class="hidden-sm-and-down">{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-text-field
      class="mb-2"
      color="purple secondary--text"
      label="Search"
      hide-details
      style="max-width: 165px;"
    />
    <div class="mx-3" />
  </v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "TheAppBar",
  data() {
    return {
      notifications: [
        "Mike, John responded to your email",
        "You have 5 new tasks",
        "You're now a friend with Andrew",
        "Another Notification",
        "Another One"
      ],
      title: this.$route.name,
      responsive: false
    };
  },
  watch: {
    $route(val) {
      this.title = val.name;
    }
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onResponsiveInverted() {
      this.responsive = window.innerWidth < 991;
    }
  }
};
</script>

<style></style>
