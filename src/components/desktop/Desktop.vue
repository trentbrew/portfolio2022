<template>
  <div
  class="desktop-container" 
  :style="stretch ? 'height: calc(100vh - 24px);' : 'height: calc(100vh - 48px);'"
  >
    <div class="backdrop">
      <!--video autoplay loop muted>
        <source src="../../assets/videos/big_sur_animated.mp4" type="video/mp4"/>
        <source src="../../assets/videos/big_sur_animated.webm" type="video/webm"/>
      </video-->
    </div>
    <div ref="desktop" class="desktop">
      <!--div 
      @click="handleItemClick(0)"
      @dblclick="() => { clicked = null; pushWindow({
        title: 'Work',
        center: true,
        width: 1100,
        height: 700,
        component: Work
      })}"
      :style="`top: 36px; left: 48px; ${clicked == 0 ? 'background: rgba(0,0,0,0.4)' : ''};`"
      class="absolute flex-column flex-center item-container"
      v-draggable
      >
        <div class="icon" :style="'background-image: url(' + require('@/assets/icons/folder.svg') + ');'"></div>
        <span class="title">Work</span>
      </div-->
      <!--div 
      @click="handleItemClick(1)"
      @dblclick="() => { clicked = null; pushWindow({
        title: 'Resume',
        center: true,
        width: 600,
        height: 772,
        component: Resume
      })}"
      :style="`top: 160px; left: 48px; ${clicked == 1 ? 'background: rgba(0,0,0,0.4)' : ''};`"
      class="absolute flex-column flex-center item-container" 
      v-draggable
      >
        <div class="icon" :style="'background-image: url(' + require('@/assets/icons/document.svg') + ');'"></div>
        <span class="title">Resume</span>
      </div-->
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
        class="tooltip flex-center absolute"
        >
          <span>{{ item.label }}</span>
          <div v-if="item.newtab" class="newtab"></div>
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
import Work from "@/components/content/Work.vue";
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
    Work,
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
          icon: 'folder_square.svg',
          label: 'Work',
          component: Work,
          windowWidth: 1100,
          windowHeight: 660,
          center: true,
        },
        {
          icon: 'music_color.svg',
          label: "Music",
          embed: 'https://open.spotify.com/embed/playlist/7uUkcVP0SpSzyt9UUS9AJT?utm_source=generator&theme=0',
        },
        {
          icon: 't_color.svg',
          label: 'Twitter',
          link: 'https://twitter.com/trentbrew_',
          newtab: true,
        },
        {
          icon: 'gh_color.svg',
          label: 'GitHub',
          link: 'https://github.com/tbrew1023',
          newtab: true,
        },
        {
          icon: 'term.svg',
          label: 'Terminal',
          component: Terminal,
        },
        {
          icon: 'document_square.svg',
          label: 'Resume',
          component: Resume,
          windowWidth: 600,
          windowHeight: 770,
          center: true,
        },
        {
          icon: 'mail2.svg',
          label: 'Mail',
          link: 'mailto:hello@trentbrew.com',
          newtab: true,
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
    Work: () => Work,
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
      item = {...item, open: false};
    });
  },
  destroyed() {
    window.removeEventListener('keyup', (e) => {});
  },
  methods: {
    handleItemClick(index) {
      this.clicked = index;
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
.newtab {
  background-image: url('../../assets/icons/newtab.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 14px;
  width:  14px;
  margin-left: 6px;
}

.item-container { // desktop item
    padding: 12px 18px;
    border-radius: $rad;
    cursor: pointer;

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

    &:hover {
        background: rgba(black, 0.2);
    }
}

.backdrop {
  position: absolute;
  height: $ui_height;
  width: $ui_width;
  border-radius: $rad;
  background: $laptop_background;
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
  width: 56px;
  height: 56px;
  margin: 12px 9px;
  transition: 200ms;
  cursor: pointer;

  .tooltip {
    position: absolute;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-64px);
    padding: 12px;
    border-radius: $rad;
    color: white;
    transition: 200ms;
  }
  
  .dock-icon {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:hover {
    transform: translateY(-8px);

    .dock-icon {
      //opacity: 0.6;
    }

    .tooltip {
      opacity: 1;
      background: $active_window;
      backdrop-filter: $blur;
      transform: translateY(-80px);
    }
  }
}
</style>
