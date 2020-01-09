<template>
  <component :is="layout"></component>
</template>

<script>
const default_layout = "default";
import AdminLayout from "./layouts/AdminLayout";
import DefaultLayout from "./layouts/DefaultLayout";
export default {
  components: {
    AdminLayout,
    DefaultLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
};
</script>
