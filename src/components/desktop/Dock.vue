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
  background: black;
  width: 700px; // TODO: Set dock width to fit children
  height: 60px;
  border-radius: $rad;
  display: none;
}
</style>
