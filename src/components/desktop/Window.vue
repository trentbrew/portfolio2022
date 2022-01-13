<template>
  <vue-resizable
    ref="resizableComponent"
    class="resizable"
    :class="selectedWindow != index ? 'inactive' : 'active'"
    :style="!windowState.immersive ? 'padding: 0px 0px 24px 0px' : 'padding: 0px 0px 0px 0px'"
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
      @mousedown.prevent="windowSelected"
    >
      <div class="window-border">
        <div v-if="!windowState.immersive" class="window-header">
          <div class="window-title"><span>{{ title }}</span></div>
          <div class="window-controls">
            <button @click="windowImmersive" class="immersive"></button>
            <button @click="windowExpand" class="expand"></button>
            <button @click="windowExit" class="exit"></button>
          </div>
        </div>

        <div class="window-body" :style="`height:${height - 24}px;`">
          <slot id="slot">
            <span>W: <b>{{ width.toFixed(0) }}</b></span><br>
            <span>H: <b>{{ height.toFixed(0) }}</b></span><br>
            <span>X: <b>{{ left.toFixed(0) }}</b></span><br>
            <span>Y: <b>{{ top.toFixed(0) }}</b></span>
          </slot>
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
      selectedWindow: 0,
      windowState: {
        immersive: false,
        expanded: false
      }
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
    this.left = 60 + (this.index * 60);
    this.top = 60 + (this.index * 60);
    this.$root.$on('windowSelected', id => {
        this.selectedWindow = id;
    });
  },
  methods: {
    windowImmersive() {
      console.log('immersive mode...');
      this.windowState.immersive = true;
    },
    windowExpand() {
      console.log('expanding window...');
      this.windowState.expanded = true;
    },
    windowExit() {
      console.log('exiting window...');
    },
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
#slot {
  border-radius: $rad;
}

.resizable {
  padding: 0;
  font-weight: normal;
  color: black;
  position: absolute !important;
  margin-top: $bezel_width;
  margin-left: 12px;
}

.window-border {
  background: $active_window;
  padding: 12px;
  border-radius: $rad;
  box-sizing: content-box;
  backdrop-filter: blur(36px);
  box-shadow: $light_shadow;
}

.window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: $top_height;
  text-align: center;
  border-radius: 12px 12px 0px 0px;
  transform: translateY(-6px);
  .window-title {
    cursor: default;
    margin-left: 8px;
  }

  .immersive {
    background-image: url('../../assets/black_immersive.svg');
    background-size: 45%;
  }

  .expand {
    background-image: url('../../assets/black_expand.svg');
    background-size: 55%;
  }

  .exit {
    background-image: url('../../assets/black_exit.svg');
    background-size: 45%;
  }

  .window-controls button {
    height: 24px;
    width: 24px;
    border-radius: 100%;
    border: none;
    margin-left: 6px;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
      background-color: rgba(black, 0.36);
    }
  }
}

.window-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: $tight_shadow;
}

.active {
  z-index: 9999 !important;

  .window-title {
    color: rgba(white, 0.8);
    //font-weight: bold;
    opacity: 0.8;
  }

  .window-controls {
    filter: invert(1);
  }
}

.inactive {
  z-index: 0 !important;

  .window-title {
    color: rgba(black, 0.8);
    //font-weight: bold;
  }

  .window-border {
    background: $inactive_window;
  }
}
</style>
