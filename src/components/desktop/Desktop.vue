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
      <div 
      @click="handleItemClick(0)"
      @dblclick="() => { clicked = null; pushWindow({
        title: 'Work',
        center: true,
        width: 1100,
        height: 700,
        component: Files
      })}"
      :style="`top: 36px; left: 48px; ${clicked == 0 ? 'background: rgba(0,0,0,0.2)' : ''};`"
      class="absolute flex-column flex-center item-container"
      v-draggable
      >
        <div class="icon" :style="'background-image: url(' + require('@/assets/icons/folder.svg') + ');'"></div>
        <span class="title">Work</span>
      </div>
      <div 
      @click="handleItemClick(1)"
      @dblclick="() => { clicked = null; pushWindow({
        title: 'Resume',
        center: true,
        width: 600,
        height: 772,
        component: Resume
      })}"
      :style="`top: 160px; left: 48px; ${clicked == 1 ? 'background: rgba(0,0,0,0.2)' : ''};`"
      class="absolute flex-column flex-center item-container" 
      v-draggable
      >
        <div class="icon" :style="'background-image: url(' + require('@/assets/icons/document.svg') + ');'"></div>
        <span class="title">Resume</span>
      </div>
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
        center: item.center
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
import { Draggable } from 'draggable-vue-directive';
import Dock from '@/components/desktop/Dock.vue';
import Window from "@/components/desktop/Window.vue";
import Files from "@/components/content/Files.vue";
import Terminal from '@/components/content/Terminal.vue';
import Resume from '@/components/content/Resume.vue';

export default {
  name: "Desktop",
  directives: {
    Draggable
  },
  components: {
    Dock,
    Window,
    Files,
    Terminal,
    Resume
  },
  data() {
    return {
      windows: [],
      zBuffer: [],
      clicked: null,
      stretch: false,
      fullscreen: false,
      dockItems: [
        {
          icon: 'folder.svg',
          label: 'Work',
          component: Files,
          windowWidth: 1100,
          windowHeight: 700,
          center: true,
        },
        {
          icon: 'spotify.png',
          label: 'Spotify',
          embed: 'https://open.spotify.com/embed/playlist/7uUkcVP0SpSzyt9UUS9AJT?utm_source=generator',
        },
        {
          icon: 'term.svg',
          label: 'Terminal',
          component: Terminal
        },
        {
          icon: 't.png',
          label: 'Twitter',
          link: 'https://twitter.com/trentbrew_',
        },
        {
          icon: 'in.png',
          label: 'LinkedIn',
          link: 'https://www.linkedin.com/in/trentbrew/'
        },
        {
          icon: 'gh.svg',
          label: 'GitHub',
          link: 'https://github.com/tbrew1023'
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
    Files: () => Files,
    Resume: () => Resume
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
    handleItemClick(index) {
      this.clicked = index;
    },
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
.item-container {
    padding: 12px 18px;
    border-radius: $rad;
    cursor: pointer;
    &:hover {
        background: rgba(black, 0.1);
    }
}
.icon {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 56px;
    width: 56px;
    margin-bottom: 12px;
}
span {
    font-size: 14px;
    font-weight: bold;
    color: white;
}
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
