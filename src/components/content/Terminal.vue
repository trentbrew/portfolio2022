<template>
<div class="terminal-container">
  <vue-typer
    :text="[
      `Hi!`,
      `My name's Trent`,
      `I'm a UX Developer based in Chicago`,
      `Welcome to my portfolio ^-^`,
      `Feel free to click around & explore my work...`
    ]"
    :repeat='Infinity'
    :shuffle='false'
    initial-action='typing'
    :pre-type-delay='100'
    :type-delay='100'
    :pre-erase-delay='3000'
    :erase-delay='600'
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
  background: rgba(black, 0.6);
  border-radius: 8px;
  padding: 24px;
}
.vue-typer {
  font-family: monospace;
  font-size: 18px;
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
  width: 10px;
  background-color: white;
}
</style>