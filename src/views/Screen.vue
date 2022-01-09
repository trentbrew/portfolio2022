<template>
  <div class="ui">
    <Topbar />
    <Desktop />
    <Dock />
  </div>
</template>

<script>
import Topbar from "@/components/topbar/Topbar.vue";
import Desktop from "@/components/desktop/Desktop.vue";
import Dock from "@/components/desktop/Dock.vue";

export default {
  name: "Screen",
  components: {
    Topbar,
    Desktop,
    Dock,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.ui {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  border: solid $bezel_color;
  border-width: $bezel_width 12px $bezel_width 12px;
}
</style>
