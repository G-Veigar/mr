<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import router from '../router'
import TabBar from './TabBar.vue'
import { event } from '../utils/event-bus'
// import tippy from 'tippy.js';
import { preloadImg } from '../utils/preload'
import { nftList as tabViewDataList } from '../const'
import { ACTIVE_NFT_INDEX, MINT_DISABELD } from '../const'

// TAG: 手动设置
const tabActiveIndex = ref(ACTIVE_NFT_INDEX)

// const currentViewData = computed(() => {
//   return tabViewDataList[tabActiveIndex.value];
// })

const pageRef:Ref<HTMLDivElement | undefined> = ref();

const isMobile = document.documentElement.clientWidth < 1024

event.on('goToNft', () => {
  if(pageRef.value) {
    pageRef.value.scrollIntoView({
      behavior: "smooth",
      block: isMobile ? 'end' : 'start',
    })
  }
})

onMounted(() => {
  setTimeout(() => {
    preloadImg(tabViewDataList[1].img)
    preloadImg(tabViewDataList[2].img)
  }, 1500)
})

function getMintBtnText(tabIndex: number) {
  if(ACTIVE_NFT_INDEX > tabIndex) {
    return 'Mint Ended'
  } else if(ACTIVE_NFT_INDEX === tabIndex){
    return 'Mint'
  } else {
    return 'Coming Soon'
  }
}

function goMint(type: number) {
  router.push(`/mint?type=${type}`)
}
</script>

<template>
  <section class="page page-two" ref="pageRef">
    <div class="page-main">
      <div class="page-title">Collaborate With DeMR Network<br class="br" />To Shape The MR World</div>
      <tab-bar class="page-tab" :active-index="tabActiveIndex" @change="tabActiveIndex = $event"></tab-bar>
      <Transition mode="out-in">
        <div class="tab-view one" v-if="tabActiveIndex === 0">
          <div class="view-left">
            <div class="sub-title">{{ tabViewDataList[0].title }}</div>
            <div class="content">{{ tabViewDataList[0].content }}</div>
            <div class="tip">{{ tabViewDataList[0].tip }}</div>
            <button class="mint-btn" :disabled="ACTIVE_NFT_INDEX!==0" @click="goMint(0)">{{getMintBtnText(0)}}</button>
          </div>
          <img class="view-img" :src="tabViewDataList[0].img" />
        </div>
        <div class="tab-view two" v-else-if="tabActiveIndex === 1">
          <div class="view-left">
            <div class="sub-title">{{ tabViewDataList[1].title }}</div>
            <div class="content">{{ tabViewDataList[1].content }}</div>
            <div class="tip">{{ tabViewDataList[1].tip }}</div>
            <button class="mint-btn" :disabled="ACTIVE_NFT_INDEX!==1">{{getMintBtnText(1)}}</button>
          </div>
          <img class="view-img" :src="tabViewDataList[1].img" />
        </div>
        <div class="tab-view three" v-else>
          <div class="view-left">
            <div class="sub-title">{{ tabViewDataList[2].title }}</div>
            <div class="content">{{ tabViewDataList[2].content }}</div>
            <div class="tip">{{ tabViewDataList[2].tip }}</div>
            <button class="mint-btn" :disabled="ACTIVE_NFT_INDEX!==2">{{getMintBtnText(2)}}</button>
          </div>
          <img class="view-img" :src="tabViewDataList[2].img" />
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.6;
  filter: blur(3PX);
}

.page-two {
  &.page {
    padding-top: 0;
  }

  .page-title {
    width: 100%;
    background-image: linear-gradient(45deg, #AD50FF, #6610F2);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.68px;
    padding: 48px 24px 24px 24px;
  }

  .br {
    display: none;
  }

  .page-tab {
    margin: 0 24px;
  }

  .tab-view {
    width: 100%;
    margin-top: 48px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
  }

  .view-left {
    max-width: 500px;
    padding: 0 24px;

    .sub-title {
      font-size: 24px;
      font-weight: 900;
    }

    .content {
      color: #888;
      font-size: 16px;
      margin: 16px 0;
      line-height: 28px;
      font-weight: 500;
    }

    .tip {
      color: #D7D7D7;
      font-size: 16px;
    }
  }

  .view-img {
    width: 480px;
  }

  .mint-btn {
    font-size: 14px;
    margin-top: 32px;
    width: 124px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 400px;
    color: #fff;
    background: linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%);
    &[disabled] {
      color: rgba(255, 255, 255, 0.36);
      background: linear-gradient(0deg, #1C1C1C 0%, #1C1C1C 100%);
    }
  }

  .page-main {
    flex: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 1200px;
    z-index: 1;
  }
}

@media (min-width: 1024px) {
  .page-two {
    .page-main {
      align-items: center;
      max-width: 1200PX;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 6vh;
    }

    .br {
      display: initial;
    }

    .page-title {
      font-size: 56PX;
      padding: 0;
      letter-spacing: 1.68PX;
      font-weight: 900;
    }

    .page-tab {
      margin: 0;
      margin-top: 24PX;
      margin-bottom: 4vh;
      flex: none;
    }

    .view-left {
      width: 500PX;
      height: 360PX;
      padding: 0;
      display: flex;
      flex-direction: column;
      position: relative;

      .sub-title {
        font-size: 24PX;
        /* font-weight: 900; */
      }

      .content {
        font-size: 16PX;
        margin: 16PX 0;
        line-height: 28PX;
        /* font-weight: 500; */
      }

      .tip {
        font-size: 16PX;
      }
    }

    .view-img {
      width: 480PX;
    }

    .mint-btn {
      font-size: 14PX;
      margin-top: 32PX;
      width: 124PX;
      height: 36PX;
      border-radius: 400PX;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .tab-view {
      width: 100%;
      height: 480PX;
      margin-top: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
}
@media (min-width: 1024px) and (max-height: 800px) {
  .page-two {
    .page-main {
      margin-top: 60PX;
    }
    .page-title {
      font-size: 50PX;
    }
    .page-tab {
      margin-bottom: 0;
    }
    .view-left {
      height: 320PX;
    }
  }
}
</style>


