<template>
  <div class="desktop-container">
    <div class="backdrop">
      <video autoplay loop muted src="../../assets/big_sur_animated.mp4"></video>
    </div>
    <div ref="desktop" class="desktop">
      <!-- append windows here -->
      <Window :index="0" :title="'Window 1'" />
      <!--Window :index="1" :title="'Files'">
        <file-browser :axiosConfig="{baseURL: 'http://localhost:8081'}" />
      </Window>
      <Window :index="2" :title="'Resume'">
        <embed src="../../assets/resume.pdf" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></embed>
      </Window-->
    </div>
  </div>
</template>

<script>
import Window from "@/components/desktop/Window.vue";
import FileBrowser from "vuetify-file-browser";

export default {
  name: "Desktop",
  components: {
    Window,
    FileBrowser
  },
  data() {
    return {};
  },
  computed: {},
  props: {},
  mounted() {
    console.log("Desktop.vue mounted");
    console.log("window count: ", this.getWindowCount());
  },
  methods: {
    getWindowCount() {
      return this.$refs.desktop.children.length;
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
  width: 100%;
  border-radius: $rad;
}

.desktop {
  height: $ui_height;
  width: 100%;
  border-radius: $rad;
}

.desktop-container {
  background: linear-gradient(black, $bezel_color);
}

video {
  object-fit: cover;
  border-radius: $rad;
  width: calc(100% - 24px);
  height: 100%;
}
</style>
