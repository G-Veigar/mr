<script lang="ts" setup>
import { computed, type Ref } from "vue";
import { nftList, type NFTData } from "../const"
import { useRoute } from "vue-router"

// import { WalletMultiButton } from "solana-wallets-vue";
function haveOKX() {
  // @ts-ignore
  if (typeof window.okxwallet !== 'undefined') {console.log('OKX is installed!');}
}

const route = useRoute()

const nftData:Ref<NFTData> = computed(() => {
  const queryType = route.query?.type as string
  const data = nftList[+queryType - 1]
  return data
})

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
  <div class="mint-page">
    <div class="page-main">
      <div class="nft-info">
        <div class="nft-name">{{ nftData.title }}</div>
        <img class="nft-img" :src="nftData.img" />
        <div class="nft-content">{{ nftData.content }}</div>
        <div class="nft-tip">{{ nftData.tip }}</div>
      </div>
      <div class="mint-box"></div>
    </div>
  </div>
</template>

<style scoped>
.mint-page {
  background-color: #000;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  .page-main {
    color: #fff;
    display: flex;
  }

  .nft-info {

  }
}
@media (min-width: 1024px) {
  .mint-page {
    .page-main {
      max-width: 1200PX;
      display: flex;
      align-items: center;
    }
    .nft-name {
      font-size: 24PX;
      font-weight: 900;
    }
    .nft-img {
      width: 480PX;
    }

    .nft-content {
      width: 500PX;
      color: #888;
      font-size: 16PX;
    }

    .nft-tip {
      color: #D7D7D7;
      font-size: 16PX;
      margin-top: 20PX;
    }

  }
}
</style>
