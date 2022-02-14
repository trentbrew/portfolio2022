<template>
  <div
  class="desktop-container" 
  :style="stretch ? 'height: calc(100vh - 24px);' : 'height: calc(100vh - 48px);'"
  >
    <div class="backdrop">
      <!--GradientMesh :index="3" /-->
    </div>
    <div ref="desktop" class="desktop">
      <!--div 
      @click="() => { clicked = null; pushWindow({
        title: 'about.md',
        center: true,
        width: 700,
        height: 600,
        embed: 'https://trentovershares.web.app/about'
      })}"
      class="item-container absolute flex-column flex-center" 
      :style="`top: 48px; left: 48px; ${clicked == 1 ? 'background: rgba(0,0,0,0.4)' : ''};`"
      >
        <div class="icon" :style="'background-image: url(' + require('@/assets/icons/document.svg') + ');'"></div>
        <span class="title">about.md</span>
      </div-->
      <Window 
      v-for="(window, index) in windows"
      :key="index"
      :index="index"
      :id="window.id"
      :title="window.title"
      :initialWidth="window.width"
      :initialHeight="window.height"
      :center="window.center"
      :embed="window.embed"
      :video="window.video"
      >
        <template v-if="window.embed">
          <iframe :id="window.id" :src="window.embed" frameborder="0"></iframe>
        </template>

        <template v-if="window.component">
          <component :is="window.component"></component>
        </template>

        <template v-if="window.image">
          <div style="overflow: hidden;">
            <img 
            :src="require(`@/content/${window.image}`)" 
            style="border-radius: 8px; width: 100%; max-height: 100%;"
            />
          </div>
        </template>

        <template v-if="window.video">
          <div style="overflow: hidden; width: 100%; height: 100%' background: black; border-radius: 8px;">
            <video
            :id="window.id"
            :src="require(`@/content/${window.video}`)" 
            width="100%"
            height="100%"
            autoplay
            controls
            style="border-radius: 8px; height: 100%; width: 100%; object-fit: contain;"
            />
          </div>
        </template>
        
        <template v-if="window.casestudy">
          <div style="overflow: auto; border-radius: 8px; padding-right: 12px;">
            <img 
            :src="require(`@/content/${window.casestudy}`)" 
            style="width: 100%;"
            />
          </div>
        </template>


      </Window>
    </div>
    <Dock :hide="fullscreen">
      <div 
      v-for="(item, index) in dockItems"
      :key="index"
      class="dock-item flex-center"
      @click="item.link ? window.open(item.link, '_blank') : pushWindow({
        title: item.label || 'Title',
        link: item.link || null,
        embed: item.embed || null, // String
        component: item.component || null, // Component
        image: item.image || null, // String 
        width: item.windowWidth || 600, // Number
        height: item.windowHeight || 400, // Nmuber
        positionX: item.windowPositionX || getRandomX(), // Number
        positionY: item.windowPositionY || getRandomY(), // Number
        center: item.center,
      })"
      >
        <div class="tooltip flex-center absolute">
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
import { uid } from 'uid/secure';
import { Draggable } from 'draggable-vue-directive';
import Dock from '@/components/desktop/Dock.vue';
import Window from "@/components/desktop/Window.vue";
import Work from "@/components/content/Work.vue";
import Terminal from '@/components/content/Terminal.vue';
import Resume from '@/components/content/Resume.vue';
import GradientMesh from '@/components/GradientMesh.vue';
import Gallery from '@/components/content/Gallery.vue';
import Content from '@/components/content/Content.vue';
import About from '@/components/content/About.vue';

