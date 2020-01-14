<template>
  <iframe
    style="width:100%;height:100%;"
    frameborder="0"
    scrolling="no"
    marginheight="0"
    marginwidth="0"
    :src="url"
  ></iframe>
</template>

<script>
export default {
  components: {},
  props: {
    localisation: {
      type: Array,
      default: [10, 10]
    }
  },
  computed: {
    url() {
      let lat = this.localisation[0];
      let lon = this.localisation[1];
      return `http://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}&layer=mapnik&marker=${lat}%2C${lon}`;
    }
  },
  data() {
    return {};
  }
};
</script>
