<template>
  <component :is="layout"></component>
</template>

<script>
const default_layout = "app";
import AdminLayout from "./layouts/AdminLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import AppLayout from "./layouts/AppLayout";
export default {
  components: {
    AdminLayout,
    AppLayout,
    DefaultLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
};
</script>