export default {
  name: "Desktop",
  directives: {
    Draggable,
  },
  components: {
    Dock,
    Window,
    Work,
    Terminal,
    Resume,
    GradientMesh,
    Gallery,
    Content,
    About,
  },
  data() {
    return {
      windows: [],
      activeWindows: [],
      zBuffer: [],
      zBufferSet: [],
      clicked: null,
      stretch: false,
      fullscreen: false,
      dockItems: [
        {
          icon: 'folder_square.svg',
          label: 'Projects',
          component: Work,
          windowWidth: 1100,
          windowHeight: 560,
          center: true,
        },
        {
          icon: 'music_color.svg',
          label: "Music",
          embed: 'https://open.spotify.com/embed/playlist/7uUkcVP0SpSzyt9UUS9AJT?utm_source=generator&theme=0',
        },
        {
          icon: 'writing.svg',
          label: 'About',
          component: About,
          windowWidth: 800,
          windowHeight: 445,
          center: true,
        },
        {
          icon: 'document_square.svg',
          label: 'Resume',
          component: Resume,
          windowWidth: 900,
          windowHeight: 700,
          center: true,
        },
        {
          icon: 'gh_color.svg',
          label: 'GitHub',
          link: 'https://github.com/trentbrew',
          newtab: true,
        },
        {
          icon: 't_color.svg',
          label: 'Twitter',
          link: 'https://twitter.com/trent_brew',
          newtab: true,
        },
        {
          icon: 'in.svg',
          label: 'LinkedIn',
          link: 'https://linkedin.com/in/trentbrew',
          newtab: true,
        },
        {
          icon: 'mail2.svg',
          label: 'Mail',
          link: 'mailto:hello@trentbrew.com',
          newtab: true,
        },
        /*{
          icon: 'term.svg',
          label: 'Terminal',
          component: Terminal,
        },*/
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
    Resume: () => Resume,
  },
  mounted() {
    if (window.location.pathname == '/desktop') {
      this.pushWindow({
        title: 'Projects',
        component: Work,
        width: 1100,
        height: 560,
        center: true,
      });
    }
    this.$root.$on('closedWindow', (id) => {
      this.$root.$emit('windowSelected', this.zBufferSet[1]);
    });
    this.$root.$on('windowSelected', (id) => {
      if (id != this.zBuffer[0]) {
        this.zBufferUpdate(id);
      }
    });
    this.$root.$on('cardClicked', (project) => {
      console.log(project);
      if (project.wip) {
        this.pushWindow({
          title: 'Coming soon...',
          image: 'animations/comingsoon.gif',
          width: 360,
          height: 275,
          center: true,
        });
      } else if (project.content.link) {
        window.open(project.content.link, '_blank');
      } else {
        this.pushWindow({
          title: project.title == "Don't Touch the Walls" ? "Play on your phone!" : project.title,
          embed: project.content.embed || null,
          link: project.content.link || null,
          image: project.content.image || null,
          video: project.content.video || null,
          casestudy: project.content.casestudy || null,
          width: parseInt(project.dims.split('x')[0]),
          height: parseInt(project.dims.split('x')[1]),
          center: true,
        });
      }
    });
    this.$root.$on('galleryClicked', (image) => {
      this.pushWindow({
        //title: image.substring(image.indexOf('/') + 1),
        title: ' ',
        image: image,
        width: 600,
        height: 600,
      });
    });
    this.dockItems.forEach(item => {
      item = {...item, open: false};
    });
    window.addEventListener('keyup', (e) => { // for debugging
      (e.key == 't' || e.key == 'T') && this.pushWindow({
        title: 'Terminal',
        component: Terminal,
        width: 600,
        height: 400,
      });
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
      latest.id = uid(8);
      this.zBufferUpdate(latest.id);
    },
    zBufferUpdate(id) {
      // [0] is top of z-index
      this.zBuffer = [id, ...this.zBuffer];
      this.zBufferSet = Array.from(new Set(this.zBuffer));
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
  opacity: 0.5;
  filter: invert(0);
}

.item-container { // desktop item
    padding: 24px 18px 18px 18px;
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
  background-color: $laptop_background;
  background-image: url('../../assets/peekaboo2.png');
  background-size: cover;
  background-position: bottom right;
  background-repeat: no-repeat;
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
    transition: 200ms;
    color: $active_text;
    background: $active_window;
    backdrop-filter: $blur;
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
      backdrop-filter: $blur;
      transform: translateY(-80px);
    }
  }
}

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(white, 1);
    border-radius: 8px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(white, 0.4);
  }
</style>
