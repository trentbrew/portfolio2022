<template>
  <div class="dock-container" :class="hide && 'hidden'">
    <div class="dock-icon"></div>
  </div>
</template>

<script>
export default {
  name: "Dock",
  components: {},
  data() {
    return {};
  },
  props: {
    hide: Boolean
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.dock-container {
  position: absolute;
  display: flex;
  margin: 0px auto $bezel_width auto;
  bottom: $bezel_width / 2;
  left: 0px;
  right: 0px;
  background: $active_window;
  backdrop-filter: $blur;
  //width: 700px; // TODO: Set dock width to fit children
  height: $dock_height;
  border-radius: $rad * 2;
  transition: 600ms ease 100ms;
  z-index: 99999;
}

.hidden {
  opacity: 0;
  transform: translateY(32px);
  transition: 300ms;
}
</style>
