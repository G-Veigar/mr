<script setup lang="ts">
import { ref } from 'vue'
import HomeHeader from '@/components/HomeHeader.vue';
import HomeFooter from '@/components/HomeFooter.vue';
import PageOne from '@/components/PageOne.vue';
import PageTwo from '@/components/PageTwo.vue';
import PageThree from '@/components/PageThree.vue';
// import { WalletMultiButton } from "solana-wallets-vue";
// import {
//   Connection,
//   PublicKey,
//   Keypair,
//   clusterApiUrl,
//   SystemProgram,
// } from "@solana/web3.js";
// import idl from "../wallet/idl.json";
// import fullpage from 'fullpage.js'

const connectDisabled = ref(true);
</script>

<template>
  <home-header :disabled="connectDisabled"></home-header>
  <main id="main">
    <page-one></page-one>
    <page-two></page-two>
    <page-three></page-three>
  </main>
  <home-footer></home-footer>
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
