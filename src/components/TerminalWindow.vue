<template>
  <div class="terminal-window">
    <div class="terminal-toolbar">
      <div class="terminal-button close"></div>
      <div class="terminal-button minimize"></div>
      <div class="terminal-button maximize"></div>
    </div>
    <div class="terminal-screen">
      <!--    <p class="line1">[&nbsp;“I'm a web developer.”,<span class="cursor1">_</span></p>-->
      <!--    <p class="line2">&nbsp;&nbsp;“I'm a web designer.”,<span class="cursor2">_</span></p>-->
      <!--    <p class="line3">&nbsp;&nbsp;“Let's work together!”&nbsp;]<span class="cursor3">_</span></p>-->
      <!--    <p class="line4">&gt;<span class="cursor4">_</span></p>-->

      <p class="line1">Recent Projects<span class="cursor1">_</span></p>

      <div class="content">
        <slot />
      </div>

      <StaticEffect />
    </div>
  </div>
</template>

<script setup lang="ts">
import StaticEffect from "./StaticEffect.vue";

</script>

<style lang="scss" scoped>
.terminal-window {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.terminal-button {
  display: inline-block;
  position: relative;
  top: 0;
  left: 6px;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: 1px solid;
}

.close {
  background-color: #ff3b47;
  border-color: #9d252b;
}

.minimize {
  left: 14px;
  background-color: #ffc100;
  border-color: #9d802c;
}

.maximize {
  left: 21px;
  background-color: #00d742;
  border-color: #049931;
}

.terminal-toolbar {
  width: 100%;
  box-sizing: border-box;
  height: 25px;
  background-color: #bbb;
  margin: 0 auto;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.terminal-screen {
  position: relative;
  overflow: hidden;
  min-height: 500px;
  background-color: #151515;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

p {
  position: relative;
  font-family: "Syne Mono", serif, monospace;
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-self: flex-start;
  gap: 5px;
  color: #25e0cb;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}

span {
  color: #fff;
  font-weight: bold;
}

.line1 {
  animation: type .5s 1s steps(20, end) forwards;
}

.cursor1 {
  animation: blink 1s 2s infinite;
}

.line2 {
  color: #CDEE69;
  -webkit-animation: type .5s 4.25s steps(20, end) forwards;
  -moz-animation: type .5s 4.25s steps(20, end) forwards;
  -o-animation: type .5s 4.25s steps(20, end) forwards;
  animation: type .5s 4.25s steps(20, end) forwards;
}

.cursor2 {
  -webkit-animation: blink 1s 5.25s 2 forwards;
  -moz-animation: blink 1s 5.25s 2 forwards;
  -o-animation: blink 1s 5.25s 2 forwards;
  animation: blink 1s 5.25s 2 forwards;
}

.line3 {
  color: #E09690;
  -webkit-animation: type .5s 7.5s steps(20, end) forwards;
  -moz-animation: type .5s 7.5s steps(20, end) forwards;
  -o-animation: type .5s 7.5s steps(20, end) forwards;
  animation: type .5s 7.5s steps(20, end) forwards;
}

.cursor3 {
  -webkit-animation: blink 1s 8.5s 2 forwards;
  -moz-animation: blink 1s 8.5s 2 forwards;
  -o-animation: blink 1s 8.5s 2 forwards;
  animation: blink 1s 8.5s 2 forwards;
}

.line4 {
  color: #fff;
  -webkit-animation: type .5s 10.75s steps(20, end) forwards;
  -moz-animation: type .5s 10.75s steps(20, end) forwards;
  -o-animation: type .5s 10.75s steps(20, end) forwards;
  animation: type .5s 10.75s steps(20, end) forwards;
}

.cursor4 {
  -webkit-animation: blink 1s 11.5s infinite;
  -moz-animation: blink 1s 8.5s infinite;
  -o-animation: blink 1s 8.5s infinite;
  animation: blink 1s 8.5s infinite;
}

@-webkit-keyframes blink {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes blink {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-o-keyframes blink {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes type {
  to {
    width: 17em;
  }
}

@-moz-keyframes type {
  to {
    width: 17em;
  }
}

@-o-keyframes type {
  to {
    width: 17em;
  }
}

@keyframes type {
  to {
    width: 17em;
  }
}
</style>
