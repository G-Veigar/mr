<script lang="ts" setup>
import { ref, computed, onMounted, watchEffect, type Ref, nextTick } from "vue";
import { nftList, type NFTData } from "../const"
import { useRoute } from "vue-router"
import tippy from 'tippy.js';
import CommonDialog from '../components/CommonDialog.vue'
import TopMessage from '../components/TopMessage.vue'
import { dateFormat } from '../utils/index'
import { ACTIVE_NFT_INDEX, NFT_STATUS, type NftStatus, type NftIndex} from '../const'
import statusPendingIcon from "../assets/status-pending.svg"
import statusActiveIcon from "../assets/status-active.svg"
import statusEndedIcon from "../assets/status-ended.svg"
// @ts-ignore
import { useAnchorWallet, WalletModalProvider } from "solana-wallets-vue";
import { event } from '../utils/event-bus'
import { useNFT } from '../nft/index'
import { isInWhiteList } from '../utils/white-list'

const route = useRoute()
const wallet = useAnchorWallet();
// console.log( "asdfasdfasdfasdf",wallet.value.publicKey )
const { userMintedCount , refreshData, getDataMintState, mint, waitMintResult }= useNFT(wallet)

// const nftIndex = computed(() => {
//   const queryType = route.query?.type || ACTIVE_NFT_INDEX
//   return +queryType as NftIndex
// })

const nftData: Ref<NFTData> = computed(() => {
  const queryType = route.query?.type || ACTIVE_NFT_INDEX
  const data = nftList[+queryType]
  return data
})

// const nftTimes = ref({
//   startTime: 1703998800,
//   whitelistStartTime: 1703991600,
//   whitelistEndTime: 1703998800,
//   endTime: 1706590800
// })

// 测试时间
const nftTimes = ref({
  startTime: 1703961600,
  whitelistStartTime: 1703961300,
  whitelistEndTime: 1703961600,
  endTime: 1703961900
})


const inWhiteList = computed(() => {
  if(!wallet.value) return
  // console.log('wallet.value.publicKey', wallet.value.publicKey.toString())
  if(isInWhiteList(wallet.value.publicKey.toString())) {
    return true
  } else {
    return false
  }
})

const nftStatus = computed(() => {
  if(!nftTimes.value) return NFT_STATUS.pending
  if(mintProgress.value === 100) return NFT_STATUS.ended
  let nowTime = Math.floor(Date.now() / 1000)
  if(nowTime < nftTimes.value.whitelistStartTime) {
    return NFT_STATUS.pending
  } else if(nowTime < nftTimes.value.whitelistEndTime) {
    return NFT_STATUS.whiteListActive
  } else if(nowTime < nftTimes.value.endTime) {
    return NFT_STATUS.publicActive
  } else {
    return NFT_STATUS.ended
  }
})

const nftStatusIcon = computed(() => {
  let icon = ''
  switch (nftStatus.value) {
    case NFT_STATUS.pending: icon = statusPendingIcon; break
    case NFT_STATUS.whiteListActive: icon = statusActiveIcon; break
    case NFT_STATUS.publicActive: icon = statusActiveIcon; break
    case NFT_STATUS.ended: icon = statusEndedIcon; break
  }
  return icon
})
const nftStatusText = computed(() => {
  let status = ''
  switch (nftStatus.value) {
    case NFT_STATUS.pending: status = 'Pending'; break
    case NFT_STATUS.whiteListActive: status = 'WhiteList Mint Active'; break
    case NFT_STATUS.publicActive: status = 'Public Mint Acitve'; break
    case NFT_STATUS.ended: status = 'Ended'; break
  }
  return status
})

const startTimeTipArr = computed(() => {
  const tipArr:string[] = []
  const now = Math.floor(Date.now() / 1000)
  if (nftStatus.value === NFT_STATUS.pending) {
    if(nftTimes.value.whitelistStartTime > now) {
      tipArr.push(`Whitelist Mint Start:\n${dateFormat(new Date(nftTimes.value.whitelistStartTime * 1000))}`)
    }
    if(nftTimes.value.startTime  > now) {
      tipArr.push(`Public Mint Start:\n${dateFormat(new Date(nftTimes.value.startTime * 1000))}`)
    }
  } else if (nftStatus.value === NFT_STATUS.whiteListActive) {
    if(nftTimes.value.startTime  > now) {
      tipArr.push(`Public Mint Start:\n${dateFormat(new Date(nftTimes.value.startTime * 1000))}`)
    }
  }
  return tipArr
})

// 进度获取
const mintProgress = ref(0)
// mint费用 sol 固定写死1
const mintPrice: Ref<string | number> = ref('1')
// 最大mint上限(每个地址)
const maxMintCount = ref(2)
// 已mint的数量

