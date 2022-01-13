<template>
  <div class="dock-container"></div>
</template>

<script>
export default {
  name: "Dock",
  components: {},
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.dock-container {
  position: absolute;
  margin: 0px auto $bezel_width auto;
  bottom: $bezel_width / 2;
  left: 0px;
  right: 0px;
  background: $active_window;
  backdrop-filter: $blur;
  width: 700px; // TODO: Set dock width to fit children
  height: $dock_height;
  border-radius: $rad * 2;
  z-index: 9999;
}
</style>
