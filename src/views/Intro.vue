<template>
  <div class="intro-container flex-center fill-screen">
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
            <div class="screen"><h1>hello</h1></div>
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
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$base-timing: 2000ms;
$base-ease: cubic-bezier(0.22, 1, 0.36, 1);
$base-delay: 0ms;

$lid-timing: 1000ms;
$lid-ease: ease;
$lid-delay: 0ms;

.intro-container {
  background: $light_gray;
}

.window {
  height: 20em;
  width: 20em;
  position: relative;
  perspective: 90em;
  font-size: 15px;
  transform: scale(2);
  transition: 500ms;
  cursor: pointer;

  &:hover {
    transform: scale(3.5);
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
  transform: rotateZ(0deg) rotateY(0deg) rotateX(90deg);
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
  background: #0005;
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

.laptop .base .side.top {
  background: linear-gradient(45deg, #bbb 0%, #999 30%, #666 100%);
  top: 0; bottom: 0;
  left: 0; right: 0;
}

.laptop .base .side.top:before {
  content: '';
  position: absolute;
  left: 1em; right: 1em;
  top: .5em; bottom: 5.5em;
  border-radius: .5em;
  background-color: #222;
  background-image: repeating-linear-gradient(0deg, transparent 0, transparent .9em, #333 .9em, #333 1em), repeating-linear-gradient(90deg, transparent 0, transparent .9em, #333 .9em, #333 1em);
}

.laptop .base .side.top:after {
  content: '';
  position: absolute;
  left: 4.5em; right: 4.5em;
  top: 6em; bottom: 1em;
  background: #FFF2;
  border-radius: .5em;
  border: .05em solid #0003;
}

.laptop .base .side.bottom {
  background: linear-gradient(45deg, #bbb 0%, #999 30%, #666 100%);
  top: 0; bottom: 0;
  left: 0; right: 0;
  transform: translateZ(-.3em) rotateX(180deg);
}

.laptop .base .side.right {
  background: #777;
  top: 0; bottom: 0;
  left: 0; width: .3em;
  transform: translateX(14.85em) translateZ(-.15em) rotateY(90deg);
}

.laptop .base .side.left {
  background: #777;
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
  background: #afafaf;
  top: 0; height: .3em;
  left: 0; right: 0;
  transform: translateY(10.85em) translateZ(-.15em) rotateX(90deg);
}

.laptop .base .side.back {
  background: #afafaf;
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

.window:hover .laptop .lid {
  transform: rotateX(90deg);
}

.laptop .side {
  box-shadow: 0 0 .05em .0em #aaa;
}

.laptop .lid .side {
  position: absolute;
}

.laptop .lid .side.top {
  background: linear-gradient(45deg, rgb(134, 105, 105) 0%, #999 30%, #666 100%);
  top: 0; bottom: 0;
  left: 0; right: 0;
  transform: translateZ(.2em);
}

.laptop .lid .side.top:before { // laptop logo
  content: url('../assets/logo_icon.svg');
  top: 4.7em; bottom: 4.7em;
  left: 6.7em; right: 6.7em;
  transform: rotate(180deg);
  opacity: 0.4;
  position: absolute;
  border-radius: 50%;
}

.laptop .lid .side.bottom {
  background: #222;
  top: 0; bottom: 0;
  left: 0; right: 0;
  transform: rotateX(180deg);
}

.laptop .lid .side.bottom:before {
  content: '';
  position: absolute;
  height: .3em; width: 2em;
  bottom: .3em; left: 6.5em;
  background: #fff3;
  border-radius: 2em;
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
  background: #777;
  top: 0; bottom: 0;
  left: 0; width: .2em;
  transform: translateX(14.9em) translateZ(.1em) rotateY(90deg);
}

.laptop .lid .side.left {
  background: #777;
  top: 0; bottom: 0;
  left: 0; width: .2em;
  transform: translateX(-.1em) translateZ(.1em) rotateY(90deg);
}

.laptop .lid .side.front {
  background: #aaa;
  top: 0; height: .2em;
  left: 0; right: 0;
  transform: translateY(10.9em) translateZ(.1em) rotateX(90deg);
}

.laptop .lid .side.back {
  background: #aaa;
  top: 0; height: .2em;
  left: 0; right: 0;
  transform: translateY(-.1em) translateZ(.1em) rotateX(90deg);
}

.laptop .screen {
  position: absolute;
  top: .7em; bottom: .8em;
  left: .2em; right: .2em;
  border-radius: .1em;
  background: linear-gradient(to bottom right, #FFF152, #FFA84A);
  overflow: hidden;
  border-top: .3em solid rgba(0,0,0,0.2);
}

.laptop .screen:before {
  top: 1em; bottom: 1em;
  left: 3em; right: 3em;
  background: #333;
  border-top: .5em solid #fff;
}

.laptop .screen:after {
  top: 2em; bottom: 2em;
  left: 4em; right: 6em;
  background-image: linear-gradient(180deg, transparent 20%, #1b3 20%, #1b3 30%, transparent 30%, transparent 60%, #ccc 60%, #ccc 70%, transparent 70%);
  background-size: 2em 2em;
  background-position: center 0;
}

.laptop:active .screen:after {
  background-position: center 2em;
  transition: top 500ms 300ms, bottom 500ms 300ms;
}
</style>