function setMintData() {
  getDataMintState().then(mintState => {
  if(mintState) {
      const { mintSupply, mintMaxSupply, startTime, whitelistStartTime, whitelistEndTime, endTime } = mintState
      nftTimes.value = {
        startTime, whitelistStartTime, whitelistEndTime, endTime
      }
      if(nftStatus.value === NFT_STATUS.pending) {
        mintProgress.value = 0
      } else {
        const percent = mintSupply / mintMaxSupply
      if(percent < 0.01 && percent > 0) {
          mintProgress.value = 1
        } else if(percent > 0.99 && percent < 1) {
          mintProgress.value = 99
        } else {
          mintProgress.value = +(percent).toFixed(2) * 100
        }
      }
       // 固定写死1
      // mintPrice.value = mintState.mintPrice
    }
  })
}

watchEffect(() => {
  if(wallet.value) {
    setMintData()
  }
})

const maxMintTip = computed(() => {
  if (userMintedCount.value >= maxMintCount.value) {
    return {
      error: true,
      content: `You've minted ${maxMintCount.value} NFT`
    }
  } else {
    return {
      error: false,
      content: `Max ${maxMintCount.value} mints per wallet`
    }
  }
})

const progressStyle = computed(() => {
  return {
    width: `${mintProgress.value}%`
  }
})

const mintSubmitted = ref(false)

async function handleMint(open: Function) {
  if(mintDisabled.value) return;
  if (wallet.value) {
    // TODO: mint
    try {
      mintSubmitted.value = false
      showLoading()
      const txsign = await mint()
      mintSubmitted.value = true
      closeLoading()
      if(!txsign) {
        showMessage({
          title: 'Minting Fail',
          content: 'View on Solona FM',
          type: 'error',
          style: 'dialog'
        })
        return
      } else {
        showMessage({
          title: 'Minting Submitted',
          content: 'Minted:0/1',
          type: 'info',
          style: 'message'
        })
      }
      await waitMintResult(txsign)
      showMessage({
        title: 'Minting Success',
        content: 'View on Solona FM',
        type: 'success',
        style: 'message'
      })
      setMintData()
      refreshData()
    } catch (e: any) {
      console.log('handleMint error', e)
      closeLoading()
      // 分两种，提交成功，但mint失败，和直接提交就失败
      if(mintSubmitted.value) {
        showMessage({
          title: 'Transaction Fail',
          content: 'plase try again',
          type: 'error',
          style: 'message'
        })
      } else {
        const content = e.message?.includes('User rejected the request') ? 'User rejected the request' : 'Mint Fail, Please try again'
        showMessage({
          title: 'Minting Fail',
          content,
          type: 'error',
          style: 'dialog'
        })
      }
    }
    setMintData()
    refreshData()
  } else {
    open()
    nextTick(() => {
      const $list = document.querySelector('.swv-modal-list')
      event.emit('wallet-select', $list)
    })
  }
}

const nftDetailShow = ref(true);
function toggleOpen() {
  nftDetailShow.value = !nftDetailShow.value
}

const dialogContent = ref('')
const mintDialogShow = ref(false)

type MsgType = 'error' | 'success' | 'info'

const messageShow = ref(false);
const messageType: Ref<MsgType> = ref('success')
const messageTitle = ref('')
const messageContent = ref('')
const loadingShow = ref(false);

let closeTimer:any = 0

function showMessage(options: {
  type: MsgType,
  title: string,
  content: string,
  style: 'dialog' | 'message'
}) {
  clearTimeout(closeTimer)
  const { type, title, content, style } = options
  if(style === 'dialog') {
    mintDialogShow.value = true
  } else {
    messageShow.value = true
  }
  dialogContent.value = content
  loadingShow.value = false
  messageType.value = type
  messageTitle.value = title
  messageContent.value = content
  // info状态是loading 不需要关闭
  if(type === 'info') return
  closeTimer = setTimeout(() => {
    messageShow.value = false
  }, 5000)
}

function showLoading() {
  mintDialogShow.value = true
  loadingShow.value = true
}

function closeLoading() {
  mintDialogShow.value = false
  loadingShow.value = false
}

const mintDisabled = computed(() => {
  if(!wallet.value) {
    return false
  } else {
    if(nftStatus.value === NFT_STATUS.pending || nftStatus.value === NFT_STATUS.ended || userMintedCount.value >= maxMintCount.value || (!inWhiteList.value && nftStatus.value === NFT_STATUS.whiteListActive)) {
      return true
    } else {
      return false
    }
  }
})

let tippyIns = ref()

