<template>
  <div id="app">
    <Screen />
  </div>
</template>

<script>
import Intro from "@/views/Intro.vue";
import Screen from "@/views/Screen.vue";

export default {
  components: {
    Intro,
    Screen,
  },
};
</script>

<style lang="scss">
body {
  background: $dark;
  margin: 0px;
  padding: 0px;
  font-family: sans-serif;
}
</style>
