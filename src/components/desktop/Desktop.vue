<template>
  <div class="desktop-container">
    <div ref="desktop" class="desktop">
      <!-- append windows here -->
      <Window :test="true" :index="0" :title="'test window'" />
      <Window :index="1" :title="'Window 2'" />
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
  background: #8ac6d1;
  height: $ui_height;
  width: 100%;
  border-radius: $rad;
}

.desktop-container {
  background: linear-gradient(black, $japanese_indigo);
}
</style>
