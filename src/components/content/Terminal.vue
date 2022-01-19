<template>
  <vue-typer
    :text="[
      `Hi!`,
      `My name's Trent`,
      `I'm a UX Developer based in Chicago`,
      `Welcome to my website(:`,
      `Feel free to click around & explore...`
    ]"
    :repeat='0'
    :shuffle='false'
    initial-action='typing'
    :pre-type-delay='70'
    :type-delay='70'
    :pre-erase-delay='3000'
    :erase-delay='250'
    erase-style='select-all'
    :erase-on-complete='false'
    caret-animation='blink'
  ></vue-typer>
</template>

<script>
import { VueTyper } from 'vue-typer';

export default {
  name: 'Terminal',
  components: {
    VueTyper
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.vue-typer {
  font-family: monospace;
}

.vue-typer .custom.char {
  color: #D4D4BD;
  background-color: #1E1E1E;
}
.vue-typer .custom.char.selected {
  background-color: #264F78;
}

.vue-typer .custom.caret {
  width: 10px;
  background-color: #3F51B5;
}
</style>