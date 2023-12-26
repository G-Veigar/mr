<script lang="ts" setup>
// import { WalletMultiButton } from "solana-wallets-vue";
function haveOKX() {
  // @ts-ignore
  if (typeof window.okxwallet !== 'undefined') {console.log('OKX is installed!');}
}

async function connect() {
  try {
    // @ts-ignore
    const provider = window.okxwallet.solana;
    const resp = await provider.connect();
    console.log(resp.publicKey.toString());
    // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
    // { address: string, publicKey: string }
  } catch (error) {
    console.log(error);
    // { code: 4001, message: "User rejected the request."}
  }
}
</script>

<template>
  <div class="about">
    <button @click="connect">connect</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
