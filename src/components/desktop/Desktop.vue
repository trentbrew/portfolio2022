<template>
  <div 
  class="desktop-container" 
  :style="stretch ? 'height: calc(100vh - 24px);' : 'height: calc(100vh - 48px);'
  ">
    <div class="backdrop">
      <video autoplay loop muted>
        <source src="../../assets/big_sur_animated.mp4" type="video/mp4"/>
        <source src="../../assets/big_sur_animated.webm" type="video/webm"/>
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
        <template v-if="window.path">
          <iframe 
          :src="window.path" 
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
      <!--div v-for="(item, index) in items" class="icon">
        TODO : grab dynamic dock items + their data and slot them
      </div-->
    </Dock>
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
    };
  },
  mounted() {
    this.$root.$on('windowSelected', (id) => {
      if (id != this.zBuffer[0]) {
        this.zBufferUpdate(id);
      }
    });

    window.addEventListener('keyup', (e) => {
      e.key == 'w' && this.pushWindow({});
    });

    this.pushWindow({
      //component: FileBrowser,
      path: 'https://open.spotify.com/embed/playlist/7uUkcVP0SpSzyt9UUS9AJT?utm_source=generator',
      title: 'Spotify',
      width: 800,
      height: 500
    });

    this.pushWindow({
      path: 'https://www.instagram.com/trent.brew/?utm_source=ig_embed&amp;utm_campaign=loading',
      title: 'Instagram',
      width: 500,
      height: 800
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
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  /*background-image: url('../../assets/macos_wallpaper.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;*/
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
</style>
