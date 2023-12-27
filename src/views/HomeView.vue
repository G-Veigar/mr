<script setup lang="ts">
import PageOne from '@/components/PageOne.vue';
import PageTwo from '@/components/PageTwo.vue';
import PageThree from '@/components/PageThree.vue';
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css';
</script>

<template>
  <main id="main">
    <page-one></page-one>
    <page-two></page-two>
    <page-three></page-three>
  </main>
</template>

<style>
#main {
  background: #000;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding-bottom: 77px;
}
#main::-webkit-scrollbar {
  width: 0;
}
.page {
  background-color: #000;
  width: 100vw;
  min-height: 100vh;
  color: white;
  font-size: 30px;
  display: flex;
  justify-content: center;
  padding-top: 68px;
  box-sizing: border-box;
  overflow: hidden;
}

@media (min-width: 1024px) {
  #main {
    scroll-snap-type: y mandatory;
    padding-bottom: 77PX;
    .page {
      padding-top: 68PX;
      scroll-snap-align: start;
      height: 100vh;
    }
  }
}
</style>
