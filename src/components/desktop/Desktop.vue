<template>
  <div class="desktop-container">
    <div class="backdrop">
      <video autoplay loop muted src="../../assets/big_sur_animated.mp4"></video>
    </div>
    <div ref="desktop" class="desktop">
      <Window 
      v-for="(window, index) in windows" 
      :index="index"
      :id="window.id"
      :title="window.title"
      :initialWidth="window.width"
      :initialHeight="window.height"
      >{{ window.content }}
      </Window>
    </div>
    <Dock/>
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
      zBuffer: []
    };
  },
  mounted() {
    window.addEventListener('keyup', (e) => {
      e.key == 'w' && this.pushWindow({});
    });

    this.$root.$on('windowSelected', id => {
      if (id != this.zBuffer[0]) {
        this.zBufferUpdate(id);
      }
    });

    this.pushWindow({
      content: '👋🏾',
      width: 300,
      height: 400
    });
  },
  destroyed() {
    window.removeEventListener('keyup');
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
  height: calc(100vh - 88px);
  width: 100%;
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
