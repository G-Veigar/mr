<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { event } from '../utils/event-bus'
import tippy from 'tippy.js';
// @ts-ignore
// import { WalletMultiButton } from "solana-wallets-vue";
defineProps<{
  disabled: boolean,
}>()

const whitePaperLink = 'https://static.demr.xyz/assets/whitepaper-IvGRdOjE.pdf'

// const emits = defineEmits(['nft'])

const h5MenuOpen = ref(false)
const menuListShow = ref(false)

function toggleMenu(status: boolean) {
  h5MenuOpen.value = status ?? !h5MenuOpen.value
  menuListShow.value = status ?? !menuListShow.value
}

function goTwitter() {
  window.open('https://x.com/DeMR_official?s=20')
}

function goDiscord() {
  window.open('https://discord.gg/msjPncCnsJ')
}

function goMedium() {
  window.open('https://medium.com/@DeMR_official')
}

function goWhitePaper() {
  window.open(whitePaperLink)
  toggleMenu(false)
}

function goNFT() {
  event.emit('goToNft')
  toggleMenu(false)
}

onMounted(() => {
  tippy('#wallet', {
    content: 'Coming soon!',
    trigger: 'click',
    theme: 'light',
  });
})
</script>

<template>
  <header id="home-header" :class="{ 'menu-open': h5MenuOpen }">
    <div class="header-main">
      <div class="main-wrapper">
        <img class="logo" src="../assets/logo.svg" alt="logo" />
        <div class="btn-group pc">
          <button class="nft-btn" @click="goNFT">NFT</button>
          <button class="paper-btn" @click="goWhitePaper">White Paper</button>
          <button id="wallet" class="wallet-btn" v-if="disabled">Connect Wallet</button>
          <!-- <wallet-multi-button v-else></wallet-multi-button> -->
        </div>
        <div class="btn-group h5">
          <button class="menu-btn open" v-if="!h5MenuOpen" @click="toggleMenu(true)"></button>
          <button class="menu-btn close" v-else @click="toggleMenu(false)"></button>
        </div>
      </div>
      <div class="menu-list" :class="{ show: menuListShow }">
        <div class="menu-item" @click="goNFT">
          <div class="menu-name">NFT</div>
          <div class="arrow-icon"></div>
        </div>
        <div class="menu-item" @click="goWhitePaper">
          <div class="menu-name">White Paper</div>
          <div class="arrow-icon"></div>
        </div>
        <div class="icon-btns">
          <button class="btn" @click="goTwitter"><img src="../assets/footer-btn1.png"></button>
          <button class="btn" @click="goDiscord"><img src="../assets/footer-btn2.png"></button>
          <button class="btn" @click="goMedium"><img src="../assets/footer-btn3.png"></button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
#home-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #040404;
  z-index: 100;

  &.menu-open {
    border-bottom: none;
  }

  .header-main {
    flex: auto;
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: space-between;

    .main-wrapper {
      padding: 0 24px;
      height: 68px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #000;
    }

    .logo {
      width: 126px;
    }

    .btn-group {
      font-size: 14px;
      display: flex;
      align-items: center;
      color: #fff;

      &.pc {
        display: none;
      }

      &.h5 {
        display: block;
      }

      button {
        line-height: 24px;

        &:not(:first-child) {
          margin-left: 80px;
        }
      }

      .menu-btn {
        width: 32px;
        height: 32px;

        &.open {
          background: url('../assets/menu.svg') no-repeat 100%/100%;
        }

        &.close {
          background: url('../assets/close.svg') no-repeat 100%/100%;
        }
      }
    }

    .menu-list {
      padding: 24px;
      position: absolute;
      bottom: -1px;
      z-index: -1;
      color: #fff;
      background-color: #000;
      width: 100%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.16);
      transition: all 0.2s;

      &.show {
        bottom: -200px;
      }

      .menu-item {
        height: 24px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
      }

      .arrow-icon {
        width: 24px;
        height: 24px;
        background: url('../assets/arrow.svg') 100%/100%;
      }

      .icon-btns {
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;

        .btn {
          width: 32px;
          height: 32px;

          &:not(:first-child) {
            margin-left: 32px;
          }
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  #home-header {
    .header-main {
      max-width: 1200PX;

      .main-wrapper {
        height: 68PX;
        padding: 0;
      }

      .logo {
        width: 126PX;
      }

      .btn-group {
        font-size: 14PX;

        &.pc {
          display: block;
        }

        &.h5 {
          display: none;
        }

        button {
          line-height: 24PX;

          &:not(:first-child) {
            margin-left: 80PX;
          }
        }

        .wallet-btn {
          padding: 6PX 16PX;
          border-radius: 400PX;
          background: linear-gradient(0deg, #1C1C1C 0%, #1C1C1C 100%), linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%);
          color: rgba(255, 255, 255, 0.36);
        }
      }

      .menu-list {
        display: none;
      }
    }
  }
}</style>
../utils/event-bus
