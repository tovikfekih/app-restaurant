<template>
  <v-app>
    <the-app-bar />
    <the-drawer />
    <the-view />
    <the-footer />
  </v-app>
</template>

<script>
import TheAppBar from "./../components/admin/TheAppBar";
import TheView from "./../components/admin/TheView";
import TheDrawer from "./../components/admin/TheDrawer";
import TheFooter from "./../components/admin/TheFooter";

export default {
  components: {
    TheAppBar,
    TheDrawer,
    TheView,
    TheFooter
  }
};
</script>
