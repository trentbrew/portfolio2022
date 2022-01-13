<template>
  <div class="desktop-container">
    <div class="backdrop">
      <video autoplay loop muted src="../../assets/big_sur_animated.mp4"></video>
    </div>
    <div ref="desktop" class="desktop">
      <Window 
      v-for="(window, index) in windows" 
      :index="index"
      :title="window.title"
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

export default {
  name: "Desktop",
  components: {
    Dock,
    Window,
    FileBrowser
  },
  data() {
    return {
      windows: []
    };
  },
  mounted() {
    this.windows.push({
      title: 'Embed test',
      content: 'o hai'
    });

    console.log('windows ', this.windows);
  },
  methods: {
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
