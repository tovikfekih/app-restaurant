<template>
  <v-footer app inset absolute color="transparent" width="auto" height="auto">
    <v-container>
      <v-row align="center">
        <v-spacer />
        <v-col cols="12" md="auto">
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy;
            {{ new Date().getFullYear() }}, made with
            <v-icon size="18" color="red">mdi-heart</v-icon>&nbsp;by
            <a href="https://github.com/FekihTaoufik">Taoufik Fekih</a> &
            <a href="https://github.com/metasmash">Yannick Ouali</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style></style>
