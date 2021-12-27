<template>
  <vue-resizable
    class="resizable"
    ref="resizableComponent"
    :dragSelector="dragSelector"
    :active="handlers"
    :fit-parent="fit"
    :max-width="maxW | checkEmpty"
    :max-height="maxH | checkEmpty"
    :min-width="minW | checkEmpty"
    :min-height="minH | checkEmpty"
    :width="width"
    :height="height"
    :left="left"
    :top="top"
    @mount="eHandler"
    @resize:move="eHandler"
    @resize:start="eHandler"
    @resize:end="eHandler"
    @drag:move="eHandler"
    @drag:start="eHandler"
    @drag:end="eHandler"
  >
    <div class="block">
      <div class="window-header">new window</div>
      <div class="table-container">
        <table>
          <tr>
            <td>w:{{ width }}</td>
            <td>h:{{ height }}</td>
          </tr>
          <tr>
            <td>l:{{ left }}</td>
            <td>t:{{ top }}</td>
          </tr>
        </table>
      </div>
    </div>
  </vue-resizable>
</template>

<script>
import VueResizable from "vue-resizable";

export default {
  name: "Window",
  components: {
    VueResizable,
  },
  data() {
    const tW = 150;
    const tH = 150;
    return {
      handlers: ["r", "rb", "b", "lb", "l", "lt", "t", "rt"],
      left: `calc( 50% - ${tW / 2}px)`,
      top: `calc(50% - ${tH / 2}px)`,
      height: tH,
      width: tW,
      minW: 100,
      minH: 100,
      //maxW: 400,
      //maxH: 400,
      fit: true,
      event: "",
      dragSelector: ".window-header",
    };
  },
  props: {},
  computed: {
    maxW: () => window.innerWidth - 72,
    maxH: () => window.innerHeight - 96,
  },
  mounted() {
    console.clear();
    console.log("Window.vue mounted");
  },
  methods: {
    eHandler(data) {
      this.width = data.width;
      this.height = data.height;
      this.left = data.left;
      this.top = data.top;
      this.event = data.eventName;
    },
  },
  filters: {
    checkEmpty(value) {
      return typeof value !== "number" ? 0 : value;
    },
  },
};
</script>

<style lang="scss" scoped>
.resizable {
  background-position: top left;
  width: 300px;
  height: 300px;
  padding: 0;
  background: white;
  font-weight: normal;
  color: black;
  position: relative;
  border-radius: $rad;
}

.window-header {
  width: 100%;
  height: $top_height;
  background: red;
  color: white;
  text-align: center;
  border-radius: $rad $rad 0px 0px;
  cursor: pointer;
}

#block1 {
  border: solid black 1px;
  height: 300px;
  width: 300px;
  display: inline-block;
  float: left;
}
</style>
