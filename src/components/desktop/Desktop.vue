<template>
  <div
  class="desktop-container" 
  :style="stretch ? 'height: calc(100vh - 24px);' : 'height: calc(100vh - 48px);'"
  >
    <div class="backdrop">
      <video autoplay loop muted>
        <source src="../../assets/videos/big_sur_animated.mp4" type="video/mp4"/>
        <source src="../../assets/videos/big_sur_animated.webm" type="video/webm"/>
      </video>
    </div>
    <div ref="desktop" class="desktop">
      <Item />
      <Window 
      v-for="(window, index) in windows" 
      :index="index"
      :id="window.id"
      :title="window.title"
      :initialWidth="window.width"
      :initialHeight="window.height"
      :center="window.center"
      >
        <template v-if="window.embed">
          <iframe 
          :src="window.embed" 
          frameborder="0"
          >
          </iframe>
        </template>
        <template v-if="window.component">
          <component :is="window.component"></component>
        </template>
      </Window>
    </div>
    <Dock :hide="fullscreen">
      <div 
      v-for="(item, index) in dockItems" 
      class="dock-item flex-center"
      @mouseenter="handleItemMouseEnter(index)"
      @mouseleave="handleItemMouseLeave(index)"
      @click="item.link ? window.open(item.link, '_blank') : pushWindow({
        title: item.label || 'Title',
        link: item.link || null,
        embed: item.embed || null, // String
        component: item.component || null, // Component
        width: item.windowWidth || 600, // Number
        height: item.windowHeight || 400, // Nmuber
        positionX: item.windowPositionX || getRandomX(), // Number
        positionY: item.windowPositionY || getRandomY(), // Number
      })"
      >
        <div 
        class="tooltip-container flex-center absolute"
        :class="item.hover ? 'tooltip-active' : 'tooltip-inactive'" 
        >
          {{ item.label }}
        </div>
        <div 
        class="dock-icon"
        :style="`background-image: url('${require(`@/assets/icons/${item.icon}`)}')`"
        >
        </div>
      </div>
    </Dock>
  </div>
</template>

<script>
import { uid } from 'uid';
import Item from '@/components/desktop/Item.vue';
import Dock from '@/components/desktop/Dock.vue';
import Window from "@/components/desktop/Window.vue";
import Files from "@/components/content/Files.vue";
import Terminal from '@/components/content/Terminal.vue';

export default {
  name: "Desktop",
  components: {
    Item,
    Dock,
    Window,
    Files,
    Terminal
    // Resume
    // Settings
    // Notes
    // --- projects will be iframes + Notes ---
  },
  data() {
    return {
      windows: [],
      zBuffer: [],
      stretch: false,
      fullscreen: false,
      dockItems: [
        {
          icon: 'spotify.png',
          label: 'Spotify',
          embed: 'https://open.spotify.com/embed/playlist/7uUkcVP0SpSzyt9UUS9AJT?utm_source=generator',
        },
        {
          icon: 'folder.png',
          label: 'Files',
          component: Files
        },
        {
          icon: 't.png',
          label: 'Twitter',
          link: 'https://twitter.com/trentbrew_',
        },
      ]
    };
  },
  props: {
    popup: Boolean
  },
  watch: {
    popup(val) {
      console.log('popup', val);
      setTimeout(() => {
        this.pushWindow({
          title: 'Terminal',
          component: Terminal,
          width: 800,
          height: 450,
          center: true
        });
      }, 2000);
    }
  },
  computed: {
    window: () => window,
    console: () => console,
    maxW: () => window.innerWidth,
    maxH: () => window.innerHeight,
  },
  mounted() {
    this.$root.$on('windowSelected', (id) => {
      if (id != this.zBuffer[0]) {
        this.zBufferUpdate(id);
      }
    });
    window.addEventListener('keyup', (e) => { // for debugging
      e.key == 'w' && this.pushWindow({});
    });
    this.dockItems.forEach(item => {
      item = {...item, hovering: false};
    });
  },
  destroyed() {
    window.removeEventListener('keyup', (e) => {});
  },
  methods: {
    handleItemMouseEnter(index) {
      this.dockItems[index].hovering = true;
      console.log('mouseenter');
      this.$forceUpdate();
    },
    handleItemMouseLeave(index) {
      this.dockItems[index].hovering = false;
      console.log('mouseleave');
      this.$forceUpdate();
    },
    pushWindow(data) {
      this.windows.push(data);
      var latest = this.windows[this.windows.length - 1];
      latest.id = uid(16);
      this.zBufferUpdate(latest.id);
    },
    zBufferUpdate(id) {
      this.zBuffer = [id, ...this.zBuffer];
    },
    random(min, max) {
      Math.random() * (max - min) + min
    },
    getRandomX() {
      return this.random(0, this.maxW - 24);
    },
    getRandomY() {
      return this.random(0, this.maxH - 24);
    }
  },
};
</script>

<style lang="scss" scoped>
.tootip-active {
  opacity: 1;
  transform: translateY(-64px);
}
.tooltip-inactive {
  opacity: 0;
  transform: translateY(-120px);
}
.tooltip {
  position: absolute;
  pointer-events: none;
  background: black;
  padding: 12px;
  border-radius: $rad;
  color: white;
  transition: 200ms;
}
.backdrop {
  position: absolute;
  height: $ui_height;
  border-radius: $rad;
}
.desktop-container {
  background: linear-gradient($bezel_color, $bezel_color);
}
.desktop {
  width: 100%;
  height: 100%;
  border-radius: $rad;
}
video {
  object-fit: cover;
  border-radius: $rad;
  width: calc(100vw - $bezel_width * 2);
  height: 100%;
}
.dock-item {
  width: 42px;
  height: 42px;
  margin: 0px 5px;
  cursor: pointer;
  .dock-icon {
    width: 32px;
    height: 32px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
