<template>
  <vue-resizable
    class="resizable"
    :class="selectedWindow != index ? 'inactive' : 'active'"
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
      @mousedown="windowSelected"
    >
      <div class="window-header">{{ title }}</div>

        <div v-if="test" class="window-body" :style="`height:${height - 24}px;`">
          <span>W: <b>{{ width }}</b></span><br>
          <span>H: <b>{{ height }}</b></span><br>
          <span>X: <b>{{ left }}</b></span><br>
          <span>Y: <b>{{ top }}</b></span>
        </div>

        <div v-if="!test" class="window-body" :style="`height:${height - 24}px;`">
          hello from gitpod (:
        </div>

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
    return {
      handlers: ["r", "rb", "b", "lb", "l", "lt", "t", "rt"],
      left: 0,
      top: 0,
      height: 400,
      width: 600,
      minW: 300,
      minH: 300,
      fit: true,
      event: "",
      dragSelector: ".window-header",
      selectedWindow: 0
    };
  },
  props: {
    test: Boolean,
    index: Number,
    title: String,
  },
  computed: {
    maxW: () => window.innerWidth,
    maxH: () => window.innerHeight,
  },
  mounted() {
    console.clear();
    console.log("Window.vue mounted");
    this.left = 120 + (this.index * 120);
    this.top = 120 + (this.index * 120);
    this.$root.$on('windowSelected', id => {
        this.selectedWindow = id;
    });
  },
  methods: {
    eHandler(data) {
      this.width = data.width;
      this.left = data.left;
      this.height = data.height;
      this.top = data.top;
      this.event = data.eventName;
    },
    windowSelected() {
      this.$root.$emit('windowSelected', this.index);
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
  transition: opacity 200ms;
}

.window-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: $top_height;
  background: $primary;
  color: white;
  text-align: center;
  border-radius: $rad $rad 0px 0px;
}

.window-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: white;
  border-radius: $rad;
}

.active {
  z-index: 9999 !important;
  background: $primary;
}

.inactive {
  opacity: 0.7;
  z-index: 0 !important;
  background: $japanese_indigo;

  .window-header {
    background: $japanese_indigo !important;
  }
}
</style>
