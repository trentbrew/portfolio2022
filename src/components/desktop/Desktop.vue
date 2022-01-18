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
      <Window 
      v-for="(window, index) in windows" 
      :index="index"
      :id="window.id"
      :title="window.title"
      :initialWidth="window.width"
      :initialHeight="window.height"
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
    <!--Dock :hide="fullscreen">
      <div 
      v-for="(item, index) in dockItems" 
      class="dock-item flex-center"
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
        class="dock-icon"
        :style="`background-image: url('${require(`@/assets/icons/${item.icon}`)}')`"
        >
        </div>
      </div>
    </Dock-->
  </div>
</template>

<script>
import Dock from '@/components/desktop/Dock.vue';
import Window from "@/components/desktop/Window.vue";
import FileBrowser from "vuetify-file-browser";
import { uid } from 'uid';

export default {
  name: "Desktop",
  components: {
    Dock,
    Window,
    FileBrowser // images + videos
    // Terminal
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
          icon: 't.png',
          label: 'Twitter',
          link: 'https://twitter.com/trentbrew_',
        },
        {
          icon: 'folder.png',
          label: 'Projects',
          component: 'https://open.spotify.com/embed/playlist/7uUkcVP0SpSzyt9UUS9AJT?utm_source=generator',
        },
      ]
    };
  },
  computed: {
    window: () => window,
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
  },
  destroyed() {
    window.removeEventListener('keyup', (e) => {});
  },
  methods: {
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
    //transition: 100ms;
    &:hover {
      opacity: 0.4;
      //transform: scale(1.12);
    }
  }
}
</style>
