<template>
  <div class="ui">
    <Desktop />
  </div>
</template>

<script>
import Desktop from "@/components/desktop/Desktop.vue";

export default {
  name: "Screen",
  components: {
    Desktop,
  }
}
</script>

<style lang="scss" scoped>
.ui {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  border: solid $bezel_color;
  border-width: $bezel_width 12px $bezel_width 12px;
  padding-bottom: 12px;
}
</style>
