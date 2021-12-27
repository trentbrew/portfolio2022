<template>
  <div class="desktop-container">
    <div ref="desktop" class="desktop">
      <!-- append windows here -->
      <Window :id="0" :title="'window 1'" />
      <Window :id="1" :title="'window 2'" />
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
  border-radius: 0px 0px $rad $rad;
}

.container {
  width: 300px;
  height: 300px;
  display: inline-block;
  border: 1px solid #dddddd;
  background: #ffffff;
  color: #333333;
  float: left;
  margin: 10px;
}
</style>
