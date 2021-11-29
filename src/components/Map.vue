<template>
  <GMapMap :center="center" :zoom="4" map-type-id="terrain">
    <GMapPolygon v-for="geo in geoData" :key="geo.id" :paths="geo.paths" />
  </GMapMap>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      center: { lat: 50.57475328739007, lng: 36.552494681420995 },
    };
  },
  computed: {
    ...mapGetters(["GET_STATE"]),

    geoData() {
      let result = [];
      let geoParams = { id: null, paths: [] };
      const mapPrams = this.GET_STATE.geo;
      if (!mapPrams) return [];

      mapPrams.forEach((param) => {
        param.geodata.forEach((geo) => {
          geoParams = { id: null, paths: [] };
          geoParams.id = geo.id;
          geo.geometry.coordinates[0].forEach((cord) => {
            geoParams.paths.push({
              lng: cord[0],
              lat: cord[1],
            });
          });
        });
        result.push(geoParams);
      });

      return result;
    },
  },
};
</script>

<style scoped>
.vue-map-container {
  height: 30em;
}
</style>
