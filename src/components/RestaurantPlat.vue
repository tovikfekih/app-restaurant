<template>
  <v-card outlined class="elevation-0 mb-3" style="overflow:hidden;">
    <v-row>
      <v-col cols="4" class="pa-0">
        <v-img
          width="150"
          height="80"
          :src="
            'https://loremflickr.com/150/150/pizza/all?lock=' +
              (hash(plat.name + id) + '').substr(0, 2)
          "
        ></v-img>
      </v-col>
      <v-col cols="8">
        {{ plat.name }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    id: {
      type: Number,
      default: _.random(0, 9999)
    },
    plat: {
      type: Object,
      default: {
        name: "",
        type: "",
        description: "",
        photo: "",
        price: ""
      }
    }
  },
  methods: {
    hash(s) {
      var h = 0,
        l = s.length,
        i = 0;
      if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
      return h;
    }
  }
};
</script>

<style scoped></style>
