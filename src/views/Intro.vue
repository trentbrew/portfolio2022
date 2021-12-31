<template>
  <div class="intro-container flex-center fill-screen">
    <div v-if="!unveil" class="veil absolute flex-center fill-screen">
      <svg height="400" viewBox="0 0 1400 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="path1" d="M100 0V600C100 700 160 900 400 900" stroke="#3B454E" stroke-width="200"/>
        <path class="path2" d="M560 300H193.5" stroke="#3B454E" stroke-width="200"/>
        <path class="path3" d="M700 0V600C700 700 760 900 1000 900C1240 900 1300 700 1300 600C1300 500 1240 300 1000 300H840" stroke="#3B454E" stroke-width="200"/>
      </svg>
    </div>
    <div class="window">
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
            <div class="screen"><img src="https://c.neevacdn.net/image/fetch/s--cAHCxm0M--/https%3A//thesweetbits.com/wp-content/uploads/2021/04/iMac-hello-wallpaper.jpeg?savepath=iMac-hello-wallpaper.jpeg" width="100%" height="100%" alt=""></div>
          </div>
          <div class="side right"></div>
          <div class="side left"></div>
          <div class="side front"></div>
          <div class="side back"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intro",
  components: {},
  data() {
    return {
      unveil: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.unveil = true;
    }, 7500);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$base-timing: 1500ms;
$base-ease: ease;
$base-delay: 0ms;

$lid-timing: 1500ms;
$lid-ease: ease-out;
$lid-delay: 0ms;

$keyboard_color: #3B454E;
$trackpad_color: #CFD5DB;

$laptop_color: #EDEDF1;

.veil {
  background: $lighter_gray;
  z-index: 999;
  animation: unveil 1s ease forwards 6s;
}

svg {
  transform: translate(0px, 1px);
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

@keyframes unveil {
  to {
    opacity: 0;
  }
}

@keyframes logo-shrink {
  to {
    height: 24px;
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes enter-laptop {
  to {
    opacity: 1;
    transform: scale(1.5);
  }
}

.intro-container {
  background: $white;
}

.window {
  height: 20em;
  width: 20em;
  position: relative;
  perspective: 90em;
  opacity: 1;
  transform: scale(1.4);
  font-size: 15px;
  cursor: pointer;
  transition: 800ms;
  //animation: enter-laptop 5s ease forwards 5s;

  &:hover {
    transform: scale(1.6);
  }
}

.laptop {
  height: 11em;
  width: 15em;
  position: absolute;
  left: 2.5em;
  top: 4.5em;
  transform: rotateZ(180deg);
  transform-style: preserve-3d;
  transition: all $base-timing $base-ease;
}

.window:hover .laptop {
  transform: rotateZ(0deg) rotateY(0deg) rotateX(65deg);
  top: 9em;
}

.laptop .base {
  position: absolute;
  left: 0; right: 0;
  top: 0; bottom: 0;
  transform-style: preserve-3d;
}

.laptop .base:after {
  content: '';
  position: absolute;
  bottom: .2em; top: .2em;
  left: .2em; right: .2em;
  background: #00000022; // screen glow
  transition: all 2000ms;
  filter: blur(.1em);
}

.window:hover .laptop .base:after {
  bottom: 100%;
  filter: blur(1em);
  background: #0000;
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
  border-radius: .5em;
  background-color: $keyboard_color;
  background-image: repeating-linear-gradient(0deg, transparent 0, transparent .8em, $trackpad_color .9em, $trackpad_color 1em), repeating-linear-gradient(90deg, transparent 0, transparent 0.9em, $trackpad_color 0.9em, $trackpad_color 1.1em);
}

.laptop .base .side.top:after { // trackpad
  content: '';
  position: absolute;
  left: 4.5em; right: 4.5em;
  top: 6em; bottom: 1em;
  background: $trackpad_color;
  border-radius: .5em;
  //border: .05em solid #0003;
}

.laptop .base .side.bottom { // bottom of laptop
  //background: linear-gradient(45deg, #bbb 0%, #999 30%, #666 100%);
  background: $laptop_color;
  top: 0; bottom: 0;
  left: 0; right: 0;
  transform: translateZ(-.3em) rotateX(180deg);
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
  transition: $lid-timing $lid-ease $lid-delay;
  transform-origin: top;
  transform-style: preserve-3d;
}

.window:hover .laptop .lid { // open lid
  transform: rotateX(115deg);
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
  background-image: linear-gradient(25deg, transparent 25%, #fff1 27%, #fff4 40%, transparent 45%);
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
  //background: linear-gradient(to bottom right, #FFF152, #FFA84A);
  background: $blue;
  overflow: hidden;
  //border-top: .3em solid rgba(0,0,0,0.2);
}
</style>
