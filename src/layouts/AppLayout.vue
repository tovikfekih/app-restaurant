<template>
  <v-app>
    <v-app-bar absolute class="elevation-0" color="transparent" height="130">
      <v-toolbar-title>
        <a href="/">
          <img src="./../assets/logo_white.png" height="70" alt="Restaury" />
        </a>
      </v-toolbar-title>
    </v-app-bar>
    <commande-btn
      style="position:fixed;z-index:11;top:15px;right:15px;"
    ></commande-btn>
    <v-sheet>
      <v-content fluid class="pa-0">
        <router-view exact />
      </v-content>
    </v-sheet>
    <br />
    <br />
    <br />
    <br />
    <v-footer
      app
      inset
      absolute
      color="grey lighten-4"
      width="auto"
      height="auto"
    >
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
    <v-btn
      to="/admin/login"
      style="z-index:10"
      fixed
      dark
      bottom
      left
      color="pink"
    >
      <v-icon left>mdi-shield-account</v-icon>Administration
    </v-btn>
  </v-app>
</template>

<script>
import CommandeBtn from "./../components/CommandeBtn";
export default {
  components: { CommandeBtn }
};
</script>
<style>
.m-message-container {
  font-family: "Roboto", sans-serif;
}
</style>
