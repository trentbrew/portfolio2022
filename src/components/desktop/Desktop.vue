<template>
  <div class="desktop-container">
    <div ref="desktop" class="desktop">
      <!-- append windows here -->
      <Window :index="0" :title="'< 0 > Test Window'" :test="true" />
      <Window :index="1" :title="'< 1 > Window 2'" />
      <Window :index="2" :title="'< 2 > Slotted'"><p>slotted content</p></Window>
    </div>
  </div>
</template>

<script>
import Window from "@/components/desktop/Window.vue";

export default {
  name: "Desktop",
  components: {
    Window,
  },
  data() {
    return {};
  },
  computed: {},
  props: {},
  mounted() {
    console.log("Desktop.vue mounted");
    console.log("window count: ", this.getWindowCount());
  },
  methods: {
    getWindowCount() {
      return this.$refs.desktop.children.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.desktop {
  //background: #dfe7ef;
  background: black;
  height: $ui_height;
  width: 100%;
  border-radius: $rad;
}

.desktop-container {
  background: linear-gradient(black, $bezel_color);
}
</style>
