<template>
<div class="root">
  <div class="absolute skip" @click="window.open('https://trentbrew.com/desktop', '_self')">
    Skip ahead to my work
  </div>
  <div 
  class="intro-container flex-center fill-screen" 
  :style="`${clicked ? 'background: black' : ( hovering ? 'background: #BCC3C9' : 'background: #CFD5DB' )};`"
  >
    <div v-if="!unveil" class="veil absolute flex-center fill-screen">
      <svg height="400" viewBox="0 0 1400 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="path1" d="M100 0V600C100 700 160 900 400 900" stroke="#3B454E" stroke-width="200"/>
        <path class="path2" d="M560 300H193.5" stroke="#3B454E" stroke-width="200"/>
        <path class="path3" d="M700 0V600C700 700 760 900 1000 900C1240 900 1300 700 1300 600C1300 500 1240 300 1000 300H840" stroke="#3B454E" stroke-width="200"/>
      </svg>
    </div>
    <div class="zoomable">
      <div 
      :class="clicked ? 'next window window-hover flex-center' : ( boot ? 'window window-hover flex-center' : 'window flex-center')" 
      @mouseenter="handleMouseEnter" 
      @mouseleave="handleMouseLeave" 
      @click="handleClick"
      >
        <div class="laptop-aura" :style="clicked && 'transition-delay: 20s !important'"></div>
        <div class="laptop">
          <div class="base">
            <div class="side top"></div>
            <div class="side bottom"></div>
            <div class="side right"></div>
            <div class="side left"></div>
            <div class="side front"></div>
            <div class="side back"></div>
          </div>
          <div class="lid">
            <div class="side top"></div>
            <div class="side bottom">
              <div class="screen" :style="`${ popup && 'display: none;' }`">
                <!--GradientMesh :index="1"/-->
                <img :src="`${boot ? require('@/assets/intro-gifs/boot.gif') : require('@/assets/intro-gifs/glitch1.gif')}`" width="100%" height="100%" />
              </div>
            </div>
            <div class="side right"></div>
            <div class="side left"></div>
            <div class="side front"></div>
            <div class="side back"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div 
  class="absolute" 
  :class="clicked ? 'desktop-modal-transition' : 'desktop-modal'"
  :style="`${hovering && 'animation-play-state: paused'};`"
  >
    <!--GradientMesh :index="2" :style="`${popup && 'display: none;'}`" /-->
  </div>
  <div 
  class="desktop-modal-final absolute"
  :style="desktopReady ? `
    opacity: 1;
    pointer-events: all;
    transition: 1600ms cubic-bezier(0.85, 0, 0.15, 1);
  ` : `
    opacity: 0;
    pointer-events: none;
    transition: 1600ms cubic-bezier(0.85, 0, 0.15, 1);
  `"
  >
    <Screen :popup="popup" />
  </div>
</div>
</template>

<script>
import Screen from '@/views/Screen.vue';
import GradientMesh from '@/components/GradientMesh.vue';

export default {
  name: "Intro",
  components: {
    Screen,
    GradientMesh,
  },
  data() {
    return {
      unveil: false,
      clicked: false,
      boot: false,
      desktopReady: false,
      hovering: false,
      allowClick: false,
      popup: false
    };
  },
  computed: {
    window: () => window,
  },
  mounted() {
    window.addEventListener('keyup', (e) => {
      (e.key == 's' || e.key == 'S') && window.open('https://trentbrew.com/desktop', '_self');
    });
    setTimeout(() => {
      this.unveil = true;
    }, 8000);
  },
  destroyed() {
    window.removeEventListener('keyup', (e) => {});
  },
  methods: {
    handleMouseEnter() {
      this.hovering = true;
      setTimeout(() => {
        this.allowClick = true;
      }, 1200);
      console.log('mouseenter');
    },
    handleMouseLeave() {
      this.hovering = false;
      this.allowClick = false;
      console.log('mouseleave');
    },
    handleClick() {
      console.log(this.allowClick);
      if (this.allowClick) {
        console.log('valid click ✅');
        this.boot = true;
        setTimeout(() => {
          this.clicked = true;
        }, 2650);
        setTimeout(() => {
          this.desktopReady = true;
          this.popup = true;
        }, 5500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$hover-transition: 1s;

$base-timing: 1s;
$base-ease: ease;
$base-delay: 0s;

$lid-timing-in: 1.5s;
$lid-timing-out: 400ms;
$lid-ease-in: ease;
$lid-ease-out: ease;
$lid-delay-out: 0ms;
$lid-delay-in: 150ms;

$laptop_color: #EDEDF1;
$laptop_height: 11em; // 161px
$laptop_width: 15em; // 225px

$trackpad_color: #CFD5DB;
$keyboard_color: #3B454E;
$keyboard_frame_color: $trackpad_color;

$pulse_delay: 7.6s;

$background: $trackpad_color;

@keyframes settle {
  to {
    transform: scale(2.4);
  }
}

@keyframes pulse {
  0% {
    transform: scale(2);
  }
  70% {
    transform: scale(2.3);
    box-shadow: 0 0 0 50px rgba($keyboard_color, 0);
  }
  100% {
    transform: scale(2);
    box-shadow: 0 0 0 0 rgba($keyboard_color, 0);
  }
}

@keyframes unveil {
  to {
    opacity: 0;
  }
}

@keyframes logo-shrink {
  to {
    height: 35px;
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.skip {
  color: $japanese_indigo;
  bottom: 64px; 
  left: 64px; 
  opacity: 0.4;
  z-index: 99999;
  font-size: 16px;
  transition: 200ms;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  span {
    background: $japanese_indigo;
    padding: 2px 8px 4px 8px;
    line-height: 0px;
    border-radius: 6px;
    color: white;
  }

}

video {
  object-fit: cover;
}

.desktop-modal-final {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  z-index: 999999;
}

.desktop-modal {
  position: absolute;
  margin: auto;
  opacity: 0;
  top: -212px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 18.5vh;
  height: 12.5vh;
  /*background-image: url('../assets/subtle_wallpaper2.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;*/
  background: black;
  pointer-events: none;
  transition: 1500ms cubic-bezier(0.33, 1, 0.68, 1), opacity 0s;
  animation: pulse 2s ease infinite $pulse_delay;
  z-index: 999999;
}

.desktop-modal-transition {
  position: absolute;
  margin: auto;
  opacity: 1;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  transform: scale(2.36);
  border-radius: 12px;
  box-sizing: border-box;
  border: solid $bezel_color;
  border-width: 6px;
  /*background-image: url('../assets/subtle_wallpaper2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;*/
  background: #222527;
  width: 42.37288vw;
  height: 42.37288vh;
  pointer-events: none;
  transition: 3.5s cubic-bezier(0.83, 0, 0.17, 1), opacity 0s;
  animation-play-state: paused !important;
  z-index: 999999;

  video {
    border-radius: 6px;
  }
}

.zoomable {
  transition: 3s;
}


.next {
  opacity: 0 !important;
}

.mini-desktop {
   zoom: 0.154;
}

.intro-container {
  transition: 3.3s;
  background: $background;
  overflow: hidden;
}

.veil {
  background: $background;
  z-index: 999;
  animation: unveil 4s ease forwards 6.3s;
}

svg {
  transform: translate(0px, 0px);
  animation: logo-shrink 3.5s cubic-bezier(0.87, 0, 0.13, 1) forwards 3s;
}

.path1 {
  stroke-dasharray: 1076;
  stroke-dashoffset: 1076;
  animation: draw 2s ease forwards 1s;
}

.path3 {
  stroke-dasharray: 3000;
  stroke-dashoffset: 3000;
  animation: draw 2.2s ease-in forwards 1.8s;
}

.path2 {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: draw 2.78s cubic-bezier(0, 0.55, 0.45, 1) forwards 3.66s;
}

.window {
  height: 20em;
  width: 20em;
  position: relative;
  perspective: 90em;
  opacity: 1;
  font-size: 15px;
  transform: scale(2);
  cursor: pointer;
  transition: opacity 1s !important;
  animation: pulse 2s ease infinite $pulse_delay;
}

.laptop-aura {
  position: absolute;
  margin: auto;
  left: 0; right: 0;
  top: 0; bottom: 0;
  opacity: 1;
  height: $laptop_height * 0.15;
  width: $laptop_width * 0.25;
  box-shadow: 0 0 0 0 rgba($laptop_color, 1);
  animation: pulse 2s ease infinite $pulse_delay;
  transition: 500ms;
}

.laptop {
  height: $laptop_height;
  width: $laptop_width;
  position: absolute;
  left: 2.5em;
  top: 4.5em;
  transform: rotateZ(180deg);
  transform-style: preserve-3d;
  transition: all $base-timing ease
  //box-shadow: $light_shadow;
}

.window:hover, .window-hover {
  animation-play-state: paused;
}

.window:hover .laptop {
  box-shadow: none;
  transform: rotateZ(0deg) rotateY(0deg) rotateX(65deg);
  top: 9em;
}

.window-hover .laptop {
  box-shadow: none;
  transform: rotateZ(0deg) rotateY(0deg) rotateX(65deg);
  top: 9em;
}

.window:hover .laptop-aura {
  opacity: 0;
  width: 0px;
  height: 0px;
  animation-play-state: paused;
  //transition-delay: 2s;
}

.window-hover .laptop-aura {
  opacity: 0;
  width: 0px;
  height: 0px;
  animation-play-state: paused;
  //transition-delay: 2s;
}

.window:hover .laptop .base:after {
  /*bottom: 100%;
  filter: blur(1em);
  background: #0000;*/
}

.laptop .base {
  position: absolute;
  left: 0; right: 0;
  top: 0; bottom: 0;
  transition: 3s;
  transform-style: preserve-3d;
}

.laptop .base:after {
 /* content: '';
  position: absolute;
  bottom: .2em; top: .2em;
  left: .2em; right: .2em;
  background: #00000022; // screen glow
  transition: all 2000ms;
  filter: blur(.1em);*/
}

.laptop .base .side {
  position: absolute;
}

.laptop .base .side.top { // laptop base
  //background: linear-gradient(45deg, #bbb 0%, #999 30%, #666 100%);
  background: $laptop_color;
  top: 0; bottom: 0;
  left: 0; right: 0;
}

.laptop .base .side.top:before { // keyboard
  content: '';
  position: absolute;
  left: 1em; right: 1em;
  top: .5em; bottom: 5.5em;
  border-radius: .1em;
  background-color: $keyboard_color;
  background-image: repeating-linear-gradient(0deg, transparent 0, transparent .8em, $keyboard_frame_color .9em, $keyboard_frame_color 1em), repeating-linear-gradient(90deg, transparent 0, transparent 0.9em, $keyboard_frame_color 0.9em, $keyboard_frame_color 1.1em);
}

.laptop .base .side.top:after { // trackpad
  content: '';
  position: absolute;
  left: 4.5em; right: 4.5em;
  top: 6.5em; bottom: 1em;
  background: $trackpad_color;
  border-radius: .1em;
  //border: .05em solid #0003;
}

.laptop .base .side.bottom { // bottom of laptop
  //background: linear-gradient(45deg, #bbb 0%, #999 30%, #666 100%);
  background: $laptop_color;
  top: 0; bottom: 0;
  left: 0; right: 0;
  transform: translateZ(-0.3em) rotateX(-180deg);
}

.laptop .base .side.right {
  background: $laptop_color;
  top: 0; bottom: 0;
  left: 0; width: .3em;
  transform: translateX(14.85em) translateZ(-.15em) rotateY(90deg);
}

.laptop .base .side.left {
  background: $laptop_color;
  top: 0; bottom: 0;
  left: 0; width: .3em;
  transform: translateX(-.15em) translateZ(-.15em) rotateY(90deg);
}

.laptop .base .side.right:before, .laptop .base .side.right:after, 
.laptop .base .side.left:before, .laptop .base .side.left:after {
  content: '';
  background: #000a;
  width: .15em; height: .5em;
  position: absolute;
  left: .05em;
  border-radius: 1em
}

.laptop .base .side.right:before, .laptop .base .side.left:before {
  top: .5em;
}

.laptop .base .side.right:after, .laptop .base .side.left:after {
  top: 1.3em;
}

.laptop .base .side.front {
  background: $trackpad_color;
  top: 0; height: .3em;
  left: 0; right: 0;
  transform: translateY(10.85em) translateZ(-.15em) rotateX(90deg);
}

.laptop .base .side.back {
  background: $laptop_color;
  top: 0; height: .3em;
  left: 0; right: 0;
  transform: translateY(-.15em) translateZ(-.15em) rotateX(90deg);
}

.laptop .lid {
  position: absolute;
  left: 0; right: 0;
  top: 0; bottom: 0;
  transition: $lid-timing-out $lid-ease-out $lid-delay-out;
  transform-origin: top;
  transform-style: preserve-3d;
}

.window:hover .laptop .lid { // open lid
  transform: rotateX(115deg);
  transition-timing-function: $lid-ease-in;
  transition-delay: $lid-delay-in;
  transition-duration: $lid-timing-in; 
}

.window-hover .laptop .lid { // open lid
  transform: rotateX(115deg);
  transition-timing-function: $lid-ease-in;
  transition-delay: $lid-delay-in;
  transition-duration: $lid-timing-in; 
}

.laptop .side {
  //box-shadow: 0 0 .05em .0em #aaa;
}

.laptop .lid .side {
  position: absolute;
}

.laptop .lid .side.top { // laptop lid
  //background: linear-gradient(45deg, rgb(134, 105, 105) 0%, #999 30%, #666 100%);
  background: $laptop_color;
  top: 0; bottom: 0;
  left: 0; right: 0;
  transform: translateZ(.2em);
}

.laptop .lid .side.top:before { // laptop logo
  content: url('../assets/logo_icon.svg');
  top: 4.7em; bottom: 4.7em;
  left: 6.7em; right: 6.7em;
  transform: rotate(180deg);
  //opacity: 0.4;
  position: absolute;
  border-radius: 50%;
}

.laptop .lid .side.bottom { // screen bezel
  background: $keyboard_color;
  top: 0; bottom: 0;
  left: 0; right: 0;
  transform: rotateX(180deg);
}

.laptop .lid .side.bottom:before { // screen bezel logo
  content: '';
  position: absolute;
  height: .3em; width: 2em;
  bottom: .3em; left: 6.5em;
  background: #fff3;
  display: none;
}

.laptop .lid .side.bottom:after {
  content: '';
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  //background-image: linear-gradient(25deg, transparent 25%, #fff1 27%, #fff4 40%, transparent 45%);
  background-position: 0% 300%;
  background-size: 40em 40em;
  transition: all 800ms;
}

.window:hover .laptop .lid .side.bottom:after {
  background-position: 0% 0%;
}

.laptop .lid .side.right {
  background: $trackpad_color;
  top: 0; bottom: 0;
  left: 0; width: .2em;
  transform: translateX(14.9em) translateZ(.1em) rotateY(90deg);
}

.laptop .lid .side.left {
  background: $trackpad_color;
  top: 0; bottom: 0;
  left: 0; width: .2em;
  transform: translateX(-.1em) translateZ(.1em) rotateY(90deg);
}

.laptop .lid .side.front {
  background: $laptop_color;
  top: 0; height: .2em;
  left: 0; right: 0;
  transform: translateY(10.9em) translateZ(.1em) rotateX(90deg);
}

.laptop .lid .side.back {
  background: $laptop_color;
  top: 0; height: .2em;
  left: 0; right: 0;
  transform: translateY(-.1em) translateZ(.1em) rotateX(90deg);
}

.laptop .screen { // laptop screen
  position: absolute;
  top: .7em; bottom: .8em;
  left: .2em; right: .2em;
  border-radius: .1em;
  /*background-image: url('../assets/laptop_screen.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;*/
  overflow: hidden;
  background: $laptop_background;
  //background: linear-gradient(to bottom right, #FFF152, #FFA84A);
  //border-top: .3em solid rgba(0,0,0,0.2);
}

</style>
