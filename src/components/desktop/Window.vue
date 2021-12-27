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
      <div class="drag-container-1">drag_1</div>
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
      <div class="drag-container-2">drag_2</div>
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
      maxW: 250,
      maxH: 250,
      minW: 100,
      minH: 100,
      fit: true,
      event: "",
      dragSelector: ".drag-container-1, .drag-container-2",
    };
  },
  props: {},
  computed: {},
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
  width: 150px;
  height: 150px;
  padding: 0;
  border: 1px solid #003eff;
  background: #007fff;
  font-weight: normal;
  color: #ffffff;
  position: relative;
}

.drag-container-1,
.drag-container-2 {
  width: 100%;
  height: 20px;
  background: red;
  color: white;
  text-align: center;
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