watchEffect(() => {
  const ins = tippyIns.value?.[0]
  if(!ins) return
  if(mintDisabled.value && nftStatus.value === NFT_STATUS.pending) {
    ins.setProps({
      content: 'Coming soon!',
    });
    ins?.enable()
  } else if(mintDisabled.value && nftStatus.value === NFT_STATUS.whiteListActive && !inWhiteList.value) {
    ins.setProps({
      content: 'Public mint coming soon!',
    });
    ins?.enable()
  } else {
    // tippyIns?.hide();
    ins?.disable()
  }
})


onMounted(() => {
  tippyIns.value = tippy('#mint-page-mint-btn', {
    content: 'Coming soon!',
    trigger: 'click',
    theme: 'light',
  });
  if(!wallet.value) {
    tippyIns.value?.[0]?.disable()
  }
})
</script>

<template>
  <div class="mint-page">
    <div class="page-main">
      <div class="page-bg">
        <div class="inner-bg"></div>
      </div>
      <div class="nft-info">
        <img class="nft-img" :src="nftData.img" />
        <div class="nft-name h5 padding" :class="{ opened: nftDetailShow }" @click="toggleOpen">{{ nftData.title }}</div>
        <div class="nft-name pc">{{ nftData.title }}</div>
        <div class="nft-content padding" v-show="nftDetailShow">{{ nftData.content }}</div>
        <div class="nft-tip padding" v-show="nftDetailShow">{{ nftData.tip }}</div>
      </div>
      <div class="mint-box">
        <div class="top-info">
          <div class="nft-status"><img class="status-icon" :src="nftStatusIcon" />{{ nftStatusText }}</div>
          <div class="mint-progress-number" v-show="wallet">
            {{ mintProgress }}% Minted
          </div>
        </div>
        <div class="mint-progress">
          <div class="inner-bar" :style="progressStyle"></div>
        </div>
        <div class="start-time-tip">
          <div class="tip-title">
            Mint Schedule
          </div>
          <div class="time-wrapper" v-for="tip in startTimeTipArr" :key="tip">
            <div class="start-icon">Start</div><pre>{{ tip }}</pre>
          </div>
          <!-- <div class="time-wrapper">
            <div class="start-icon">Start</div>
            <span>Whitelist Mint Start:<br>31 Dec 2023 11:00:00 UTC</span>
          </div>
          <div class="time-wrapper">
            <div class="start-icon">Start</div>
            <span>Public Mint Start:<br>31 Dec 2023 13:00:00 UTC</span>
          </div> -->
        </div>
        <div class="mint-price"><img class="sol-logo" src="https://static.demr.xyz/assets/solana-sol-logo-RyWxbhGV.png" />{{ mintPrice }} Sol</div>
        <wallet-modal-provider :dark="true">
          <template #default="modalScope">
            <slot v-bind="{ ...modalScope }">
              <button id="mint-page-mint-btn" class="mint-btn" :class="{disabled: mintDisabled}"  @click="handleMint(modalScope.openModal)">Mint</button>
            </slot>
          </template>
        </wallet-modal-provider>
        <div class="mint-limit-tip" :class="{ error: maxMintTip.error }">
          {{ maxMintTip.content }}
        </div>
      </div>
    </div>
    <common-dialog
      :type="messageType"
      :content="dialogContent"
      v-model:show="mintDialogShow"
      :loading="loadingShow"
      @confirm="handleMint">
    </common-dialog>
    <top-message
      :title="messageTitle"
      :show="messageShow"
      :content="messageContent"
      :type="messageType"
    >
    </top-message>
  </div>
</template>

