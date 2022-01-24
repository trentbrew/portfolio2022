<template>
  <div class="dock-container flex-center" :class="hide && 'hidden'">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    hide: Boolean
  }
};
</script>

<style lang="scss" scoped>
.dock-container {
  position: fixed;
  transform: translateY(-36px);
  margin: auto;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 8px 18px;
  background: $active_window;
  backdrop-filter: $blur;
  max-width: fit-content;
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
