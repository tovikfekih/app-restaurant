<template>
  <v-content>
    <v-fade-transition mode="out-in">
      <router-view exact />
    </v-fade-transition>
  </v-content>
</template>

<script>
export default {
  name: "TheView"
};
</script>

<style scoped></style>
