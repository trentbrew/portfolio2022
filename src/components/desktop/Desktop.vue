<template>
  <div class="desktop-container">
    <div class="desktop">
      <!-- append windows here -->
      <Window />
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
  computed: {},
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
