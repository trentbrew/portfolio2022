<template>
<div class="terminal-container">
  <vue-typer
    :text="[
      `Hi!`,
      `My name's Trent`,
      `I'm a UX Engineer based in Chicago`,
      `Welcome to my portfolio ^-^`,
      `Feel free to click around & explore my work...`
    ]"
    :repeat='0'
    :shuffle='false'
    initial-action='typing'
    :pre-type-delay='200'
    :type-delay='100'
    :pre-erase-delay='2000'
    :erase-delay='200'
    erase-style='select-all'
    :erase-on-complete='false'
    caret-animation='smooth'
  ></vue-typer>
</div>
</template>

<script>
import { VueTyper } from 'vue-typer';

export default {
  name: 'Terminal',
  components: {
    VueTyper
  }
}
</script>

<style lang='scss'>
.terminal-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgba(black, 0.3);
  border-radius: 8px;
  padding: 24px;
}
.vue-typer {
  font-family: monospace;
  font-size: 16px;
  &::before {
    content: '$ ';
    color: lime;
  }
}
.vue-typer .custom.char {
  color: white;
}
.vue-typer .custom.char.selected {
  background-color: #264F78;
}
.vue-typer .custom.caret {
  display: inline-block !important;
  width: 10px;
  background-color: white;
}
</style>