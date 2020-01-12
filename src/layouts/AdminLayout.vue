<template>
  <v-app>
    <the-app-bar />
    <the-drawer />
    <the-view />
    <the-footer />
  </v-app>
</template>

<script>
import TheAppBar from "./../components/admin/layout/TheAppBar";
import TheView from "./../components/admin/layout/TheView";
import TheDrawer from "./../components/admin/layout/TheDrawer";
import TheFooter from "./../components/admin/layout/TheFooter";

export default {
  components: {
    TheAppBar,
    TheDrawer,
    TheView,
    TheFooter
  }
};
</script>
