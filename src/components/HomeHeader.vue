<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import router from '../router'
import { useRoute } from 'vue-router'
import { event } from '../utils/event-bus'
import tippy from 'tippy.js';
// @ts-ignore
import { useAnchorWallet, WalletMultiButton } from "solana-wallets-vue";
defineProps<{
  disabled: boolean,
}>()

const whitePaperLink = 'https://static.demr.xyz/assets/whitepaper-IvGRdOjE.pdf'

// const emits = defineEmits(['nft'])

const h5MenuOpen = ref(false)
const menuListShow = ref(false)

const wallet = useAnchorWallet();

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

async function goNFT() {
  await goHome()
  setTimeout(() => {
    event.emit('goToNft')
  }, 0)
  toggleMenu(false)
}

onMounted(() => {
  tippy('#wallet', {
    content: 'Coming soon!',
    trigger: 'click',
    theme: 'light',
  });
})

const $route = useRoute()

async function goHome() {
  if($route.name !== 'home') {
    await router.push('/')
  }
}

function handleWalletClick() {
  nextTick(() => {
    const $list = document.querySelector('.swv-modal-list')
    event.emit('wallet-select', $list)
  })
}
</script>

<template>
  <header id="home-header" :class="{ 'menu-open': h5MenuOpen }">
    <div class="header-main">
      <div class="main-wrapper">
        <img class="logo" src="../assets/logo.svg" alt="logo" @click="goHome"/>
        <div class="btn-group pc">
          <button class="nft-btn" @click="goNFT">NFT</button>
          <button class="paper-btn" @click="goWhitePaper">White Paper</button>
          <button id="wallet" class="wallet-btn" v-if="disabled">Connect Wallet</button>
          <div
            v-else
            class="wallet-btn-wrapper"
            :class="{connected: wallet}"
            @click="handleWalletClick"><wallet-multi-button :dark="true"></wallet-multi-button></div>
        </div>
        <div class="btn-group h5">
          <div class="wallet-wrapper" :class="{connected: wallet}" @click="handleWalletClick">
            <img class="wallet-icon-h5" src="../assets/wallet-h5.svg" alt="">
            <wallet-multi-button :dark="true"></wallet-multi-button>
          </div>
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

  .wallet-wrapper {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: stretch;
    position: relative;
    .wallet-icon-h5 {
      width: 100%;
      height: 100%;
      top: -2px;
      position: absolute;
      left: 0;
    }

    &.connected {
      background: none;
      width: auto;
      height: auto;
      >>> .swv-button {
        padding: 0 16px;
        font-size: 12px;
        opacity: 1;
        height: 36px;
        line-height: 36px;
        font-weight: 500;
        background: #1c1c1c !important;
        color: #fff !important;
      }
    }

    >>> .swv-button {
      width: 100%;
      padding: 0;
      font-size: 10PX;
      opacity: 0;
      border-radius: 9999px;
      background: #1C1C1C;
      .swv-button-icon {
        display: none;
      }

      p {
        margin-left: 0;
      }
    }
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
      cursor: pointer;
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
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .menu-btn {
          margin-left: 16px;
        }
      }

      button {
        line-height: 24px;

        &:not(:first-child) {
          margin-left: 80px;
        }
      }

      >>> .swv-button {
        background: #fff;
        color: #000;
      }

      >>> .swv-dropdown-list {
        background: #1C1C1C;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      >>> .swv-dropdown-list-item:not([disabled]):hover {
        background: #3C3C3C;
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

        .wallet-btn-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 200PX;

          &.connected {
            >>> .swv-button {
              background: #1c1c1c;
              color: #fff;
            }
          }
        }

        >>> .swv-button {
          height: 36PX;
          font-size: 14PX;
          border-radius: 18PX;

          .swv-button-icon {
            display: none;
          }

          p {
            margin-left: 0;
          }
        }

        &.pc {
          display: flex;
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

<style>
.swv-modal-wrapper {
  background: #000 !important;
  border: 1PX solid rgba(255, 255, 255, 0.16);
  padding-top: 104PX;

  .swv-button:not([disabled]):hover {
    background: rgba(255, 255, 255, 0.08) !important;
  }

  .swv-modal-title {
    font-size: 16PX;
    font-weight: 500;
    position: absolute;
    left: 24PX;
    top: 40PX;
    margin: 0;
    padding: 0;
    height: 20PX;
    line-height: 20PX;
  }

  .swv-modal-button-close {
    top: 28PX;
  }

  .swv-modal-list {
    padding: 0 24PX;

    li {
      margin-bottom: 16PX;
    }

    .swv-button {
      font-size: 14PX;
      font-weight: 500;
      border-radius: 12PX;
    }

    /* .swv-button-icon {
      border-radius: 50%;
      overflow: hidden;
    } */
  }
}
.swv-wallet-status {
  color: #ccc !important;
}
body .swv-modal-button-close {
  background-color: #000 !important;
  color: #aaa;
}

.swv-dropdown {
  .swv-dropdown-list-item {
    font-size: 14PX;
  }
}
</style>