<style scoped>
.mint-page {
  background-color: #000;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-bottom: 80px;

  .page-main {
    padding-top: 68px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .padding {
    padding: 0 24px;
  }

  .nft-name {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 0.72px;

    &.h5 {
      display: flex;
      align-items: center;

      &::after {
        display: block;
        content: '';
        background: url('../assets/arrow-open.svg') 100%/100%;
        width: 28px;
        height: 28px;
        position: relative;
        margin-left: 1px;
        transition: transform 0.2s;
      }

      &.opened {
        &::after {
          transform: rotate(90deg);
        }
      }
    }

    &.pc {
      display: none;
    }
  }

  .nft-content {
    color: #888;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    /* 175% */
    margin-top: 12px;
  }

  .nft-tip {
    color: #D7D7D7;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    /* 175% */
    margin-top: 16px;
  }

  .page-bg {
    display: none;
  }

  .nft-info {
    z-index: 1;
  }

  .top-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mint-box {
    border-radius: 16px;
    width: auto;
    margin: 0 16px;
    padding: 48px 24px;
    z-index: 1;
    color: #fff;
    border: 1PX solid rgba(255, 255, 255, 0.16);
    background: #000;
    margin-top: 32px;
  }

  .nft-status {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .status-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .mint-progress {
    width: 100%;
    height: 12px;
    background-color: #aaa;
    border-radius: 60px;
    background: rgba(255, 255, 255, 0.12);
    overflow: hidden;
    margin-top: 16PX;
  }

  .inner-bar {
    height: 100%;
    width: 0;
    border-radius: 60px;
    transition: width 0.5s;
    background: linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%), rgba(255, 255, 255, 0.06);
  }

  .mint-progress-number {
    display: flex;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 16px;
  }

  .mint-btn {
    color: #fff;
    width: 100%;
    font-size: 16px;
    background: linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.32);
    height: 56px;
    line-height: 56px;
    margin-top: 12px;
    &.disabled {
      background: #000;
    }
  }

  .mint-price {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-top: 48px;
  }

  .sol-logo {
    width: 22px;
    height: 22px;
    margin-right: 12px;
  }

  .start-time-tip {
    margin-top: 18px;
    text-align: center;

    .tip-title {
      font-weight: 400;
      text-align: left;
      font-size: 16px;
    }

    .time-wrapper {
      color: #B66DFF;
      background: rgba(219, 182, 255, 0.12);
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-radius: 12px;
      font-size: 14px;
      margin-top: 16px;
      text-align: left;
    }

    .start-icon {
      background: rgba(182, 109, 255, 0.32);
      border-radius: 99px;
      font-weight: 400;
      padding: 4px 12px;
      margin-right: 12px;
      text-align: center;
      flex: none;
    }
  }

  .mint-limit-tip {
    margin-top: 16px;
    font-size: 16px;
    text-align: center;
    color: #D7D7D7;

    &.error {
      color: #f33;
      opacity: initial;
    }
  }
}

@media (min-width: 1024px) {
  .mint-page {
    padding-bottom: 68PX;

    .page-main {
      padding-top: 0;
      flex: auto;
      max-width: 1100PX;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .padding {
      padding: 0;
    }

    .page-bg {
      display: block;
      position: absolute;
      z-index: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.5;
      max-height: 100vh;
      max-width: 100vh;
      overflow: hidden;
      .inner-bg {
        background: url('https://static.demr.xyz/assets/mint-bg-yUDJqrh6.jpg') 100% / 100% no-repeat;
        width: 860PX;
        height: 860PX;
      }
    }


    .nft-name {
      font-size: 24PX;
      font-weight: 900;
      padding-left: 0px;

      &.pc {
        display: block;
      }

      &.h5 {
        display: none;
      }
    }

    .nft-img {
      max-width: 480PX;
      max-height: 52vh;
      min-height: 380PX;
    }

    .nft-content {
      width: 500PX;
      color: #888;
      font-size: 16PX;
      margin-top: 16PX;
      line-height: 28PX;
    }

    .nft-tip {
      color: #D7D7D7;
      font-size: 16PX;
      margin-top: 20PX;
      line-height: 28PX;
    }

    .mint-box {
      width: 486PX;
      padding: 48PX 24PX;
      border-radius: 16PX;
      margin-top: 0;
    }

    .nft-status {
      font-size: 20PX;
      font-weight: 700;
      display: flex;
      align-items: center;
    }

    .status-icon {
      width: 24PX;
      height: 24PX;
      margin-right: 8PX;
    }

    .mint-progress {
      height: 12PX;
      margin-top: 16PX;
    }

    .mint-progress-number {
      font-size: 16PX;
    }

    .mint-price {
      font-size: 20PX;
      margin-top: 60PX;
    }

    .sol-logo {
      width: 22PX;
      height: 22PX;
      margin-right: 12PX;
    }

    .mint-btn {
      color: #fff;
      width: 100%;
      /* background: linear-gradient(122deg, #9013FE 10.13%, #6610F2 97.38%); */
      border-radius: 12PX;
      height: 56PX;
      line-height: 56PX;
      font-size: 16PX;
      margin-top: 16PX;
    }

    .mint-limit-tip {
      font-size: 16PX;
      color: #fff;
      opacity: 0.5;
      text-align: center;
      margin-top: 16PX;
    }

    .start-time-tip {
      margin-top: 18PX;
      font-size: 12PX;

      .tip-title {
        font-weight: 400;
        font-size: 16PX;
      }

      .time-wrapper {
        margin-top: 16PX;
        border-radius: 12PX;
        font-size: 14PX;
        background: rgba(219, 182, 255, 0.12);
        padding: 16PX 24PX;
      }

      .start-icon {
        margin-right: 12PX;
        padding: 4PX 12PX;
        color: #fff;
      }
    }
  }
}</style>
