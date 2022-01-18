<template>
  <vue-resizable
    ref="resizableComponent"
    class="resizable"
    :class="selectedWindow != id ? 'inactive' : 'active'"
    :style="`
      padding: 0px 0px ${!windowState.immersive ? '24px' : '0px'} 0px; 
      z-index: ${getElevation()};
      display: ${exit ? 'none' : 'block'};
      transition: ${preventTransitionParent ? '0ms' : '600ms'};
    `"
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
      @mouseup.prevent="windowSelected"
    >
      <div class="window-border">
        <div 
        @dblclick="toggleExpand"
        class="window-header"
        :style="
          !windowState.immersive || windowState.peek ? 
          'height: 24px; opacity: 1;' : 
          'height: 0px; opacity: 0;'
        ">
          <div 
          @mouseenter="togglePeek"
          @mouseleave="togglePeek"
          class="peek-trigger" 
          :class="!windowState.immersive ? 'not-peekable' : 'hide'"
          :style="`
            ${
              windowState.peek ? 
              'height: 36px;' : 
              windowState.immersive && 'height: 12px;'
            } 
            ${
              this.hang ? 
              'pointer-events: none;' : 
              'pointer-events: all;' 
            }
            `"
          >
            <div class="window-title">
              <span>
                {{ title ? title : `Window ${id.substring(0,6)} (${index})` }}
              </span>
            </div>
            <div class="window-controls">
              <button @click="deactivateImmersive" class="immersive immersive-active"></button>
              <button @click="toggleExpand" :class="windowState.expanded ? 'minimize' : 'expand'"></button>
              <button @click="triggerClose" class="close"></button>
            </div>
          </div>
          <div class="window-title">
            <span>
              {{ title ? title : `Window ${id.substring(0,6)} (${index})`  }}
            </span>
          </div>
          <div class="window-controls">
            <button @click="triggerImmersive" class="immersive"></button>
            <button @click="toggleExpand" :class="windowState.expanded ? 'minimize' : 'expand'"></button>
            <button @click="triggerClose" class="close"></button>
          </div>
        </div>
        <div 
        class="window-body" 
        :style="`
          height: ${( windowState.peek ? height - 48 : height - 24)}px; 
          transition: ${preventTransitionParent ? (preventTransition ? 0 : 100 ) : 600}ms !important;
        `">
          <slot id="slot">
            <span>W: <b>{{ width && width.toFixed(0) }}</b></span><br>
            <span>H: <b>{{ height && height.toFixed(0) }}</b></span><br>
            <span>X: <b>{{ left && left.toFixed(0) }}</b></span><br>
            <span>Y: <b>{{ top && top.toFixed(0) }}</b></span>
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
      prev: [],
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      minW: 250,
      minH: 250,
      fit: true,
      exit: false,
      hang: false,
      preventTransition: true,
      preventTransitionParent: true,
      event: "",
      dragSelector: ".window-header",
      selectedWindow: 0,
      windowState: {
        peek: false,
        immersive: false,
        expanded: false
      }
    };
  },
  props: {
    index: Number,
    id: String,
    title: String,
    initialWidth: {
      type: Number,
      default: 400
    },
    initialHeight: {
      type: Number,
      default: 300
    }
  },
  computed: {
    maxW: () => window.innerWidth,
    maxH: () => window.innerHeight,
  },
  mounted() {
    this.exit = false;
    this.width = this.initialWidth;
    this.height = this.initialHeight;
    const index = this.index;
    if (!this.center) {
      this.left = this.getRandomX();
      this.top = this.getRandomY();
    } else {
      this.left = this.maxW / 2;
      this.top = this.maxH / 2;
    }
    this.$root.$on('windowSelected', id => {
      this.selectedWindow = id;
      setTimeout(() => {
        this.$forceUpdate();
      }, 400);
    });
  },
  methods: {
    togglePeek() {
      this.windowState.peek = !this.windowState.peek;
      this.preventTransition = false;
      setTimeout(() => {
        this.preventTransition = true;
      }, 200);
    },
    deactivateImmersive() {
      this.$parent.stretch = false;
      this.preventTransition = false;
      this.windowState.immersive = false;
      this.height = this.height - 24;
      setTimeout(() => {
        this.preventTransition = true;
      }, 200);
    },
    triggerImmersive() {
      this.$parent.stretch = true;
      this.hang = true;
      this.preventTransition = false;
      this.windowState.immersive = true;
      this.height = this.height + 24;
      setTimeout(() => {
        this.hang = false;
        this.preventTransition = true;
      }, 200);
    },
    toggleExpand() {
      this.preventTransitionParent = false;
      this.windowState.expanded = !this.windowState.expanded;
      this.$parent.fullscreen = this.windowState.expanded;
      if (this.windowState.expanded) {
        this.prev = [this.width, this.height, this.top, this.left];
        this.width = this.maxW - 24;
        this.height = this.maxH - (this.windowState.immersive ? 24 : 48);
        this.top = 0;
        this.left = 0;
      } else {
        this.width = this.prev[0];
        this.height = this.prev[1];
        this.top = this.prev[2];
        this.left = this.prev[3];
      }
      setTimeout(() => {
        this.preventTransitionParent = true;
      }, 600);
    },
    triggerClose() {
      this.exit = true;
      this.$parent.fullscreen = false;
    },
    eHandler(data) {
      this.width = data.width;
      this.left = data.left;
      this.height = data.height;
      this.top = data.top;
      this.event = data.eventName;
      this.windowSelected();
      this.preventTransition = true;
      if (data.eventName == 'resize:move') {
        this.windowState.expanded = false;
        this.$parent.fullscreen = false;
      }
      setTimeout(() => {
        this.preventTransition = false;
      }, 2000);
    },
    windowSelected() {
      this.$root.$emit('windowSelected', this.id);
    },
    getElevation() {
      var buffer = this.$parent.zBuffer;
      return 9999 + (buffer.length - buffer.indexOf(this.id));
    },
    rand(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    },
    getRandomX() {
      return this.rand(this.maxW / 12, this.maxW - (this.initialWidth + 120));
    },
    getRandomY() {
      return this.rand(this.maxH / 12, this.maxH - (this.initialHeight + 300));
    }
  },
  filters: {
    checkEmpty(value) {
      return typeof value !== "number" ? 0 : value;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes enter {
  to {
    transform: scale(1);
  }
}
.hide {
  .window-title {
    opacity: 0 !important;
  }
}
.not-peekable {
  height: 36px;
  pointer-events: none !important;
  opacity: 0 !important;
}
.peek-trigger {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  pointer-events: all;
  height: 36px;
  width: 100%;
  z-index: 9999;
  opacity: 1;
}
.resizable {
  padding: 0;
  font-weight: normal;
  color: black;
  position: absolute !important;
  margin-top: $bezel_width;
  margin-left: $bezel_width;
  transform: scale(0.9);
  animation: enter 200ms ease forwards;
  user-select: none; /* Non-prefixed version, currently */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -moz-user-select: none; /* Old versions of Firefox */
  -khtml-user-select: none; /* Konqueror HTML */
  -webkit-user-select: none; /* Safari */
  -webkit-touch-callout: none; /* iOS Safari */
}
.window-border {
  background: $active_window;
  padding: 12px;
  border-radius: $rad;
  box-sizing: content-box;
  backdrop-filter: $blur;
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
  transition: 100ms;
  .window-title {
    cursor: default;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .immersive-active {
    filter: invert(1) !important;
    background-color: white !important;
    opacity: 1 !important;
  }
  .immersive {
    background-image: url('../../assets/window/black_immersive.svg');
    background-size: 50%;
  }
  .minimize {
    background-image: url('../../assets/window/black_minimize.svg');
    background-size: 60%;
  }
  .expand {
    background-image: url('../../assets/window/black_expand.svg');
    background-size: 60%;
  }
  .close {
    background-image: url('../../assets/window/black_exit.svg');
    background-size: 50%;
  }
  .window-controls {
    min-width: 100px; 
  }
  .window-controls button {
    height: 24px;
    width: 24px;
    border-radius: 100%;
    border: none;
    margin-left: 8px;
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
  background: white;
  border-radius: 12px;
  box-shadow: $tight_shadow;
}
.active {
  .window-title {
    color: rgba(white, 0.8);
    font-weight: 400;
    opacity: 1;
  }
  .window-controls {
    filter: invert(1);
  }
}
.inactive {
  .window-title {
    color: rgba(black, 0.6);
    //font-weight: bold;
  }
  .window-body {
    pointer-events: none;
  }
  .window-border {
    background: $inactive_window;
  }
}
</style>
