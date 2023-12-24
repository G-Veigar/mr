<script setup lang="ts">
import { onMounted } from 'vue'
import tippy from 'tippy.js';

onMounted(() => {
  tippy('#mint-main-btn', {
    content: 'Coming soon!',
    trigger: 'click',
    theme: 'light',
  });
})
</script>

<template>
  <section class="page page-one">
    <div class="page-main">
      <div class="main-title">DeMR Network</div>
      <div class="sub-title">Decentralized Mixed Reality Infrastructure Network</div>
      <div class="content">DeMR is a decentralized Mixed Reality (MR) infrastructure network (MR-DePIN), built on the
        Solana Chain, leading global users into the MR world.</div>
      <button id="mint-main-btn" class="mint-btn">Connect Wallet</button>
    </div>
    <img src="../assets/page-bg.png" class="bg-img" />
    <div class="bottom-mask"></div>
  </section>
</template>

<style scoped>
.page-one {
  overflow: hidden;
  position: relative;
  display: flex;

  .bg-img {
    position: absolute;
    z-index: 0;
    width: 150%;
    max-width: 150%;
    left: -80px;
    bottom: -40px;
  }

  .page-main {
    flex: auto;
    z-index: 1;
    padding: 28px 24px;
  }

  .main-title {
    font-size: 40px;
    font-weight: 900;
    line-height: normal;
    letter-spacing: 2.4px;
    margin-bottom: 32px;
  }

  .sub-title {
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    max-width: 481px;
  }

  .content {
    max-width: 481px;
    color: #CDCDCD;
    font-size: 16px;
    font-weight: 400;
    margin-top: 16px;
    line-height: 24px
  }

  .mint-btn {
    margin-top: 80px;
    width: 181px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 400px;
    color: rgba(255, 255, 255, 0.36);
    font-size: 16px;
    background: linear-gradient(0deg, #1C1C1C 0%, #1C1C1C 100%), linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%);
  }

  .bottom-mask {
    height: 140px;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);
  }
}

@media (min-width: 1024px) {
  .page-one {
    .page-main {
      max-width: 1200PX;
      padding: 96PX 0 0 0;

      .main-title {
        font-size: 80PX;
        margin-bottom: 32PX;
      }

      .sub-title {
        font-size: 32PX;
        font-weight: 800;
        max-width: 481PX;
      }

      .content {
        font-weight: 500;
        line-height: 28PX;
        font-size: 16PX;
        max-width: 481PX;
        margin-top: 16PX;
      }

      .mint-btn {
        margin-top: 96PX;
        width: 181PX;
        height: 56PX;
        font-size: 16PX;
      }
    }

    .bg-img {
      max-height: 99vh;
      max-width: 90vw;
      width: auto;
      right: 0;
      bottom: 0;
      left: initial;
    }

    .bottom-mask {
      display: none;
    }
  }
}
</style>
