<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

body {
  background: $bezel_color;
  margin: 0px;
  padding: 0px;
  font-family: sans-serif;
}
</style>
