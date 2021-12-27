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
    <div
      class="window-container"
      @click="windowClicked"
    >
      <div class="window-header">{{ title }}</div>
      <div class="window-body">
          <p>W:{{ width }}</p>
          <p>H:{{ height }}</p>
          <p>L:{{ left }}</p>
          <p>T:{{ top }}</p>
        </div>
      </table>
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
    return {
      handlers: ["r", "rb", "b", "lb", "l", "lt", "t", "rt"],
      left: 36,
      top: 60,
      height: 400,
      width: 600,
      minW: 300,
      minH: 300,
      fit: true,
      event: "",
      dragSelector: ".window-header",
    };
  },
  props: {
    id: Number,
    title: String,
  },
  computed: {
    maxW: () => window.innerWidth,
    maxH: () => window.innerHeight,
  },
  mounted() {
    console.clear();
    console.log("Window.vue mounted");
  },
  methods: {
    eHandler(data) {
      this.width = data.width;
      this.left = data.left;
      this.height = data.height;
      this.top = data.top;
      this.event = data.eventName;
    },
    windowClicked() {
      console.log("active window: ", this.id);
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
  padding: 0;
  background: white;
  font-weight: normal;
  color: black;
  position: absolute !important;
  border-radius: $rad;
  box-sizing: border-box;
  margin-top: $bezel_width + $top_height;
  margin-left: $bezel_width;
}

.window-header {
  width: 100%;
  height: $top_height;
  background: red;
  color: white;
  text-align: center;
  border-radius: $rad $rad 0px 0px;
}

.window-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background: orange;
}
</style>
