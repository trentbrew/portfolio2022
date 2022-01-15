<template>
  <div 
  class="desktop-container" 
  :style="stretch ? 'height: calc(100vh - 64px);' : 'height: calc(100vh - 88px);'
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
        <template v-if="window.content && (window.content.substring(0,4) === 'http')">
          <iframe :src="window.content" frameborder="0"></iframe>
        </template>
        <template v-else>o hey</template>
      </Window>
    </div>
    <Dock :hide="fullscreen"/>
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
    FileBrowser
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

    window.addEventListener('keyup', (e) => {
      e.key == 'w' && this.pushWindow({});
    });

    this.$root.$on('windowSelected', (id) => {
      if (id != this.zBuffer[0]) {
        this.zBufferUpdate(id);
      }
    });

    this.pushWindow({
      content: 'http://localhost:8081/',
      title: 'Welcome!',
      width: 700,
      height: 400
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
    path(path) {
      if (path.substring(0,4) == 'http') { // embed from web
        var embed = document.createElement('iframe');
        embed.src = path;
        return embed;
      } else { // import component
        return () => import(path);
      }
    }
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
  width: 100%;
  border-radius: $rad;
}

.desktop {
  width: 100%;
  height: 100%;
  border-radius: $rad;
}

.desktop-container {
  background: linear-gradient($bezel_color, $bezel_color);
}

video {
  object-fit: cover;
  border-radius: $rad;
  width: calc(100% - 24px);
  height: 100%;
}
</style>
